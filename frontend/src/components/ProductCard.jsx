import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../lib/format';
import { IconBag, IconHeart, IconSparkle } from './Icons';
import { RatingStars } from './RatingStars';

export function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.slug);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.slug}`} className="product-card__image-link">
          <img className="product-card__image" src={product.gallery?.[0]} alt={product.name} loading="lazy" />
        </Link>
        <div className="product-card__overlay">
          {product.badges?.[0] ? (
            <span className="badge badge--dark">
              <IconSparkle className="badge__icon" /> {product.badges[0]}
            </span>
          ) : null}
          <button className={`icon-chip ${wished ? 'icon-chip--active' : ''}`} type="button" onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist">
            <IconHeart className="icon-chip__icon" />
          </button>
        </div>
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <span className={`stock-pill ${product.inStock ? 'stock-pill--in' : 'stock-pill--out'}`}>
            {product.inStock ? 'In stock' : 'Sold out'}
          </span>
        </div>
        <Link to={`/product/${product.slug}`} className="product-card__title">
          {product.name}
        </Link>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__rating">
          <RatingStars rating={product.rating} />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviewsCount})</span>
        </div>
        <div className="product-card__footer">
          <div>
            <p className="product-price">{formatCurrency(product.price)}</p>
            {product.compareAtPrice ? <p className="product-price product-price--muted">{formatCurrency(product.compareAtPrice)}</p> : null}
          </div>
          <button className="button button--small button--ghost" type="button" onClick={() => addToCart(product)}>
            <IconBag className="button__icon" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
