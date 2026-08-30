import { MetadataRoute } from 'next';
import { getAllPages } from '@/lib/seo-data';
import { siteConfig } from '@/lib/site-config';

/**
 * Génère automatiquement le fichier /sitemap.xml au format standard.
 * Tous les slugs présents dans le JSON local y sont automatiquement référencés.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

  // Entrée pour la page d'accueil
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Entrées dynamiques pour chaque page pSEO générée
  const dynamicEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${siteConfig.siteUrl}/${page.slug}`,
    lastModified: new Date(page.updatedAt || page.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...dynamicEntries];
}
