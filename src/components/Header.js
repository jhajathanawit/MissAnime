import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import Navbar from "./navbar/navbar";
export default function Header() {
    const location = useLocation();
    const isloginPage = location.pathname === "/MissAnime/login";
    const isContactPage = location.pathname === "/MissAnime/contact";
    return (_jsx(_Fragment, { children: !isContactPage && (_jsxs("div", { className: "flex-col border-b py-2", children: [_jsxs("div", { className: "flex justify-between items-center py-2", children: [_jsx("div", { className: "flex items-center", children: _jsxs(Link, { to: "/MissAnime/", className: "flex text-4xl font-bold", children: [_jsx("h1", { className: "text-pink-100", children: "MISS" }), _jsx("h1", { className: "text-pink-500", children: "ANIME" })] }) }), _jsx("div", { children: _jsx(Navbar, {}) })] }), !isloginPage && (_jsx("div", { className: "flex justify-center w-full", children: _jsx(SearchInput, {}) }))] })) }));
}
