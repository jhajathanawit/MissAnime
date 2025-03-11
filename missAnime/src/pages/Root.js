import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
export default function Root() {
    return (_jsxs("div", { className: 'container m-auto px-20 bg-[#0a0f18] ', children: [_jsx(Header, {}), _jsx("div", { className: 'font-sans', children: _jsx(Outlet, {}) })] }));
}
