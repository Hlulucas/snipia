import Link from 'next/link';
import { SeoPageData } from '@/types/page-data';

interface PageCardProps {
  page: SeoPageData;
  isCompact?: boolean;
}

export default function PageCard({ page, isCompact = false }: PageCardProps) {
  const formattedDate = new Date(page.updatedAt || page.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className={`page-card ${isCompact ? 'card-compact' : ''}`}>
      <div className="card-top">
        <span className="card-category">{page.category}</span>
        <span className="card-read-time">{page.readingTimeMinutes} min de lecture</span>
      </div>

      <h3 className="card-title">
        <Link href={`/${page.slug}`} className="card-title-link">
          {page.title}
        </Link>
      </h3>

      <p className="card-description">{page.metaDescription}</p>

      {page.keyMetrics && page.keyMetrics.length > 0 && !isCompact && (
        <div className="card-metrics-preview">
          {page.keyMetrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="metric-pill">
              <span className="metric-val">{m.value}</span>
              <span className="metric-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="card-footer">
        <div className="card-meta">
          <span className="card-author">{page.author.name}</span>
          <span className="card-dot">•</span>
          <time dateTime={page.updatedAt} className="card-date">
            {formattedDate}
          </time>
        </div>

        <Link href={`/${page.slug}`} className="card-cta-link" aria-label={`Lire l'article ${page.title}`}>
          <span>Explorer</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </article>
  );
}
