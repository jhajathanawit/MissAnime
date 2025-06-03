import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import FavoriteHeartButton from "./favorite/favoriteHeartButton";
import { getUserFavorites } from "./favorite/addFavorite";
import { useUser } from "../contexts/UserContext";
const Airing = () => {
    const [animeList, setAnimeList] = useState([]);
    const [visibleRows, setVisibleRows] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        const fetchAnimeData = async () => {
            const response = await fetch("https://api.jikan.moe/v4/anime?status=airing");
            const data = await response.json();
            if (data && data.data && data.data.length > 0) {
                const top10Anime = data.data.slice(0, 14);
                setAnimeList(top10Anime.map((anime) => ({
                    mal_id: anime.mal_id,
                    title: anime.title,
                    image_url: anime.images.jpg.image_url,
                    url: anime.url,
                    rank: anime.rank,
                    score: anime.score,
                    rating: anime.rating,
                    type: anime.type,
                })));
            }
        };
        fetchAnimeData();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token && user) {
            getUserFavorites(user, token).then(res => {
                setFavorites(res.data?.map((a) => a.mal_id) || []);
            });
        }
    }, [user]);
    const handleShowMore = () => {
        setVisibleRows(animeList.length);
    };
    const visibleAnimeList = animeList.slice(0, visibleRows *
        (window.innerWidth < 640
            ? 2
            : window.innerWidth < 768
                ? 3
                : window.innerWidth < 1024
                    ? 4
                    : window.innerWidth < 1280
                        ? 6
                        : 8));
    // ฟังก์ชันแปลง rating เป็นตัวย่อ
    function getRatingShort(rating) {
        if (!rating)
            return "";
        // ตัด string หลังตัวอักษร/ตัวเลข/เครื่องหมาย + ตัวแรกที่ไม่ใช่ (เช่น "PG-13" => "PG", "R+ (Violence)" => "R+")
        const match = rating.match(/^[A-Z0-9\+]+/i);
        return match ? match[0] : "";
    }
    // ฟังก์ชันแสดง badge พร้อมสี
    function getRatingBadge(rating) {
        const short = getRatingShort(rating);
        if (!short)
            return null;
        let color = "bg-gray-400";
        if (short === "G")
            color = "bg-green-500";
        else if (short === "PG")
            color = "bg-blue-400";
        else if (short === "PG13")
            color = "bg-yellow-400";
        else if (short === "R17")
            color = "bg-orange-500";
        else if (short === "R+")
            color = "bg-red-500";
        else if (short === "RX")
            color = "bg-pink-600";
        return (_jsx("span", { className: `text-xs px-2 py-1 rounded-full text-white font-bold ${color}`, children: short }));
    }
    // ฟังก์ชันกำหนดสี type
    function getTypeBadge(type) {
        if (!type)
            return null;
        let color = "bg-gray-400";
        if (type === "TV")
            color = "bg-blue-500";
        else if (type === "Movie")
            color = "bg-purple-500";
        else if (type === "OVA")
            color = "bg-pink-500";
        else if (type === "ONA")
            color = "bg-green-500";
        else if (type === "Special")
            color = "bg-yellow-500";
        else if (type === "Music")
            color = "bg-indigo-500";
        return (_jsx("span", { className: `text-xs px-2 py-1 rounded-full text-white font-bold ${color}`, children: type }));
    }
    return (_jsxs("div", { children: [_jsx("ul", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 items-center justify-center gap-2", children: visibleAnimeList.map((anime) => (_jsx(Link, { to: `/packages/${anime.mal_id}`, className: "object-cover m-2", children: _jsxs("div", { className: "p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-300 h-full relative", children: [_jsxs("div", { className: "p-3 items-center absolute top-0 left-0 right-0 flex justify-evenly gap-4 mx-auto z-10", children: [_jsx("span", { className: "scale-125", children: getRatingBadge(anime.rating) }), _jsx("span", { className: "scale-125", children: getTypeBadge(anime.type) }), _jsx(FavoriteHeartButton, { animeId: anime.mal_id, userId: user, isFavorite: favorites.includes(anime.mal_id), onChange: fav => setFavorites(prev => fav ? [...prev, anime.mal_id] : prev.filter(id => id !== anime.mal_id)) })] }), _jsxs("div", { className: "grid grid-cols-1 w-40 gap-2", children: [_jsx("div", { className: "mb-2 flex justify-center object-cover", children: _jsx("img", { src: anime.image_url, alt: anime.title, className: "w-40 h-48 object-cover" }) }), _jsxs("div", { className: "flex flex-cols justify-between", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(FaRankingStar, { className: "text-pink-500 text-sm" }), _jsx("p", { className: "text-sm text-pink-500", children: anime.rank })] }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(IoStar, { className: "text-amber-300 text-sm" }), _jsx("p", { className: "text-sm text-pink-100", children: anime.score })] })] }), _jsx("p", { className: "text-sm text-pink-100 not-hover:w-32 not-hover:overflow-hidden not-hover:whitespace-nowrap not-hover:text-ellipsis ", children: anime.title })] })] }) }, anime.mal_id))) }), _jsx("div", { className: "flex justify-center", children: visibleRows *
                    (window.innerWidth < 640
                        ? 2
                        : window.innerWidth < 768
                            ? 3
                            : window.innerWidth < 1024
                                ? 4
                                : window.innerWidth < 1280
                                    ? 6
                                    : 8) <
                    animeList.length && (_jsx("button", { onClick: handleShowMore, className: "mt-4 bg-pink-500 hover:bg-pink-300 text-white hover:text-[#0f151f] font-bold py-2 px-4 rounded", children: "Show More" })) })] }));
};
export default Airing;
