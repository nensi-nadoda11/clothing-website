import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

function loadStored(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function persistSession(token, user) {
  window.localStorage.setItem('maison-aura-token', JSON.stringify(token));
  window.localStorage.setItem('maison-aura-user', JSON.stringify(user));
}

function clearSession() {
  window.localStorage.removeItem('maison-aura-token');
  window.localStorage.removeItem('maison-aura-user');
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => loadStored('maison-aura-token', ''));
  const [user, setUser] = useState(() => loadStored('maison-aura-user', null));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let alive = true;

    api
      .getMe(token)
      .then((data) => {
        if (!alive) {
          return;
        }

        setUser(data.user);
        persistSession(token, data.user);
      })
      .catch(() => {
        if (!alive) {
          return;
        }

        setToken('');
        setUser(null);
        clearSession();
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [token]);

  useEffect(() => {
    if (token && user) {
      persistSession(token, user);
    }
  }, [token, user]);

  const value = useMemo(() => {
    const storeSession = (sessionToken, sessionUser) => {
      setToken(sessionToken);
      setUser(sessionUser);
      persistSession(sessionToken, sessionUser);
    };

    return {
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      async login(credentials) {
        const session = await api.login(credentials);
        storeSession(session.token, session.user);
        return session.user;
      },
      async register(payload) {
        const session = await api.register(payload);
        storeSession(session.token, session.user);
        return session.user;
      },
      async logout() {
        if (token) {
          try {
            await api.logout(token);
          } catch {
            // Ignore network errors during sign out and clear the local session anyway.
          }
        }

        setToken('');
        setUser(null);
        clearSession();
      }
    };
  }, [loading, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
