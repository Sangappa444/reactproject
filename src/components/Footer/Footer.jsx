// ==========================================
// Footer Component
// ==========================================
// Static footer with TMDB attribution (required by their API terms).

import { Clapperboard, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="app-footer">
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <Clapperboard size={20} color="var(--accent)" /> CineVerse
        </div>
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
            TMDB <ExternalLink size={12} />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            React <ExternalLink size={12} />
          </a>
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Vite <ExternalLink size={12} />
          </a>
        </div>
        <div className={styles.tmdbCredit}>
          Powered by <span className={styles.tmdbBadge}>TMDB</span>
        </div>
      </div>
    </footer>
  );
}
