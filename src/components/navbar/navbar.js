import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from "react-router-dom";
function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (_jsxs("div", { className: 'text-white text-xl', children: [_jsxs("div", { className: 'text-white text-xl', children: [_jsx("div", { className: 'md:hidden', children: _jsx("button", { id: 'menu-toggle', className: 'text-white', onClick: toggleMenu, children: _jsx("svg", { className: 'w-6 h-6', fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16m-7 6h7" }) }) }) }), _jsxs("ul", { className: "hidden md:flex gap-4", children: [_jsx("li", { children: _jsx("a", { target: '_blank', href: "https://jikan.moe/", children: "Jikan.API" }) }), _jsx("li", { children: _jsx("a", { target: '_blank', href: "https://github.com/jhajathanawit/MissAnime", children: "GitHub" }) }), _jsx("li", { children: _jsx(Link, { to: "/contact", children: "Contact" }) })] })] }), menuOpen ? (_jsxs("ul", { className: "flex-col md:hidden gap-4", children: [_jsx("li", { children: _jsx("a", { target: '_blank', href: "https://jikan.moe/", children: "JikanAPI" }) }), _jsx("li", { children: _jsx("a", { target: '_blank', href: "https://github.com/jhajathanawit/MissAnime", children: "GitHub" }) }), _jsx("li", { children: _jsx(Link, { to: "/contact", children: "Contact" }) })] })) : null] }));
}
export default Navbar;
