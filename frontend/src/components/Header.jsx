import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navItems, brand } from '../data/siteContent';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { IconBag, IconHeart, IconLogIn, IconLogOut, IconMenu, IconSearch, IconUser, IconX } from './Icons';

export function Header() {
  const { cartCount, wishlistCount } = useStore();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-brand" to="/">
          <span className="site-brand__mark">MA</span>
          <span>
            <strong>{brand.name}</strong>
          </span>
        </Link>

        <form className="header-search" onSubmit={handleSearch} role="search">
          <IconSearch className="header-search__icon" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search products"
          />
        </form>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-actions">
          {isAuthenticated ? (
            <Link className="auth-chip auth-chip--active" to="/account">
              <IconUser className="auth-chip__icon" />
              <span>{user?.name || 'Account'}</span>
            </Link>
          ) : (
            <>
              <Link className="auth-chip" to="/login">
                <IconLogIn className="auth-chip__icon" />
                <span>Login</span>
              </Link>
              <Link className="auth-chip auth-chip--ghost" to="/register">
                <IconUser className="auth-chip__icon" />
                <span>Register</span>
              </Link>
            </>
          )}
          <Link className="icon-button" to="/wishlist" aria-label="Wishlist">
            <IconHeart className="icon-button__icon" />
            {wishlistCount ? <span className="icon-button__count">{wishlistCount}</span> : null}
          </Link>
          <Link className="icon-button" to="/cart" aria-label="Cart">
            <IconBag className="icon-button__icon" />
            {cartCount ? <span className="icon-button__count">{cartCount}</span> : null}
          </Link>
          {isAuthenticated ? (
            <button className="auth-chip auth-chip--ghost auth-chip--button" type="button" onClick={logout}>
              <IconLogOut className="auth-chip__icon" />
              <span>Logout</span>
            </button>
          ) : null}
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <IconX className="menu-toggle__icon" /> : <IconMenu className="menu-toggle__icon" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-menu">
          <form className="header-search header-search--mobile" onSubmit={handleSearch} role="search">
            <IconSearch className="header-search__icon" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search products"
            />
          </form>
          <nav className="site-nav site-nav--mobile" aria-label="Mobile primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link nav-link--mobile ${isActive ? 'nav-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mobile-auth-row">
              {isAuthenticated ? (
                <>
                  <Link className="button button--ghost button--small" to="/account" onClick={() => setMenuOpen(false)}>
                    <IconUser className="button__icon" />
                    {user?.name || 'Account'}
                  </Link>
                  <button
                    className="button button--primary button--small"
                    type="button"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    <IconLogOut className="button__icon" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="button button--ghost button--small" to="/login" onClick={() => setMenuOpen(false)}>
                    <IconLogIn className="button__icon" />
                    Login
                  </Link>
                  <Link className="button button--primary button--small" to="/register" onClick={() => setMenuOpen(false)}>
                    <IconUser className="button__icon" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
