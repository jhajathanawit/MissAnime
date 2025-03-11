import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import Navbar from "./navbar/navbar";
export default function Header() {
    return (_jsxs("div", { className: "flex-col border-b py-2", children: [_jsxs("div", { className: "flex justify-between items-center py-2", children: [_jsx("div", { className: "flex items-center", children: _jsxs(Link, { to: "/", className: "flex text-4xl font-bold", children: [_jsx("h1", { className: "text-pink-100", children: "MISS" }), _jsx("h1", { className: "text-pink-500", children: "ANIME" })] }) }), _jsx("div", { children: _jsx(Navbar, {}) })] }), _jsx("div", { className: "flex justify-center w-full", children: _jsx(SearchInput, {}) })] }));
}
