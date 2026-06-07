import { Link, useParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { policyPages } from '../data/siteContent';
import { IconArrowRight, IconCheck } from '../components/Icons';

export function PolicyPage() {
  const { slug } = useParams();
  const page = policyPages.find((item) => item.slug === slug);

  if (!page) {
    return (
      <div className="section">
        <div className="container">
          <div className="empty-state">
            <h3>Policy page not found.</h3>
            <Link className="button button--primary" to="/shop">
              Continue shopping
              <IconArrowRight className="button__icon" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <SectionHeading eyebrow={page.eyebrow} title={page.title} />
        <div className="policy-layout">
          <article className="policy-panel">
            <p className="policy-panel__intro">{page.intro}</p>
            <div className="policy-section-list">
              {page.sections.map((section) => (
                <section className="policy-section" key={section.title}>
                  <IconCheck className="policy-section__icon" />
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="summary-card">
            <h3>Store help</h3>
            <p className="summary-card__text">
              Policies are demo-ready and can be replaced with real brand, shipping, and legal copy before launch.
            </p>
            <Link className="button button--ghost button--full" to="/track-order">
              Track demo order
            </Link>
            <Link className="button button--primary button--full" to="/contact">
              Contact support
              <IconArrowRight className="button__icon" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
