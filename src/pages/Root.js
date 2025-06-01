import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
const Root = () => {
    return (_jsxs("div", { className: "bg-[#0a0f18] min-h-screen py-4 px-10", children: [_jsx(Header, {}), _jsx("div", { className: 'mx-auto max-w-480', children: _jsx(Outlet, {}) })] }));
};
export default Root;
