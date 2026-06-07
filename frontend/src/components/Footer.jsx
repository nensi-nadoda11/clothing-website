import { Link } from 'react-router-dom';
import { contactDetails } from '../data/siteContent';
import { IconClock, IconMail, IconMapPin, IconPhone } from './Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="eyebrow">Maison Aura</p>
          <h3 className="site-footer__title">Premium fashion demo built for freelance presentations.</h3>
        </div>
        <div>
          <h4>Quick links</h4>
          <div className="site-footer__links">
            <Link to="/shop">Shop</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="site-footer__contact">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>
              <IconMail className="contact-list__icon" /> {contactDetails.email}
            </li>
            <li>
              <IconPhone className="contact-list__icon" /> {contactDetails.phone}
            </li>
            <li>
              <IconMapPin className="contact-list__icon" /> {contactDetails.location}
            </li>
            <li>
              <IconClock className="contact-list__icon" /> {contactDetails.hours}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
