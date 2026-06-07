import { SectionHeading } from '../components/SectionHeading';
import { stats, trustBadges } from '../data/siteContent';
import { IconCheck, IconShield, IconSparkle } from '../components/Icons';

export function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Built to help a freelancer win premium ecommerce clients."
        />

        <div className="split-layout">
          <article className="story-card">
            <p className="eyebrow">
              <IconSparkle className="eyebrow__icon" />
              Brand story
            </p>
            <h3>Maison Aura is a conceptual premium fashion label.</h3>
            <div className="bullet-list bullet-list--stacked">
              <div className="bullet-list__item">
                <IconCheck className="bullet-list__icon" />
                Premium home page with editorial layout
              </div>
              <div className="bullet-list__item">
                <IconCheck className="bullet-list__icon" />
                Product pages with useful shopping details
              </div>
              <div className="bullet-list__item">
                <IconCheck className="bullet-list__icon" />
                Commerce-ready backend API for future expansion
              </div>
            </div>
          </article>

          <div className="stats-grid stats-grid--single">
            {stats.map((item) => (
              <article className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <section className="section section--compact">
          <SectionHeading
            eyebrow="Why clients say yes"
            title="Trust signals are part of the design system."
          />
          <div className="trust-strip">
            {trustBadges.map((badge) => (
              <article className="trust-strip__item" key={badge.title}>
                <IconShield className="trust-strip__icon" />
                <div>
                  <h3>{badge.title}</h3>
                  <p>{badge.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
