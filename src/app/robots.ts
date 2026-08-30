import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Génère automatiquement le fichier /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
