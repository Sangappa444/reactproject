// ==========================================
// Loader Component
// ==========================================
// Shows a loading spinner or skeleton cards while data fetches.
// Demonstrates: props for customization, conditional rendering

import { Loader2 } from 'lucide-react';
import styles from './Loader.module.css';

export default function Loader({ text = 'Loading...', count = 0 }) {
  // If count > 0, show skeleton cards (placeholder shapes)
  if (count > 0) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonPoster} />
            <div className={styles.skeletonInfo}>
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLine} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: show spinner
  return (
    <div className={styles.loaderWrapper}>
      <Loader2 className={styles.spinnerIcon} size={48} />
      <p className={styles.loaderText}>{text}</p>
    </div>
  );
}
