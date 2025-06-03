import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { getRatingBadge, getTypeBadge } from "./utils/animeBadge";
import { useEffect, useState } from "react";
import FavoriteHeartButton from "./favorite/favoriteHeartButton";
import { getUserFavorites } from "./favorite/addFavorite";
import { useUser } from "../contexts/UserContext";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
export default function PackagesListItem({ pack }) {
    const [favorites, setFavorites] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token && user) {
            getUserFavorites(user, token).then((res) => {
                // ใช้ userAnimeList และ external_anime_id
                const favArr = Array.isArray(res.data?.userAnimeList) ? res.data.userAnimeList : [];
                setFavorites(favArr.map((a) => a.external_anime_id));
            });
        }
    }, [user]);
    return (_jsx(Link, { to: `/packages/${pack.mal_id}`, className: "object-cover m-4", children: _jsxs("div", { className: "p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-800 h-full relative", children: [_jsxs("div", { className: "p-3 items-center absolute top-0 left-0 right-0 flex justify-evenly gap-4 mx-auto z-10", children: [_jsx("span", { className: "scale-125", children: getRatingBadge(pack.rating) }), _jsx("span", { className: "scale-125", children: getTypeBadge(pack.type) }), _jsx(FavoriteHeartButton, { animeId: pack.mal_id, userId: user, isFavorite: favorites.includes(String(pack.mal_id)), onChange: (fav) => setFavorites((prev) => fav ? [...prev, String(pack.mal_id)] : prev.filter((id) => id !== String(pack.mal_id))) })] }), _jsxs("div", { className: "grid grid-cols-1 w-40 gap-2", children: [_jsx("div", { className: "mb-2 flex justify-center object-cover", children: _jsx("img", { src: pack.images.webp.image_url, alt: pack.title, className: "w-40 h-48 object-cover" }) }), _jsxs("div", { className: "flex flex-cols justify-between", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(FaRankingStar, { className: "text-pink-500 text-sm" }), _jsx("p", { className: "text-sm text-pink-500", children: pack.rank })] }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(IoStar, { className: "text-amber-300 text-sm" }), _jsx("p", { className: "text-sm text-pink-100", children: pack.score })] })] }), _jsx("p", { className: "text-sm text-pink-100 not-hover:w-32 not-hover:overflow-hidden not-hover:whitespace-nowrap not-hover:text-ellipsis", children: pack.title })] })] }) }));
}
