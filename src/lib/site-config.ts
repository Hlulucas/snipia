import { SiteConfig } from '@/types/page-data';

export const siteConfig: SiteConfig = {
  siteName: 'Snipia',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://snipia-eight.vercel.app',
  defaultTitle: 'Snipia — Automatisation Vidéo & Outils IA de Recyclage',
  titleTemplate: '%s | Snipia',
  defaultDescription: 'Guides complets, tutoriels et comparatifs des meilleurs outils IA pour transformer vos webinaires, podcasts et articles en formats courts viraux.',
  locale: 'fr_FR',
  author: {
    name: 'Snipia',
    role: 'Expert Automatisation Vidéo & IA',
  },
  twitterHandle: '@snipia',
};
