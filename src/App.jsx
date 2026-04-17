// ==========================================
// App.jsx — Root Component + React Router
// ==========================================
// This is the TOP-LEVEL component that:
// 1. Sets up React Router (BrowserRouter → Routes → Route)
// 2. Renders the Navbar (appears on all pages)
// 3. Maps URL paths to page components
//
// HOW REACT ROUTER WORKS:
// - <BrowserRouter> wraps everything, enables URL-based navigation
// - <Routes> is like a switch statement for URLs
// - <Route path="/" element={<Home />} /> means:
//   "When URL is /, render the Home component"
// - <Route path="/movie/:id" ... /> — the :id is a URL parameter
//   accessed via useParams() inside the component

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Favorites from './pages/Favorites/Favorites';
import styles from './App.module.css';

export default function App() {
  return (
    // BrowserRouter enables client-side routing
    // (no full page reloads when navigating!)
    <BrowserRouter>
      <div className={styles.app}>


        {/* Navbar is OUTSIDE Routes — it shows on ALL pages */}
        <Navbar />

        {/* Routes renders whichever page matches the current URL */}
        <main className={styles.main}>
          <Routes>
            {/* path="/" + end means EXACT match for home page */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            {/* :id is a dynamic parameter — different for each movie */}
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        {/* Footer also shows on ALL pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
