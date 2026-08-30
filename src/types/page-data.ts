export interface SeoPageSection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  keyTakeaway?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  callout?: {
    type: 'tip' | 'info' | 'warning';
    text: string;
  };
}

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoAuthor {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface SeoKeyMetric {
  label: string;
  value: string;
  hint?: string;
}

export interface SeoProsCons {
  pros: string[];
  cons: string[];
}

export interface SeoCta {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export interface SeoPageData {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle?: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  updatedAt: string;
  author: SeoAuthor;
  readingTimeMinutes: number;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  rating?: {
    value: number;
    count: number;
  };
  summary: string;
  keyMetrics?: SeoKeyMetric[];
  sections: SeoPageSection[];
  prosAndCons?: SeoProsCons;
  faqs?: SeoFaqItem[];
  cta?: SeoCta;
  affiliateLink?: string;
  affiliateButtonText?: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  locale: string;
  author: SeoAuthor;
  twitterHandle: string;
}
