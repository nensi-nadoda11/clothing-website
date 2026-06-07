import { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext(null);

function loadStored(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function makeLineItemKey(product, options = {}) {
  return [product.slug, options.size || 'one-size', options.color || 'default'].join('::');
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => loadStored('maison-aura-cart', []));
  const [wishlist, setWishlist] = useState(() => loadStored('maison-aura-wishlist', []));
  const [couponCode, setCouponCode] = useState(() => loadStored('maison-aura-coupon', ''));

  useEffect(() => {
    window.localStorage.setItem('maison-aura-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem('maison-aura-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem('maison-aura-coupon', couponCode);
  }, [couponCode]);

  const addToCart = (product, options = {}) => {
    const key = makeLineItemKey(product, options);

    setCart((current) => {
      const found = current.find((item) => item.key === key);

      if (found) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + (options.quantity || 1) } : item
        );
      }

      return [
        ...current,
        {
          key,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.gallery?.[0] || product.image,
          category: product.category,
          size: options.size || '',
          color: options.color || '',
          quantity: options.quantity || 1
        }
      ];
    });
  };

  const updateQuantity = (key, quantity) => {
    setCart((current) =>
      quantity <= 0 ? current.filter((item) => item.key !== key) : current.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (key) => {
    setCart((current) => current.filter((item) => item.key !== key));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.slug === product.slug);
      if (exists) {
        return current.filter((item) => item.slug !== product.slug);
      }

      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.gallery?.[0] || product.image,
          category: product.category,
          rating: product.rating,
          inStock: product.inStock
        }
      ];
    });
  };

  const isWishlisted = (slug) => wishlist.some((item) => item.slug === slug);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponCode.trim().toUpperCase() === 'DEMO10' ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = Math.max(subtotal - discount, 0);
  const shipping = discountedSubtotal >= 4999 || discountedSubtotal === 0 ? 0 : 149;
  const tax = Math.round(discountedSubtotal * 0.05);
  const total = discountedSubtotal + shipping + tax;

  const value = {
    cart,
    cartCount,
    wishlist,
    wishlistCount: wishlist.length,
    couponCode,
    setCouponCode,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
    subtotal,
    discount,
    shipping,
    tax,
    total
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }

  return context;
}
