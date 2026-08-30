import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className="breadcrumbs-nav">
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <Link href="/" className="breadcrumb-link">
            Accueil
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="breadcrumb-item">
              <span className="breadcrumb-separator" aria-hidden="true">/</span>
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="breadcrumb-link">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
