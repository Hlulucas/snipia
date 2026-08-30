import { SiteConfig } from '@/types/page-data';

export const siteConfig: SiteConfig = {
  siteName: 'SEO Matrix Engine',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://seo-matrix-engine.local',
  defaultTitle: 'SEO Matrix Engine — Générateur Programmatic SEO Haute Performance',
  titleTemplate: '%s | SEO Matrix Engine',
  defaultDescription: 'Plateforme Next.js ultra-optimisée pour le référencement naturel (SEO) et la génération programmatique de pages web à grande échelle.',
  locale: 'fr_FR',
  author: {
    name: 'Équipe SEO & Engineering',
    role: 'Experts Web & Search Optimization',
  },
  twitterHandle: '@seomatrixengine',
};
