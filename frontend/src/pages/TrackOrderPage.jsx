import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { SectionHeading } from '../components/SectionHeading';
import { IconArrowRight, IconCheck, IconTruck } from '../components/Icons';

export function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || 'MA-123456');
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialOrderId = searchParams.get('orderId');

    if (!initialOrderId) {
      return;
    }

    let alive = true;
    setLoading(true);
    setError('');

    api
      .trackOrder(initialOrderId)
      .then((response) => {
        if (alive) {
          setTracking(response);
        }
      })
      .catch((trackError) => {
        if (alive) {
          setError(trackError.message);
          setTracking(null);
        }
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.trackOrder(orderId);
      setTracking(response);
    } catch (trackError) {
      setTracking(null);
      setError(trackError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Track Order"
          title="A demo tracking screen makes post-purchase feel complete."
        />

        <div className="tracking-layout">
          <form className="tracking-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field__label">Order ID</span>
              <input
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
                placeholder="MA-123456"
                required
              />
            </label>
            {error ? <div className="alert alert--error">{error}</div> : null}
            <button className="button button--primary" type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Track order'}
              <IconArrowRight className="button__icon" />
            </button>
            <p className="tracking-form__hint">Use any demo ID in the format MA-123456.</p>
          </form>

          <aside className="tracking-card">
            {tracking ? (
              <>
                <div className="tracking-card__header">
                  <IconTruck className="tracking-card__icon" />
                  <div>
                    <span>{tracking.orderId}</span>
                    <h3>{tracking.status}</h3>
                    <p>Estimated delivery: {tracking.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="tracking-steps">
                  {tracking.steps.map((step) => (
                    <div className={`tracking-step tracking-step--${step.state}`} key={step.label}>
                      <span className="tracking-step__dot">
                        {step.state === 'complete' ? <IconCheck /> : null}
                      </span>
                      <div>
                        <strong>{step.label}</strong>
                        <p>{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="tracking-empty">
                <IconTruck className="tracking-card__icon" />
                <h3>Check any demo order.</h3>
                <p>Tracking shows confirmation, quality check, packing, delivery, and support states.</p>
                <Link className="button button--ghost" to="/shop">
                  Browse products
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
