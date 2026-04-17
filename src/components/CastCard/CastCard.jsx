// ==========================================
// CastCard Component
// ==========================================
// Displays an actor's photo, name, and character.
// Simple presentational component — just receives props and renders.

import { getProfileUrl } from '../../services/tmdb';
import styles from './CastCard.module.css';

export default function CastCard({ actor }) {
  const photoUrl = getProfileUrl(actor.profile_path);

  return (
    <div className={styles.card}>
      <div className={styles.photoWrap}>
        {photoUrl ? (
          <img src={photoUrl} alt={actor.name} className={styles.photo} loading="lazy" />
        ) : (
          <div className={styles.noPhoto}>👤</div>
        )}
      </div>
      <p className={styles.name}>{actor.name}</p>
      <p className={styles.character}>{actor.character}</p>
    </div>
  );
}
