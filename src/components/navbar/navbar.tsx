import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { RiUserShared2Line } from "react-icons/ri";
import { useUser } from "../../contexts/UserContext";

interface User {
  user_id: number;
  username?: string;
  user_image?: string | null;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser() as { user: User | null };
  const [profile, setProfile] = useState<User | null>(null);

  const userLink = user ? `/users/${user.user_id}` : "/login";  // เปลี่ยนจาก user เป็น user.user_id

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("jwtToken");
          const res = await fetch(`https://miss-anime-api.onrender.com/api/v1/users/${user}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setProfile(data?.data?.user || null);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user]);

  let userDisplay;
  if (profile) {
    // ถ้า user_image เป็น default-profile.jpg หรือไม่มีรูป ให้แสดงตัวอักษรแรกของ username
    if (!profile.user_image || profile.user_image === "https://example.com/default-profile.jpg") {
      userDisplay = (
        <span className="w-8 h-8 rounded-full bg-pink-400 text-white text-lg font-bold flex items-center justify-center">
          {profile.username ? profile.username[0].toUpperCase() : "U"}
        </span>
      );
    } else {
      userDisplay = (
        <img
          src={profile.user_image}
          alt="profile"
          className="inline-block w-8 h-8 rounded-full object-cover border-2 border-pink-400"
        />
      );
    }
  } else {
    userDisplay = <RiUserShared2Line className="inline-block mr-1" />;
  }

  console.log('Current user:', user); // ตรวจสอบค่า user
  console.log('User link:', userLink); // ตรวจสอบค่า userLink

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
          <Link to={userLink}>  {/* เปลี่ยนจาก /login เป็น userLink */}
            {userDisplay}
          </Link>
        </li>
      </ul>

      {/* Mobile/Tablet Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          id="menu-toggle"
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
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
              {userDisplay}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;