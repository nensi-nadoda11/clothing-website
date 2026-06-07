import { contactDetails } from '../data/siteContent';
import { IconPhone } from './Icons';

export function QuickContact() {
  const message = encodeURIComponent(contactDetails.whatsappMessage);
  const href = `https://wa.me/${contactDetails.whatsapp}?text=${message}`;

  return (
    <a className="quick-contact" href={href} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
      <IconPhone className="quick-contact__icon" />
      <span>WhatsApp</span>
    </a>
  );
}
