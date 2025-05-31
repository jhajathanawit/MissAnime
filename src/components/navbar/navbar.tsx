import { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="relative">
      {/* Desktop Navbar */}
      <ul className="hidden md:flex gap-6 text-white text-lg font-semibold">
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://jikan.moe/">Jikan.API</a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/jhajathanawit/MissAnime">GitHub</a>
        </li>
        <li>
          <Link to="/MissAnime/contact">Contact</Link>
        </li>
      </ul>

      {/* Mobile/Tablet Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          id="menu-toggle"
          className="text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      {menuOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-[#1f2937] rounded-lg shadow-lg flex flex-col gap-4 p-4 z-50 md:hidden text-white text-lg font-semibold">
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://jikan.moe/">Jikan.API</a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jhajathanawit/MissAnime">GitHub</a>
          </li>
          <li>
            <Link to="/MissAnime/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;