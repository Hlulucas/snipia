import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="brand-logo" aria-label={`${siteConfig.siteName} Accueil`}>
          <Image
            src="/logo.svg"
            alt={siteConfig.siteName}
            width={120}
            height={36}
            priority
            className="brand-logo-img"
          />
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
