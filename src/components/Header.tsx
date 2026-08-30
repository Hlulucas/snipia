import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="brand-logo" aria-label={`${siteConfig.siteName} Accueil`}>
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <span className="brand-text">
            SEO<span className="brand-highlight">Matrix</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Navigation principale">
          <ul className="nav-links">
            <li>
              <Link href="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/guide-programmatic-seo-nextjs" className="nav-link">
                Guide pSEO
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="nav-link" target="_blank">
                Sitemap.xml
              </Link>
            </li>
            <li>
              <Link href="/robots.txt" className="nav-link" target="_blank">
                Robots.txt
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="status-badge" title="Toutes les pages sont pré-rendues statiquement">
            <span className="pulse-dot"></span>
            <span className="badge-label">SSG Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
}
