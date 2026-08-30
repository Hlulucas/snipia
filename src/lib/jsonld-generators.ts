import { SeoPageData, SeoFaqItem } from '@/types/page-data';
import { siteConfig } from '@/lib/site-config';

/**
 * Génère le schéma WebSite / Organization pour la page d'accueil ou le layout global.
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.defaultDescription,
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/logo.png`,
      },
    },
  };
}

/**
 * Génère le schéma BreadcrumbList pour le fil d'Ariane.
 */
export function generateBreadcrumbJsonLd(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Génère le schéma Article / TechArticle pour une page de contenu.
 */
export function generateArticleJsonLd(page: SeoPageData) {
  const pageUrl = `${siteConfig.siteUrl}/${page.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: page.title,
    description: page.metaDescription,
    url: pageUrl,
    inLanguage: 'fr-FR',
    datePublished: page.publishedAt,
    dateModified: page.updatedAt,
    author: {
      '@type': 'Person',
      name: page.author.name,
      jobTitle: page.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    keywords: page.tags?.join(', ') || '',
    articleSection: page.category,
    ...(page.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: page.rating.value,
        reviewCount: page.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/**
 * Génère le schéma FAQPage pour l'affichage des questions/réponses enrichies dans les SERPs.
 */
export function generateFaqJsonLd(faqs?: SeoFaqItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
