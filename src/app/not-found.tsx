import Link from 'next/link';
import { getAllPages } from '@/lib/seo-data';

export default async function NotFound() {
  const popularPages = (await getAllPages()).slice(0, 4);

  return (
    <div className="not-found-container">
      <div className="not-found-badge">Erreur 404</div>
      <h1 className="not-found-title">Page Introuvable</h1>
      <p className="not-found-desc">
        La page ou le slug que vous recherchez n&apos;existe pas ou a été déplacé dans notre architecture SEO.
      </p>

      <div className="not-found-actions">
        <Link href="/" className="btn-primary">
          ← Retour à l&apos;accueil
        </Link>
      </div>

      <div className="popular-pages-suggestions">
        <h3>Pages populaires qui pourraient vous intéresser :</h3>
        <div className="suggestions-grid">
          {popularPages.map((page) => (
            <Link key={page.id} href={`/${page.slug}`} className="suggestion-card">
              <span className="sugg-category">{page.category}</span>
              <span className="sugg-title">{page.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
