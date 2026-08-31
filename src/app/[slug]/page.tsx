import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSlugs, getPageBySlug, getRelatedPages } from '@/lib/seo-data';
import { siteConfig } from '@/lib/site-config';
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from '@/lib/jsonld-generators';
import JsonLdScript from '@/components/JsonLdScript';
import Breadcrumbs from '@/components/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import FaqAccordion from '@/components/FaqAccordion';
import SeoRoiCalculator from '@/components/SeoRoiCalculator';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Pré-génération statique (SSG) au moment du build.
 * Next.js compile toutes les pages listées dans le JSON local.
 */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Génération dynamique des métadonnées SEO (Title, Description, Canonical, OG, Twitter).
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page non trouvée | ' + siteConfig.siteName,
      description: 'La page demandée est introuvable.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteConfig.siteUrl}/${page.slug}`;

  return {
    title: `${page.title}`,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type: 'article',
      publishedTime: page.publishedAt,
      modifiedTime: page.updatedAt,
      authors: [page.author.name],
      tags: page.tags || [],
      images: [
        {
          url: page.featuredImage?.url || `${siteConfig.siteUrl}/og-default.png`,
          width: page.featuredImage?.width || 1200,
          height: page.featuredImage?.height || 630,
          alt: page.featuredImage?.alt || page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
      creator: siteConfig.twitterHandle,
      images: [page.featuredImage?.url || `${siteConfig.siteUrl}/og-default.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Modèle de page dynamique pour le Programmatic SEO.
 */
export default async function DynamicSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const relatedPages = await getRelatedPages(page.slug, 3);

  // Données structurées Schema.org
  const breadcrumbItems = [
    { name: page.category, url: `/?category=${encodeURIComponent(page.category)}` },
    { name: page.h1, url: `/${page.slug}` },
  ];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Accueil', url: '/' },
    ...breadcrumbItems,
  ]);
  const articleJsonLd = generateArticleJsonLd(page);
  const faqJsonLd = generateFaqJsonLd(page.faqs);

  const formattedPublishDate = new Date(page.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedUpdateDate = new Date(page.updatedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      {/* Injections des données structurées pour Google Rich Snippets */}
      <JsonLdScript id="schema-breadcrumb" schema={breadcrumbJsonLd} />
      <JsonLdScript id="schema-article" schema={articleJsonLd} />
      {faqJsonLd && <JsonLdScript id="schema-faq" schema={faqJsonLd} />}

      <article className="seo-page-container">
        {/* Navigation fil d'Ariane */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero de l'article */}
        <header className="page-hero">
          <div className="hero-tags-wrapper">
            <span className="badge category-badge">{page.category}</span>
            <span className="badge reading-badge">⏱ {page.readingTimeMinutes} min de lecture</span>
            {page.rating && (
              <span className="badge rating-badge">
                ⭐ {page.rating.value}/5 ({page.rating.count} avis)
              </span>
            )}
          </div>

          <h1 className="page-h1">{page.h1}</h1>

          {page.subtitle && <p className="page-subtitle">{page.subtitle}</p>}

          <div className="author-meta-bar">
            <div className="author-info">
              <div className="author-avatar" aria-hidden="true">
                {page.author.name.charAt(0)}
              </div>
              <div className="author-text">
                <span className="author-name">{page.author.name}</span>
                <span className="author-role">{page.author.role}</span>
              </div>
            </div>

            <div className="date-info">
              <span>Publié le <time dateTime={page.publishedAt}>{formattedPublishDate}</time></span>
              {page.updatedAt !== page.publishedAt && (
                <span className="updated-date">
                  • Mis à jour le <time dateTime={page.updatedAt}>{formattedUpdateDate}</time>
                </span>
              )}
            </div>
          </div>

          {/* Métriques clés en grille de cartes */}
          {page.keyMetrics && page.keyMetrics.length > 0 && (
            <div className="key-metrics-grid">
              {page.keyMetrics.map((metric, idx) => (
                <div key={idx} className="metric-card">
                  <div className="metric-number">{metric.value}</div>
                  <div className="metric-name">{metric.label}</div>
                  {metric.hint && <div className="metric-sub">{metric.hint}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Grand Bouton d'Appel à l'Action / Affiliation Très Visible */}
          {page.affiliateLink && (
            <div className="affiliate-hero-banner">
              <div className="affiliate-banner-info">
                <div className="affiliate-badge-row">
                  <span className="affiliate-pill">⭐ Solution Recommandée</span>
                  <span className="affiliate-partner-tag">Lien Partenaire Vérifié</span>
                </div>
                <h2 className="affiliate-banner-heading">
                  Passez à l&apos;action avec l&apos;outil de référence
                </h2>
                <p className="affiliate-banner-text">
                  Testez et déployez les techniques présentées dans cet article grâce à la plateforme recommandée par nos experts.
                </p>
              </div>

              <div className="affiliate-btn-container">
                <a
                  href={page.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="affiliate-main-btn"
                  id="hero-affiliate-cta"
                >
                  <span className="btn-text">{page.affiliateButtonText || "Découvrir l'outil"}</span>
                  <span className="btn-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </span>
                </a>
                <span className="affiliate-guarantee-note">🔒 Accès direct sécurisé • Redirection immédiate</span>
              </div>
            </div>
          )}
        </header>

        {/* Layout en 2 colonnes (Contenu Principal + Sidebar SEO) */}
        <div className="page-main-layout">
          <main className="content-column">
            {/* Résumé éditorial / Chapô */}
            <div className="summary-box">
              <div className="summary-icon">💡</div>
              <div className="summary-content">
                <h2 className="summary-title">En résumé</h2>
                <p>{page.summary}</p>
              </div>
            </div>

            {/* Sections de contenu générées dynamiquement */}
            <div className="article-body">
              {page.sections.map((section) => (
                <section key={section.id} id={section.id} className="content-section">
                  <h2 className="section-title">{section.title}</h2>
                  <p className="section-paragraph">{section.content}</p>

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="section-bullets">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {section.codeSnippet && (
                    <div className="code-block-wrapper">
                      <div className="code-header">
                        <span className="code-lang">{section.codeSnippet.language}</span>
                        <span className="code-label">Exemple de code</span>
                      </div>
                      <pre className="code-pre">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {section.callout && (
                    <div className={`callout-box callout-${section.callout.type}`}>
                      <div className="callout-icon">
                        {section.callout.type === 'tip' && '💡'}
                        {section.callout.type === 'info' && 'ℹ️'}
                        {section.callout.type === 'warning' && '⚠️'}
                      </div>
                      <div className="callout-text">{section.callout.text}</div>
                    </div>
                  )}

                  {section.keyTakeaway && (
                    <div className="takeaway-box">
                      <strong className="takeaway-label">Point clé à retenir :</strong>{' '}
                      <span>{section.keyTakeaway}</span>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Avantages & Inconvénients (si renseignés) */}
            {page.prosAndCons && (
              <section className="pros-cons-section">
                <h2 className="pros-cons-title">Analyse comparative</h2>
                <div className="pros-cons-grid">
                  <div className="pros-card">
                    <h3 className="pros-title">✅ Points forts</h3>
                    <ul>
                      {page.prosAndCons.pros.map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons-card">
                    <h3 className="cons-title">⚠️ Points d&apos;attention</h3>
                    <ul>
                      {page.prosAndCons.cons.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Micro-outil interactif gratuit : Simulateur ROI & Économies SEO */}
            <SeoRoiCalculator pageCategory={page.category} />

            {/* FAQ interactive avec balisage Schema.org */}
            {page.faqs && page.faqs.length > 0 && <FaqAccordion faqs={page.faqs} />}

            {/* Tag Cloud */}
            {page.tags && page.tags.length > 0 && (
              <div className="page-tags-cloud">
                <span className="tags-label">Tags associés :</span>
                {page.tags.map((tag) => (
                  <span key={tag} className="tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Encadré d'Appel à l'Action (CTA) */}
            {page.cta && (
              <div className="page-cta-card">
                <div className="cta-content">
                  <h2 className="cta-title">{page.cta.title}</h2>
                  <p className="cta-desc">{page.cta.description}</p>
                </div>
                <Link href={page.cta.buttonUrl} className="cta-button">
                  {page.cta.buttonText} →
                </Link>
              </div>
            )}
          </main>

          {/* Sidebar : Sommaire & Maillage Interne */}
          <aside className="sidebar-column">
            <div className="sidebar-sticky">
              {/* Widget Partenaire / Affiliation Sidebar */}
              {page.affiliateLink && (
                <div className="sidebar-affiliate-card">
                  <div className="sidebar-affiliate-badge">
                    <span>⭐ Recommandation</span>
                  </div>
                  <h3 className="sidebar-affiliate-title">Outil recommandé</h3>
                  <p className="sidebar-affiliate-desc">
                    La solution clé en main recommandée par nos experts pour ce sujet.
                  </p>
                  <a
                    href={page.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="sidebar-affiliate-btn"
                  >
                    <span>{page.affiliateButtonText || "Découvrir l'outil"}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              )}

              {/* Sommaire d'ancres */}
              <TableOfContents sections={page.sections} />

              {/* Encadré Maillage Interne : Articles Similaires */}
              {relatedPages.length > 0 && (
                <div className="related-pages-box">
                  <h3 className="related-heading">
                    <span className="related-icon">🔗</span> Pages Connexes
                  </h3>
                  <div className="related-list">
                    {relatedPages.map((relPage) => (
                      <div key={relPage.id} className="related-item">
                        <span className="related-category">{relPage.category}</span>
                        <Link href={`/${relPage.slug}`} className="related-link">
                          {relPage.title}
                        </Link>
                        <span className="related-time">{relPage.readingTimeMinutes} min de lecture</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bloc Métadonnées Crawl */}
              <div className="crawl-metadata-box">
                <h4>Indexation & Canonical</h4>
                <div className="meta-row">
                  <span>URL Canonique :</span>
                  <code>/{page.slug}</code>
                </div>
                <div className="meta-row">
                  <span>Directives :</span>
                  <code>index, follow</code>
                </div>
                <div className="meta-row">
                  <span>Protocole :</span>
                  <code>HTTPS / SSG HTML</code>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
