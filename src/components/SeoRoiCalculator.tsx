'use client';

import React, { useState, useMemo } from 'react';

interface PresetScenario {
  name: string;
  pages: number;
  monthlySearches: number;
  ctr: number;
  conversionRate: number;
  orderValue: number;
}

const PRESETS: Record<string, PresetScenario> = {
  local: {
    name: '🏙️ SEO Local / Services',
    pages: 120,
    monthlySearches: 450,
    ctr: 5.5,
    conversionRate: 3.5,
    orderValue: 120,
  },
  ecommerce: {
    name: '🛍️ E-commerce & Produits',
    pages: 600,
    monthlySearches: 900,
    ctr: 4.0,
    conversionRate: 2.2,
    orderValue: 65,
  },
  b2b: {
    name: '💼 B2B & SaaS',
    pages: 250,
    monthlySearches: 800,
    ctr: 6.0,
    conversionRate: 1.8,
    orderValue: 450,
  },
};

interface SeoRoiCalculatorProps {
  pageCategory?: string;
  defaultPages?: number;
}

export default function SeoRoiCalculator({
  pageCategory,
  defaultPages = 200,
}: SeoRoiCalculatorProps) {
  // États du calculateur
  const [pagesCount, setPagesCount] = useState<number>(defaultPages);
  const [monthlySearches, setMonthlySearches] = useState<number>(650);
  const [ctrPercent, setCtrPercent] = useState<number>(4.8);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [orderValue, setOrderValue] = useState<number>(85);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Calculs dynamiques
  const results = useMemo(() => {
    // Volume total potentiel
    const totalPotentialSearches = pagesCount * monthlySearches;
    // Trafic organique mensuel estimé
    const monthlyTraffic = Math.round(totalPotentialSearches * (ctrPercent / 100));
    const annualTraffic = monthlyTraffic * 12;

    // Conversions mensuelles
    const monthlyConversions = Math.round(monthlyTraffic * (conversionRate / 100));
    // Revenu mensuel & annuel estimé
    const monthlyRevenue = monthlyConversions * orderValue;
    const annualRevenue = monthlyRevenue * 12;

    // Économie équivalente en achat de mots-clés Google Ads (SEA) (basé sur un CPC moyen de 1.40 €)
    const averageCpc = 1.4;
    const monthlySeaSavings = Math.round(monthlyTraffic * averageCpc);
    const annualSeaSavings = monthlySeaSavings * 12;

    // Heures de rédaction manuelle économisées (estimé à 2.5h par page)
    const hoursSaved = Math.round(pagesCount * 2.5);
    // Économie budget rédaction (estimé à 80€/article moyen)
    const copywritingSavings = pagesCount * 80;

    return {
      monthlyTraffic,
      annualTraffic,
      monthlyConversions,
      monthlyRevenue,
      annualRevenue,
      monthlySeaSavings,
      annualSeaSavings,
      hoursSaved,
      copywritingSavings,
    };
  }, [pagesCount, monthlySearches, ctrPercent, conversionRate, orderValue]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (p) {
      setPagesCount(p.pages);
      setMonthlySearches(p.monthlySearches);
      setCtrPercent(p.ctr);
      setConversionRate(p.conversionRate);
      setOrderValue(p.orderValue);
      setActivePreset(key);
    }
  };

  const copySummary = () => {
    const summaryText = `📊 Simulation ROI Programmatic SEO :
- Pages générées : ${pagesCount.toLocaleString('fr-FR')}
- Trafic mensuel estimé : ${results.monthlyTraffic.toLocaleString('fr-FR')} visiteurs/mois
- CA annuel potentiel : ${results.annualRevenue.toLocaleString('fr-FR')} € / an
- Économie Google Ads (SEA) : ${results.annualSeaSavings.toLocaleString('fr-FR')} € / an
- Temps de rédaction gagné : ${results.hoursSaved.toLocaleString('fr-FR')} heures
Généré avec l'estimateur SEO Matrix Engine.`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    });
  };

  return (
    <section className="seo-calculator-wrapper" aria-labelledby="calc-title">
      <div className="calc-card">
        {/* En-tête de l'outil */}
        <div className="calc-header">
          <div className="calc-title-area">
            <span className="calc-badge">
              <span className="calc-badge-icon">⚡</span> Micro-Outil Gratuit
            </span>
            <h2 id="calc-title" className="calc-heading">
              Simulateur de ROI &amp; Économies Programmatic SEO
            </h2>
            <p className="calc-subheading">
              Estimez le trafic potentiel, les revenus générés et les économies budgétaires (SEA &amp; Rédaction)
              {pageCategory ? ` pour vos contenus "${pageCategory}".` : ' en déployant un modèle de pages automatisées.'}
            </p>
          </div>

          {/* Scénarios prédéfinis */}
          <div className="calc-presets-bar">
            <span className="presets-label">Scénarios types :</span>
            <div className="presets-buttons">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  className={`preset-btn ${activePreset === key ? 'preset-active' : ''}`}
                  onClick={() => applyPreset(key)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille principale : Paramètres à gauche, Résultats à droite */}
        <div className="calc-body-grid">
          {/* Colonne des contrôles interactifs */}
          <div className="calc-inputs-column">
            <h3 className="calc-section-label">Paramètres de votre stratégie</h3>

            {/* 1. Nombre de pages */}
            <div className="calc-field-group">
              <div className="field-label-row">
                <label htmlFor="pages-slider">Nombre de pages à générer</label>
                <span className="field-value-badge">{pagesCount.toLocaleString('fr-FR')} pages</span>
              </div>
              <input
                id="pages-slider"
                type="range"
                min={20}
                max={2500}
                step={10}
                value={pagesCount}
                onChange={(e) => {
                  setPagesCount(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="calc-range-slider"
              />
              <div className="field-hints-row">
                <span>20</span>
                <span>1 000</span>
                <span>2 500+</span>
              </div>
            </div>

            {/* 2. Volume mensuel moyen par mot-clé */}
            <div className="calc-field-group">
              <div className="field-label-row">
                <label htmlFor="searches-slider">Recherches mensuelles moyennes / mot-clé</label>
                <span className="field-value-badge">{monthlySearches.toLocaleString('fr-FR')} req/mois</span>
              </div>
              <input
                id="searches-slider"
                type="range"
                min={50}
                max={5000}
                step={50}
                value={monthlySearches}
                onChange={(e) => {
                  setMonthlySearches(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="calc-range-slider"
              />
              <div className="field-hints-row">
                <span>Longue traîne (50)</span>
                <span>Moyenne traîne (2 500)</span>
                <span>Volume fort (5 000)</span>
              </div>
            </div>

            {/* 3. Taux de clic CTR moyen */}
            <div className="calc-field-group">
              <div className="field-label-row">
                <label htmlFor="ctr-slider">Taux de clic estimé (CTR %)</label>
                <span className="field-value-badge">{ctrPercent.toFixed(1)} %</span>
              </div>
              <input
                id="ctr-slider"
                type="range"
                min={1}
                max={20}
                step={0.1}
                value={ctrPercent}
                onChange={(e) => {
                  setCtrPercent(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="calc-range-slider"
              />
              <div className="field-hints-row">
                <span>Pos. 8-10 (2%)</span>
                <span>Pos. 4-6 (5%)</span>
                <span>Top 3 (15%+)</span>
              </div>
            </div>

            {/* 4. Taux de conversion & Panier moyen en 2 colonnes */}
            <div className="calc-sub-grid">
              <div className="calc-field-group">
                <div className="field-label-row">
                  <label htmlFor="conv-rate">Taux conversion</label>
                  <span className="field-value-badge">{conversionRate.toFixed(1)} %</span>
                </div>
                <input
                  id="conv-rate"
                  type="range"
                  min={0.5}
                  max={8}
                  step={0.1}
                  value={conversionRate}
                  onChange={(e) => {
                    setConversionRate(Number(e.target.value));
                    setActivePreset(null);
                  }}
                  className="calc-range-slider"
                />
              </div>

              <div className="calc-field-group">
                <div className="field-label-row">
                  <label htmlFor="order-value">Valeur client / Panier</label>
                  <span className="field-value-badge">{orderValue} €</span>
                </div>
                <input
                  id="order-value"
                  type="range"
                  min={10}
                  max={800}
                  step={5}
                  value={orderValue}
                  onChange={(e) => {
                    setOrderValue(Number(e.target.value));
                    setActivePreset(null);
                  }}
                  className="calc-range-slider"
                />
              </div>
            </div>
          </div>

          {/* Colonne des résultats instantanés */}
          <div className="calc-results-column">
            <div className="results-box">
              <div className="results-top-header">
                <span className="results-pill">Estimation Prévisionnelle</span>
                <button
                  type="button"
                  onClick={copySummary}
                  className="copy-summary-btn"
                  title="Copier le résumé"
                >
                  {copiedNotification ? '✓ Copié !' : '📋 Copier le bilan'}
                </button>
              </div>

              {/* Carte principale de CA */}
              <div className="main-metric-hero-card">
                <span className="main-metric-label">Revenus Annuels Potentiels</span>
                <div className="main-metric-value">
                  {results.annualRevenue.toLocaleString('fr-FR')} €
                  <span className="main-metric-unit"> / an</span>
                </div>
                <span className="main-metric-sub">
                  Soit environ <strong>{results.monthlyRevenue.toLocaleString('fr-FR')} €</strong> générés par mois
                </span>
              </div>

              {/* Grille des 4 métriques clés */}
              <div className="results-metrics-grid">
                <div className="res-card">
                  <div className="res-icon">👥</div>
                  <div className="res-info">
                    <span className="res-number">{results.monthlyTraffic.toLocaleString('fr-FR')}</span>
                    <span className="res-label">Visiteurs / mois</span>
                    <span className="res-sub">({results.annualTraffic.toLocaleString('fr-FR')} / an)</span>
                  </div>
                </div>

                <div className="res-card">
                  <div className="res-icon">🎯</div>
                  <div className="res-info">
                    <span className="res-number">{results.monthlyConversions.toLocaleString('fr-FR')}</span>
                    <span className="res-label">Conversions / mois</span>
                    <span className="res-sub">Ventes ou leads</span>
                  </div>
                </div>

                <div className="res-card highlight-emerald">
                  <div className="res-icon">💰</div>
                  <div className="res-info">
                    <span className="res-number">{results.annualSeaSavings.toLocaleString('fr-FR')} €</span>
                    <span className="res-label">Économie Google Ads</span>
                    <span className="res-sub">Équivalent SEA évité</span>
                  </div>
                </div>

                <div className="res-card highlight-indigo">
                  <div className="res-icon">⏱️</div>
                  <div className="res-info">
                    <span className="res-number">{results.hoursSaved.toLocaleString('fr-FR')} h</span>
                    <span className="res-label">Temps de rédaction gagné</span>
                    <span className="res-sub">~{results.copywritingSavings.toLocaleString('fr-FR')} € d&apos;économie</span>
                  </div>
                </div>
              </div>

              {/* Indicateur de Rentabilité */}
              <div className="calc-conclusion-banner">
                <div className="conclusion-indicator">
                  <span className="indicator-dot"></span>
                  <strong>Indice de rentabilité SEO : Exceptionnel (10x+)</strong>
                </div>
                <p className="conclusion-text">
                  En automatisant la génération de ces {pagesCount} pages via Next.js SSG, vous
                  créez un actif organique durable sans coût récurrent au clic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
