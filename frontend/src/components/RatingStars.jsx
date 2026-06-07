import { IconStar } from './Icons';

export function RatingStars({ rating = 0 }) {
  const fullStars = Math.round(rating);

  return (
    <div className="rating-stars" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <IconStar
          key={index}
          className={index < fullStars ? 'rating-stars__icon rating-stars__icon--filled' : 'rating-stars__icon'}
        />
      ))}
    </div>
  );
}
