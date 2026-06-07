import { useState } from 'react';
import { api } from '../lib/api';
import { SectionHeading } from '../components/SectionHeading';
import { contactDetails } from '../data/siteContent';
import { IconClock, IconMail, IconMapPin, IconPhone, IconCheck } from '../components/Icons';

const initialState = {
  name: '',
  email: '',
  message: ''
};

export function ContactPage() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.submitContact(form);
      setSuccess(response.message);
      setForm(initialState);
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
          eyebrow="Contact"
          title="Let the client see that the store has a real business presence."
        />

        <div className="split-layout">
          <div className="contact-panel">
            <div className="contact-panel__item">
              <IconMail />
              <div>
                <strong>Email</strong>
                <p>{contactDetails.email}</p>
              </div>
            </div>
            <div className="contact-panel__item">
              <IconPhone />
              <div>
                <strong>Phone</strong>
                <p>{contactDetails.phone}</p>
              </div>
            </div>
            <div className="contact-panel__item">
              <IconMapPin />
              <div>
                <strong>Location</strong>
                <p>{contactDetails.location}</p>
              </div>
            </div>
            <div className="contact-panel__item">
              <IconClock />
              <div>
                <strong>Hours</strong>
                <p>{contactDetails.hours}</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field__label">Name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="field">
              <span className="field__label">Message</span>
              <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
            </label>
            {error ? <div className="alert alert--error">{error}</div> : null}
            {success ? (
              <div className="alert alert--success">
                <IconCheck className="inline-icon" />
                {success}
              </div>
            ) : null}
            <button className="button button--primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send enquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
