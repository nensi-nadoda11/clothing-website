import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/format';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { IconArrowRight, IconCheck, IconShield, IconSparkle, IconTruck } from '../components/Icons';
import { categories, faqs, homeCopy, lookbook, stats, testimonials, trustBadges } from '../data/siteContent';
import { Accordion } from '../components/Accordion';

export function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    api
      .getHome()
      .then((data) => {
        if (alive) {
          setHomeData(data);
        }
      })
      .catch((fetchError) => {
        if (alive) {
          setError(fetchError.message);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const hero = homeData?.hero || homeCopy;
  const featuredProducts = homeData?.featuredProducts || [];

  return (
    <div>
      <section className="hero section">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">
              <IconSparkle className="eyebrow__icon" />
              {hero.eyebrow}
            </p>
            <h1>{hero.title}</h1>
            <div className="hero__actions">
              <Link className="button button--primary" to={hero.primaryCta?.to || hero.primaryCta?.href || '/shop'}>
                {hero.primaryCta?.label || 'Shop Collection'}
                <IconArrowRight className="button__icon" />
              </Link>
              <Link className="button button--ghost" to={hero.secondaryCta?.to || hero.secondaryCta?.href || '/shop'}>
                {hero.secondaryCta?.label || 'View Collection'}
              </Link>
            </div>
            <div className="hero__trust-row">
              <span><IconShield className="inline-icon" /> Secure checkout</span>
              <span><IconTruck className="inline-icon" /> Fast dispatch</span>
              <span><IconCheck className="inline-icon" /> Premium presentation</span>
            </div>
            <div className="stats-grid">
              {(homeData?.stats || stats).map((item) => (
                <article className="stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-card">
              <img src={hero.image} alt="Premium clothing showcase" />
              <div className="hero__floating-card">
                <span className="eyebrow">Bestseller spotlight</span>
                <strong>{featuredProducts[0]?.name || 'Aster Oversized Shirt'}</strong>
                <p>{formatCurrency(featuredProducts[0]?.price || 2499)}</p>
              </div>
            </div>
            <div className="hero__mini-grid">
              <div className="mini-card">
                <span>Available sizes</span>
                <strong>XS - XXL</strong>
              </div>
              <div className="mini-card mini-card--accent">
                <span>Demo coupon</span>
                <strong>DEMO10</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Shop by category"
            title="Curated collections that feel polished and useful."
          />
          <div className="category-grid">
            {(homeData?.categories || categories).map((category) => (
              <Link className="category-card" to={`/shop?category=${category.slug}`} key={category.slug}>
                <span className="category-card__eyebrow">Explore</span>
                <h3>{category.name}</h3>
                <span className="category-card__cta">
                  {category.highlight || 'View collection'}
                  <IconArrowRight className="inline-icon" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Featured products"
            title="The product grid is the part clients will judge fastest."
          />
          {error ? <p className="alert alert--error">{error}</p> : null}
          {featuredProducts.length ? (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="skeleton-grid">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="skeleton-card" key={index} />
              ))}
            </div>
          )}
          <div className="center-row">
            <Link className="button button--ghost" to="/shop">
              View all products
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trust-strip">
            {(homeData?.trustBadges || trustBadges).map((badge) => (
              <article className="trust-strip__item" key={badge.title}>
                <IconShield className="trust-strip__icon" />
                <div>
                  <h3>{badge.title}</h3>
                  <p>{badge.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
          <div className="container split-layout">
            <div className="lookbook-card">
              <img src={lookbook.image} alt={lookbook.title} />
            </div>
            <div className="lookbook-copy">
              <SectionHeading
                eyebrow="Lookbook"
                title={lookbook.title}
              />
            <div className="bullet-list">
              <div className="bullet-list__item">
                <IconCheck className="bullet-list__icon" />
                Editorial storytelling for premium perception
              </div>
              <div className="bullet-list__item">
                <IconCheck className="bullet-list__icon" />
                Space for brand narrative and product styling
              </div>
              <div className="bullet-list__item">
                <IconCheck className="bullet-list__icon" />
                Easy upgrade path for real content and images later
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Customer proof"
            title="Social proof makes the demo feel more real."
          />
          <div className="testimonial-grid">
            {(homeData?.testimonials || testimonials).map((item) => (
              <article className="testimonial-card" key={item.name}>
                <p className="testimonial-card__quote">“{item.quote}”</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

          <section className="section">
        <div className="container split-layout split-layout--reverse">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Answer objections before the client asks them."
            />
            <Accordion items={faqs} />
          </div>
          <div className="stats-panel">
            <div className="stats-panel__items">
              <div><strong>Filterable catalog</strong><span>Size, color, price, and category filters.</span></div>
              <div><strong>Product detail depth</strong><span>Gallery, delivery, returns, and size guide.</span></div>
              <div><strong>Commerce flow</strong><span>Wishlist, cart, coupon, and checkout screens.</span></div>
              <div><strong>Future-ready backend</strong><span>API structure designed for DB integration later.</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
