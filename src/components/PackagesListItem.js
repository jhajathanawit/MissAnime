import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
export default function PackagesListItem({ pack }) {
    return (_jsx(Link, { to: `/MissAnime/packages/${pack.mal_id}`, className: "object-cover m-4", children: _jsx("div", { className: "p-4  flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-800 h-full", children: _jsxs("div", { className: "grid grid-cols-1 w-40 gap-2", children: [_jsx("div", { className: "mb-2 flex justify-center object-cover", children: _jsx("img", { src: pack.images.webp.image_url, alt: pack.title, className: "w-40 h-48 object-cover" }) }), _jsxs("div", { className: "flex flex-cols justify-between", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(FaRankingStar, { className: "text-pink-500 text-sm" }), _jsx("p", { className: "text-sm text-pink-500", children: pack.rank })] }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(IoStar, { className: "text-amber-300 text-sm" }), _jsx("p", { className: "text-sm text-pink-100", children: pack.score })] })] }), _jsx("p", { className: "text-sm text-pink-100", children: pack.title })] }) }) }));
}
