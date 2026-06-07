import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/format';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { RatingStars } from '../components/RatingStars';
import { IconArrowRight, IconCheck, IconHeart, IconShield, IconTruck } from '../components/Icons';

export function ProductPage() {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .getProduct(slug)
      .then((data) => {
        if (alive) {
          setProduct(data.product);
          setRelated(data.related || []);
          setSelectedImage(data.product.gallery?.[0] || '');
          setSelectedSize(data.product.sizes?.[0] || '');
          setSelectedColor(data.product.colors?.[0] || '');
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        if (alive) {
          setError(fetchError.message);
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  const handleAddToCart = () => {
    if (product.sizes.length && !selectedSize) {
      setError('Please choose a size before adding to cart.');
      return;
    }

    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    setError('');
    setSuccess(`${product.name} added to cart.`);
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="product-skeleton">
            <div className="skeleton-card skeleton-card--large" />
            <div className="skeleton-card skeleton-card--panel" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section">
        <div className="container">
          <div className="alert alert--error">{error || 'Product not found.'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-gallery__main">
              <img src={selectedImage || product.gallery?.[0]} alt={product.name} />
            </div>
            <div className="product-gallery__thumbs">
              {product.gallery.map((image) => (
                <button key={image} className={`product-gallery__thumb ${selectedImage === image ? 'product-gallery__thumb--active' : ''}`} type="button" onClick={() => setSelectedImage(image)}>
                  <img src={image} alt={product.name} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-panel">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="product-panel__rating">
              <RatingStars rating={product.rating} />
              <span>{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>
            <p className="product-panel__description">{product.description}</p>
            <div className="product-panel__price-row">
              <strong className="product-panel__price">{formatCurrency(product.price)}</strong>
              <span className="product-price product-price--muted">{formatCurrency(product.compareAtPrice)}</span>
            </div>
            <div className="product-panel__pill-row">
              {product.badges.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>

            <div className="variant-group">
              <span className="variant-group__label">Size</span>
              <div className="chip-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`chip ${selectedSize === size ? 'chip--selected' : ''}`}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="variant-group">
              <span className="variant-group__label">Color</span>
              <div className="chip-row">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`chip ${selectedColor === color ? 'chip--selected' : ''}`}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-row">
              <span className="variant-group__label">Quantity</span>
              <div className="quantity-control">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                  -
                </button>
                <strong>{quantity}</strong>
                <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                  +
                </button>
              </div>
            </div>

            {error ? <div className="alert alert--error">{error}</div> : null}
            {success ? <div className="alert alert--success">{success}</div> : null}

            <div className="product-panel__actions">
              <button className="button button--primary" type="button" onClick={handleAddToCart}>
                Add to cart
                <IconArrowRight className="button__icon" />
              </button>
              <button className="button button--ghost" type="button" onClick={() => toggleWishlist(product)}>
                <IconHeart className="button__icon" />
                {isWishlisted(product.slug) ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <div className="trust-list">
              <div><IconTruck className="inline-icon" /> {product.delivery}</div>
              <div><IconShield className="inline-icon" /> Easy return messaging included</div>
              <div><IconCheck className="inline-icon" /> Size guide and fabric details ready</div>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <article className="detail-card">
            <h3>Product details</h3>
            <p>{product.description}</p>
            <ul className="detail-list">
              <li><strong>Fabric</strong><span>{product.fabric}</span></li>
              <li><strong>Fit</strong><span>{product.fit}</span></li>
              <li><strong>Care</strong><span>{product.care}</span></li>
              <li><strong>Delivery</strong><span>{product.delivery}</span></li>
            </ul>
          </article>
          <article className="detail-card">
            <h3>Why it works for the demo</h3>
            <ul className="bullet-list bullet-list--stacked">
              {product.features.map((feature) => (
                <li className="bullet-list__item" key={feature}>
                  <IconCheck className="bullet-list__icon" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {related.length ? (
          <section className="section section--compact">
            <SectionHeading
              eyebrow="Related products"
              title="Keep the customer browsing."
            />
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
