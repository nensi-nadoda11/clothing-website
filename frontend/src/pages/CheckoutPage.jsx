import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/format';
import { SectionHeading } from '../components/SectionHeading';
import { IconArrowRight, IconCheck } from '../components/Icons';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'upi'
};

export function CheckoutPage() {
  const { cart, couponCode, clearCart, subtotal, discount, shipping, tax, total } = useStore();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cart.length) {
      setError('Cart is empty. Add products before placing the demo order.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await api.submitOrder({
        items: cart,
        couponCode,
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
          paymentMethod: form.paymentMethod
        }
      });

      setSuccess(response);
      clearCart();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Checkout"
          title="A clean checkout screen closes the demo story."
        />

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="field">
                <span className="field__label">Full name</span>
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </label>
              <label className="field">
                <span className="field__label">Phone</span>
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </label>
              <label className="field">
                <span className="field__label">Payment method</span>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="cod">Cash on delivery</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span className="field__label">Address</span>
              <textarea name="address" value={form.address} onChange={handleChange} rows="3" required />
            </label>

            <div className="form-grid">
              <label className="field">
                <span className="field__label">City</span>
                <input name="city" value={form.city} onChange={handleChange} required />
              </label>
              <label className="field">
                <span className="field__label">State</span>
                <input name="state" value={form.state} onChange={handleChange} required />
              </label>
              <label className="field">
                <span className="field__label">Pincode</span>
                <input name="pincode" value={form.pincode} onChange={handleChange} required />
              </label>
            </div>

            {error ? <div className="alert alert--error">{error}</div> : null}

            {success ? (
              <div className="checkout-success">
                <div className="checkout-success__icon">
                  <IconCheck />
                </div>
                <h3>Order confirmed</h3>
                <p>Order ID: {success.orderId}</p>
                <p>Estimated delivery: {success.estimatedDelivery}</p>
                <div className="checkout-success__summary">
                  <span>Total paid</span>
                  <strong>{formatCurrency(success.summary.total)}</strong>
                </div>
                <Link className="button button--ghost" to="/shop">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <button className="button button--primary" type="submit" disabled={submitting}>
                {submitting ? 'Placing order...' : 'Place demo order'}
                <IconArrowRight className="button__icon" />
              </button>
            )}
          </form>

          <aside className="summary-card summary-card--sticky">
            <h3>Payment summary</h3>
            <div className="summary-card__row">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div className="summary-card__row">
              <span>Discount</span>
              <strong>- {formatCurrency(discount)}</strong>
            </div>
            <div className="summary-card__row">
              <span>Shipping</span>
              <strong>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</strong>
            </div>
            <div className="summary-card__row">
              <span>Tax</span>
              <strong>{formatCurrency(tax)}</strong>
            </div>
            <div className="summary-card__total">
              <span>Total due</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
