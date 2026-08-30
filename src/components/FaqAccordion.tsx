import { SeoFaqItem } from '@/types/page-data';

interface FaqAccordionProps {
  faqs: SeoFaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-header">
        <span className="section-badge">Foire Aux Questions</span>
        <h2 id="faq-title" className="faq-heading">
          Questions Fréquentes
        </h2>
        <p className="faq-subheading">
          Retrouvez les réponses d&apos;experts aux questions les plus posées sur ce sujet.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={index} className="faq-item" open={index === 0}>
            <summary className="faq-question">
              <span className="faq-question-text">{faq.question}</span>
              <span className="faq-chevron" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
