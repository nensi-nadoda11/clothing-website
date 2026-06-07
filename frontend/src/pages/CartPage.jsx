import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/format';
import { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { IconArrowRight, IconBag, IconMinus, IconPlus, IconTrash } from '../components/Icons';

export function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    couponCode,
    setCouponCode
  } = useStore();
  const [summary, setSummary] = useState({ subtotal, discount, shipping, tax, total });

  useEffect(() => {
    let alive = true;
    api
      .post('/api/checkout/summary', {
        items: cart,
        couponCode
      })
      .then((data) => {
        if (alive) {
          setSummary(data.summary);
        }
      })
      .catch(() => {
        if (alive) {
          setSummary({ subtotal, discount, shipping, tax, total });
        }
      });

    return () => {
      alive = false;
    };
  }, [cart, couponCode, subtotal, discount, shipping, tax, total]);

  if (!cart.length) {
    return (
      <div className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Cart"
            title="Your cart is empty right now."
          />
          <div className="empty-state">
            <IconBag className="empty-state__icon" />
            <h3>No items added yet</h3>
            <Link className="button button--primary" to="/shop">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = Math.min((summary.subtotal / 4999) * 100, 100);

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Cart"
          title="A smooth cart page makes the demo feel complete."
        />

        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.key}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item__content">
                  <div className="cart-item__top">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      <p className="cart-item__variant">
                        {item.size ? `Size: ${item.size}` : 'One size'}
                        {item.color ? ` | Color: ${item.color}` : ''}
                      </p>
                    </div>
                    <button className="icon-button icon-button--plain" type="button" onClick={() => removeFromCart(item.key)}>
                      <IconTrash className="icon-button__icon" />
                    </button>
                  </div>

                  <div className="cart-item__bottom">
                    <div className="quantity-control">
                      <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)}>
                        <IconMinus className="quantity-control__icon" />
                      </button>
                      <strong>{item.quantity}</strong>
                      <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)}>
                        <IconPlus className="quantity-control__icon" />
                      </button>
                    </div>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="summary-card">
            <h3>Order summary</h3>
            <div className="summary-card__row">
              <span>Subtotal</span>
              <strong>{formatCurrency(summary.subtotal)}</strong>
            </div>
            <div className="summary-card__row">
              <span>Discount</span>
              <strong>- {formatCurrency(summary.discount)}</strong>
            </div>
            <div className="summary-card__row">
              <span>Shipping</span>
              <strong>{summary.shipping === 0 ? 'Free' : formatCurrency(summary.shipping)}</strong>
            </div>
            <div className="summary-card__row">
              <span>Tax</span>
              <strong>{formatCurrency(summary.tax)}</strong>
            </div>
            <div className="summary-card__total">
              <span>Total</span>
              <strong>{formatCurrency(summary.total)}</strong>
            </div>

            <label className="field">
              <span className="field__label">Coupon code</span>
              <input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} />
            </label>

            <div className="shipping-progress">
              <div className="shipping-progress__bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <Link className="button button--primary button--full" to="/checkout">
              Proceed to checkout
              <IconArrowRight className="button__icon" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
