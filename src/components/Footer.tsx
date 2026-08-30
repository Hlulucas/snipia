import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { getAllCategories } from '@/lib/seo-data';

export default async function Footer() {
  const categories = await getAllCategories();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="brand-text">
                SEO<span className="brand-highlight">Matrix</span>
              </span>
            </div>
            <p className="footer-desc">
              Architecture Next.js pour le référencement naturel et la génération programmatique
              (pSEO) à haute performance. Optimisé pour Google Search, Core Web Vitals et Schema.org.
            </p>
            <div className="seo-tags-badge">
              <span>🚀 100% Static HTML</span>
              <span>⚡ Core Web Vitals 100</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Thématiques SEO</h4>
            <ul className="footer-links">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href={`/?category=${encodeURIComponent(cat)}`} className="footer-link">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Ressources & Protocoles</h4>
            <ul className="footer-links">
              <li>
                <Link href="/sitemap.xml" className="footer-link">
                  Sitemap XML dynamique
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="footer-link">
                  Fichier Robots.txt
                </Link>
              </li>
              <li>
                <a
                  href="https://developers.google.com/search/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Google Search Central ↗
                </a>
              </li>
              <li>
                <a
                  href="https://schema.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Documentation Schema.org ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Architecture</h4>
            <p className="footer-small-text">
              Génération automatique de pages à partir de données JSON locales via Next.js App Router
              et <code className="inline-code">generateStaticParams()</code>.
            </p>
            <div className="footer-author">
              <span>Maintenu par : <strong>{siteConfig.author.name}</strong></span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} {siteConfig.siteName}. Déployé avec Next.js & TypeScript.
          </p>
          <div className="footer-meta-badges">
            <span className="meta-pill">JSON-LD Validated</span>
            <span className="meta-pill">OpenGraph Ready</span>
            <span className="meta-pill">Mobile-First</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
