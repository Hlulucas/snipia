import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPages, getAllCategories } from '@/lib/seo-data';
import { siteConfig } from '@/lib/site-config';
import { generateWebsiteJsonLd } from '@/lib/jsonld-generators';
import JsonLdScript from '@/components/JsonLdScript';
import SearchAndFilter from '@/components/SearchAndFilter';

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    creator: siteConfig.twitterHandle,
  },
};

export default async function HomePage() {
  const pages = await getAllPages();
  const categories = await getAllCategories();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <>
      <JsonLdScript id="schema-website" schema={websiteJsonLd} />

      <div className="home-container">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="hero-pill-badge">
            <span className="sparkle-icon">✨</span>
            <span>Next.js App Router • Programmatic SEO Engine</span>
          </div>

          <h1 className="home-hero-title">
            Génération Automatique de Pages Web &amp; <span className="gradient-text">SEO Haute Performance</span>
          </h1>

          <p className="home-hero-desc">
            Architecture complète prête pour la production. Générez instantanément des dizaines ou centaines
            de pages optimisées pour Google à partir d&apos;une base de données locale JSON avec balisage Schema.org,
            métadonnées dynamiques et sitemap automatisé.
          </p>

          {/* Quick Stats Grid */}
          <div className="hero-stats-row">
            <div className="stat-box">
              <span className="stat-number">{pages.length}</span>
              <span className="stat-label">Pages pré-rendues (SSG)</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">100/100</span>
              <span className="stat-label">Score Core Web Vitals</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-label">Schema.org JSON-LD</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">Auto</span>
              <span className="stat-label">Sitemap &amp; Robots.txt</span>
            </div>
          </div>
        </section>

        {/* How It Works Explainer Card */}
        <section className="architecture-explainer-card">
          <div className="explainer-header">
            <div className="explainer-icon">⚙️</div>
            <div>
              <h2 className="explainer-title">Comment fonctionne la génération programmatique (pSEO) ?</h2>
              <p className="explainer-subtitle">
                Ajoutez simplement de nouvelles entrées dans le fichier local <code className="inline-code">src/data/pages-data.json</code>
              </p>
            </div>
          </div>

          <div className="explainer-steps-grid">
            <div className="step-card">
              <div className="step-badge">Étape 1</div>
              <h3>1. Alimentation JSON</h3>
              <p>Chaque objet JSON définit le slug, le H1, les sections, FAQs, tags et métadonnées de la page.</p>
            </div>
            <div className="step-card">
              <div className="step-badge">Étape 2</div>
              <h3>2. Compilation SSG</h3>
              <p><code className="inline-code">generateStaticParams()</code> compile le HTML statique au moment du build pour une vitesse instantanée.</p>
            </div>
            <div className="step-card">
              <div className="step-badge">Étape 3</div>
              <h3>3. Métadonnées &amp; Rich Snippets</h3>
              <p><code className="inline-code">generateMetadata()</code> et les schémas JSON-LD sont injectés dynamiquement pour chaque slug.</p>
            </div>
            <div className="step-card">
              <div className="step-badge">Étape 4</div>
              <h3>4. Indexation Immédiate</h3>
              <p><code className="inline-code">sitemap.xml</code> et le maillage interne sont actualisés sans aucun travail manuel supplémentaire.</p>
            </div>
          </div>
        </section>

        {/* Dynamic Search, Filter & Pages Explorer */}
        <section className="explorer-section" id="pages-explorer">
          <div className="section-title-wrap">
            <h2 className="section-main-title">Explorer les pages générées dynamiquement</h2>
            <p className="section-main-subtitle">
              Toutes les pages ci-dessous sont générées à partir du jeu de données JSON local avec leurs propres métadonnées SEO.
            </p>
          </div>

          <SearchAndFilter
            initialPages={pages}
            categories={categories}
          />
        </section>

        {/* SEO Features Highlights */}
        <section className="features-highlight-section">
          <h2 className="features-main-heading">Fonctionnalités SEO Natives Intégrées</h2>
          <div className="features-grid">
            <div className="feature-item-card">
              <div className="feature-icon">⚡</div>
              <h3>Génération Statique (SSG)</h3>
              <p>Pages rendues en HTML pur au build time. Zéro latence serveur pour un TTFB sous les 50ms.</p>
            </div>
            <div className="feature-item-card">
              <div className="feature-icon">🏷️</div>
              <h3>Métadonnées Complètes</h3>
              <p>Gestion dynamique des balises Title, Meta Description, URLs Canoniques, OpenGraph et Twitter Cards.</p>
            </div>
            <div className="feature-item-card">
              <div className="feature-icon">🌟</div>
              <h3>Rich Snippets Schema.org</h3>
              <p>Balisage automatique BreadcrumbList, TechArticle et FAQPage pour captiver les internautes dans les SERPs.</p>
            </div>
            <div className="feature-item-card">
              <div className="feature-icon">🔗</div>
              <h3>Maillage Interne Intelligent</h3>
              <p>Calcul automatique de pertinence thématique pour interconnecter les pages connexes et booster le PageRank.</p>
            </div>
            <div className="feature-item-card">
              <div className="feature-icon">🗺️</div>
              <h3>Sitemap &amp; Robots Automatiques</h3>
              <p>Fichiers sitemap.xml et robots.txt générés à la volée par Next.js, conformes aux protocoles Google.</p>
            </div>
            <div className="feature-item-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile-First &amp; Accessible</h3>
              <p>Conception réactive, respect des contrastes de couleurs et balisage sémantique HTML5 complet.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
