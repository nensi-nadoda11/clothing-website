import { Link } from 'react-router-dom';

export function EmptyState({ title, description, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {actionLabel && actionTo ? (
        <Link className="button button--primary" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
