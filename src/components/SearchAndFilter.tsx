'use client';

import React, { useState, useMemo } from 'react';
import { SeoPageData } from '@/types/page-data';
import PageCard from '@/components/PageCard';

interface SearchAndFilterProps {
  initialPages: SeoPageData[];
  categories: string[];
  initialCategory?: string;
}

export default function SearchAndFilter({
  initialPages,
  categories,
  initialCategory = 'all',
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredPages = useMemo(() => {
    return initialPages.filter((page) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        page.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        page.title.toLowerCase().includes(q) ||
        page.metaDescription.toLowerCase().includes(q) ||
        page.summary.toLowerCase().includes(q) ||
        (page.tags?.some((t) => t.toLowerCase().includes(q)) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [initialPages, selectedCategory, searchQuery]);

  return (
    <div className="search-filter-section">
      <div className="search-filter-controls">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            className="search-input"
            placeholder="Rechercher par mot-clé, sujet, tag (ex: Core Web Vitals, Schema.org)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Rechercher une page"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-chips-list" role="tablist" aria-label="Filtrer par catégorie">
          <button
            role="tab"
            aria-selected={selectedCategory === 'all'}
            className={`category-chip ${selectedCategory === 'all' ? 'chip-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Toutes les catégories ({initialPages.length})
          </button>
          {categories.map((cat) => {
            const count = initialPages.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`category-chip ${selectedCategory === cat ? 'chip-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="results-header">
        <p className="results-count">
          <strong>{filteredPages.length}</strong> {filteredPages.length > 1 ? 'pages générées trouvées' : 'page trouvée'}
          {selectedCategory !== 'all' && (
            <span> dans la catégorie <em>&ldquo;{selectedCategory}&rdquo;</em></span>
          )}
        </p>
      </div>

      {filteredPages.length > 0 ? (
        <div className="pages-grid">
          {filteredPages.map((page) => (
            <PageCard key={page.slug || page.id} page={page} />
          ))}
        </div>
      ) : (
        <div className="no-results-box">
          <div className="no-results-icon">🔍</div>
          <h3>Aucune page ne correspond à votre recherche</h3>
          <p>Essayez avec d&apos;autres termes ou réinitialisez les filtres.</p>
          <button
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
