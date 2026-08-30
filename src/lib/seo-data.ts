import { SeoPageData } from '@/types/page-data';
import rawPages from '@/data/pages-data.json';

// In Next.js SSG, raw JSON import is resolved at build-time.
const pagesDatabase: SeoPageData[] = rawPages as SeoPageData[];

/**
 * Récupère toutes les pages disponibles.
 */
export async function getAllPages(): Promise<SeoPageData[]> {
  return pagesDatabase;
}

/**
 * Récupère tous les slugs existants pour generateStaticParams.
 */
export async function getAllSlugs(): Promise<string[]> {
  return pagesDatabase.map((page) => page.slug);
}

/**
 * Récupère une page par son slug unique.
 */
export async function getPageBySlug(slug: string): Promise<SeoPageData | null> {
  const page = pagesDatabase.find((item) => item.slug.toLowerCase() === slug.toLowerCase());
  return page || null;
}

/**
 * Récupère la liste de toutes les catégories uniques.
 */
export async function getAllCategories(): Promise<string[]> {
  const categories = new Set<string>();
  pagesDatabase.forEach((p) => {
    if (p.category) categories.add(p.category);
  });
  return Array.from(categories);
}

/**
 * Récupère la liste de tous les tags uniques.
 */
export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  pagesDatabase.forEach((p) => {
    p.tags?.forEach((t) => tags.add(t));
  });
  return Array.from(tags);
}

/**
 * Algorithme de maillage interne :
 * Trouve les pages connexes basées sur la même catégorie et le partage de tags.
 */
export async function getRelatedPages(currentSlug: string, limit = 3): Promise<SeoPageData[]> {
  const currentPage = await getPageBySlug(currentSlug);
  if (!currentPage) return [];

  const otherPages = pagesDatabase.filter((p) => p.slug !== currentSlug);

  const scoredPages = otherPages.map((page) => {
    let score = 0;
    // Même catégorie = bonus majeur (+10)
    if (page.category === currentPage.category) {
      score += 10;
    }
    // Tags partagés (+3 par tag)
    const currentTags = new Set(currentPage.tags || []);
    page.tags?.forEach((tag) => {
      if (currentTags.has(tag)) {
        score += 3;
      }
    });
    return { page, score };
  });

  // Tri par pertinence descendante
  scoredPages.sort((a, b) => b.score - a.score);

  return scoredPages.slice(0, limit).map((item) => item.page);
}

/**
 * Recherche et filtrage multi-critères des pages.
 */
export async function searchPages(query?: string, category?: string): Promise<SeoPageData[]> {
  let results = pagesDatabase;

  if (category && category !== 'all') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.metaDescription.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
    );
  }

  return results;
}
