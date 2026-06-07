import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/format';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { IconFilter, IconX } from '../components/Icons';

const initialFilters = {
  search: '',
  category: 'all',
  size: 'all',
  color: 'all',
  sort: 'featured',
  inStock: false
};

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const search = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    const size = searchParams.get('size') || 'all';
    const color = searchParams.get('color') || 'all';
    const sort = searchParams.get('sort') || 'featured';
    const tag = searchParams.get('tag') || '';
    const categoryMatch =
      category === 'all'
        ? 'all'
        : products.find((product) => product.category.toLowerCase() === category.toLowerCase())?.category || category;

    setFilters((current) => ({
      ...current,
      search,
      category: categoryMatch,
      size,
      color,
      sort,
      tag
    }));
  }, [searchParams, products]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .getProducts('')
      .then((data) => {
        if (alive) {
          setProducts(data.items || []);
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
  }, []);

  const categories = ['all', ...new Set(products.map((product) => product.category))];
  const sizes = ['all', ...new Set(products.flatMap((product) => product.sizes))];
  const colors = ['all', ...new Set(products.flatMap((product) => product.colors))];

  const filteredProducts = products.filter((product) => {
    const search = filters.search.trim().toLowerCase();
    const tag = (filters.tag || '').toLowerCase();
    const matchesSearch =
      !search ||
      [product.name, product.description, product.category, ...(product.tags || []), ...(product.colors || []), ...(product.sizes || [])]
        .join(' ')
        .toLowerCase()
        .includes(search);
    const matchesCategory = filters.category === 'all' || product.category.toLowerCase() === filters.category.toLowerCase();
    const matchesSize = filters.size === 'all' || product.sizes.some((value) => value.toLowerCase() === filters.size.toLowerCase());
    const matchesColor = filters.color === 'all' || product.colors.some((value) => value.toLowerCase() === filters.color.toLowerCase());
    const matchesStock = !filters.inStock || product.inStock;
    const matchesTag = !tag || (product.tags || []).map((item) => item.toLowerCase()).includes(tag);
    return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesStock && matchesTag;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'price-asc') return a.price - b.price;
    if (filters.sort === 'price-desc') return b.price - a.price;
    if (filters.sort === 'rating') return b.rating - a.rating;
    if (filters.sort === 'newest') return b.id - a.id;
    return Number(b.featured) - Number(a.featured) || b.reviewsCount - a.reviewsCount;
  });

  const updateFilter = (key, value) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);

    const nextParams = new URLSearchParams(searchParams);
    if (nextFilters.search) nextParams.set('q', nextFilters.search);
    else nextParams.delete('q');
    if (nextFilters.category !== 'all') nextParams.set('category', nextFilters.category);
    else nextParams.delete('category');
    if (nextFilters.size !== 'all') nextParams.set('size', nextFilters.size);
    else nextParams.delete('size');
    if (nextFilters.color !== 'all') nextParams.set('color', nextFilters.color);
    else nextParams.delete('color');
    if (nextFilters.sort !== 'featured') nextParams.set('sort', nextFilters.sort);
    else nextParams.delete('sort');
    if (nextFilters.tag) nextParams.set('tag', nextFilters.tag);
    else nextParams.delete('tag');
    setSearchParams(nextParams, { replace: true });
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchParams({});
  };

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Shop"
          title="Browse a premium clothing catalog with useful filters."
        />

          <div className="shop-toolbar">
          <div className="shop-toolbar__search">
            <input
              value={filters.search}
              onChange={(event) => updateFilter('search', event.target.value)}
              aria-label="Search products"
            />
          </div>
          <div className="shop-toolbar__summary">
            <span>{sortedProducts.length} products</span>
            <button className="button button--ghost button--small" type="button" onClick={clearFilters}>
              <IconX className="button__icon" />
              Clear filters
            </button>
          </div>
        </div>

        <div className="filter-layout">
          <aside className="sidebar">
            <div className="sidebar__header">
              <IconFilter className="sidebar__icon" />
              <strong>Filters</strong>
            </div>

            <label className="field">
              <span className="field__label">Category</span>
              <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All categories' : category}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Size</span>
              <select value={filters.size} onChange={(event) => updateFilter('size', event.target.value)}>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size === 'all' ? 'All sizes' : size}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Color</span>
              <select value={filters.color} onChange={(event) => updateFilter('color', event.target.value)}>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color === 'all' ? 'All colors' : color}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field__label">Sort by</span>
              <select value={filters.sort} onChange={(event) => updateFilter('sort', event.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
              </select>
            </label>

            <label className="check-row">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(event) => updateFilter('inStock', event.target.checked)}
              />
              Show only in-stock products
            </label>

          </aside>

          <section className="content">
            {loading ? (
              <div className="skeleton-grid">
                {Array.from({ length: 6 }, (_, index) => (
                  <div className="skeleton-card" key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="alert alert--error">{error}</div>
            ) : sortedProducts.length ? (
              <div className="product-grid">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No products matched your filters.</h3>
                <Link className="button button--primary" to="/shop" onClick={clearFilters}>
                  Reset filters
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
