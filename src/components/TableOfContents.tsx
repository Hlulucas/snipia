import { SeoPageSection } from '@/types/page-data';

interface TableOfContentsProps {
  sections: SeoPageSection[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <aside className="toc-box" aria-label="Table des matières">
      <div className="toc-header">
        <span className="toc-icon">📌</span>
        <h3 className="toc-title">Sommaire de l&apos;article</h3>
      </div>
      <nav className="toc-nav">
        <ul className="toc-list">
          {sections.map((section, index) => (
            <li key={section.id} className="toc-item">
              <a href={`#${section.id}`} className="toc-link">
                <span className="toc-number">0{index + 1}.</span> {section.title.replace(/^\d+\.\s*/, '')}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
