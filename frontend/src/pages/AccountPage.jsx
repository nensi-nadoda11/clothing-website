import { Link, Navigate } from 'react-router-dom';
import { IconArrowRight, IconCheck, IconShield } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export function AccountPage() {
  const { user, loading, logout, isAuthenticated } = useAuth();

  if (loading && !user) {
    return (
      <div className="section">
        <div className="container">
          <div className="empty-state">
            <h3>Loading your session...</h3>
            <p>Checking the saved login state before showing your account.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="account-shell">
          <section className="account-card">
            <p className="eyebrow">
              <IconShield className="eyebrow__icon" />
              Account
            </p>
            <h1>{user?.name || 'Your account'}</h1>
            <p className="account-card__description">
              This space is ready for order history, saved addresses, and profile settings when you decide to expand the demo.
            </p>

            <div className="account-info">
              <div>
                <span>Email</span>
                <strong>{user?.email || 'Loading...'}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>Signed in</strong>
              </div>
            </div>

            <div className="auth-hero__list auth-hero__list--compact">
              <div>
                <IconCheck className="auth-hero__icon" />
                Fast checkout with a single account session.
              </div>
              <div>
                <IconCheck className="auth-hero__icon" />
                Wishlist and cart stay connected to the same account state.
              </div>
              <div>
                <IconCheck className="auth-hero__icon" />
                Easy to swap in a real database later.
              </div>
            </div>

            <div className="account-actions">
              <Link className="button button--ghost" to="/shop">
                Continue shopping
              </Link>
              <button className="button button--primary" type="button" onClick={logout}>
                Sign out
                <IconArrowRight className="button__icon" />
              </button>
            </div>
          </section>

          <aside className="account-side">
            <div className="mini-card mini-card--accent">
              <span>Wishlist</span>
              <strong>Saved under your account session</strong>
            </div>
            <div className="mini-card">
              <span>Next step</span>
              <strong>Add order history and address book</strong>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
