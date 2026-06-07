import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SectionHeading } from '../components/SectionHeading';
import { EmptyState } from '../components/EmptyState';

export function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Wishlist"
          title="A wishlist helps the demo feel like a real store."
        />

        {wishlist.length ? (
          <div className="product-grid">
            {wishlist.map((item) => (
              <article className="wishlist-card" key={item.slug}>
                <img src={item.image} alt={item.name} />
                <div className="wishlist-card__body">
                  <span className="wishlist-card__category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.inStock ? 'In stock' : 'Sold out'}</p>
                  <Link className="button button--ghost button--small" to={`/product/${item.slug}`}>
                    View product
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No saved items yet"
            actionLabel="Explore shop"
            actionTo="/shop"
          />
        )}
      </div>
    </div>
  );
}
