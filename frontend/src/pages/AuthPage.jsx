import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowRight } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export function AuthPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const { login, register, user, loading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/account', { replace: true });
    }
  }, [loading, navigate, user]);

  const isRegister = mode === 'register';
  const title = isRegister ? 'Create your Maison Aura account' : 'Sign in to your Maison Aura account';
  const eyebrow = isRegister ? 'Register' : 'Login';
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isRegister && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = isRegister
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      await (isRegister ? register(payload) : login(payload));
      setForm(initialForm);
      navigate('/account', { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="auth-shell auth-shell--single">
          <section className="auth-card">
            <div className="auth-card__header">
              <p className="eyebrow">{eyebrow}</p>
              <h2>{isRegister ? 'Create account' : 'Welcome back'}</h2>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister ? (
                <label className="field">
                  <span className="field__label">Full name</span>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </label>
              ) : null}

              <label className="field">
                <span className="field__label">Email</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </label>

              <label className="field">
                <span className="field__label">Password</span>
                <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
              </label>

              {isRegister ? (
                <label className="field">
                  <span className="field__label">Confirm password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </label>
              ) : null}

              {error ? <div className="alert alert--error">{error}</div> : null}

              <button className="button button--primary button--full" type="submit" disabled={submitting}>
                {submitting ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
                <IconArrowRight className="button__icon" />
              </button>
            </form>

            <div className="auth-card__footer auth-card__footer--center">
              <Link to={isRegister ? '/login' : '/register'}>
                {isRegister ? 'Sign in' : 'Create one'}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
