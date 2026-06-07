import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="empty-state">
          <h1>404</h1>
          <h3>Page not found</h3>
          <p>The page you are looking for does not exist.</p>
          <Link className="button button--primary" to="/">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
