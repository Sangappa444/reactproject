// ==========================================
// Footer Component
// ==========================================
// Static footer with TMDB attribution (required by their API terms).

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="app-footer">
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>🎬 CineVerse</div>
        <p className={styles.footerText}>
          Discover movies, save your favorites, and explore the world of cinema.
          Built with React + TMDB API.
        </p>
        <div className={styles.footerLinks}>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            TMDB
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            React
          </a>
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Vite
          </a>
        </div>
        <div className={styles.tmdbCredit}>
          Powered by <span className={styles.tmdbBadge}>TMDB</span>
        </div>
      </div>
    </footer>
  );
}
