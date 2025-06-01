import { useState } from 'react';
import { Link } from "react-router-dom";
import { RiUserShared2Line } from "react-icons/ri";
import { useUser } from "../../contexts/UserContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); // ดึง user จาก context

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ถ้า user ยังไม่ login ให้ไปหน้า login แทน
  const userLink =
    user && typeof user === 'object'
      ? `/users/${(user as any).id || (user as any).user_id}`
      : "/login";

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
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to={userLink}>
            <RiUserShared2Line className="inline-block mr-1" />
          </Link>
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
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to={userLink} onClick={() => setMenuOpen(false)}>
              <RiUserShared2Line className="inline-block mr-1" />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;