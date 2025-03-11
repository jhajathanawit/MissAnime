import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
const Related = ({ type }) => {
    const [animeList, setAnimeList] = useState([]);
    const [visibleRows, setVisibleRows] = useState(1);
    useEffect(() => {
        const fetchAnimeData = async () => {
            const response = await fetch(`https://api.jikan.moe/v4/anime?type=${type}`);
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
                })));
            }
        };
        fetchAnimeData();
    }, [type]);
    const handleShowMore = () => {
        setVisibleRows(animeList.length);
    };
    const visibleAnimeList = animeList.slice(0, visibleRows *
        (window.innerWidth < 640
            ? 1
            : window.innerWidth < 768
                ? 2
                : window.innerWidth < 1024
                    ? 3
                    : window.innerWidth < 1280
                        ? 4
                        : 7));
    return (_jsxs("div", { children: [_jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4", children: visibleAnimeList.map((anime) => (_jsx(Link, { to: `/packages/${anime.mal_id}`, className: "object-cover m-4", children: _jsx("div", { className: "p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-300 h-full", children: _jsxs("div", { className: "grid grid-cols-1 w-40 gap-2", children: [_jsx("div", { className: "mb-2 flex justify-center object-cover", children: _jsx("img", { src: anime.image_url, alt: anime.title, className: "w-40 h-48 object-cover" }) }), _jsxs("div", { className: "flex flex-cols justify-between", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(FaRankingStar, { className: "text-pink-500 text-sm" }), _jsx("p", { className: "text-sm text-pink-500", children: anime.rank })] }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(IoStar, { className: "text-amber-300 text-sm" }), _jsx("p", { className: "text-sm text-pink-100", children: anime.score })] })] }), _jsx("p", { className: "text-sm text-pink-100 not-hover:w-32 not-hover:overflow-hidden not-hover:whitespace-nowrap not-hover:text-ellipsis ", children: anime.title })] }) }) }, anime.mal_id))) }), _jsx("div", { className: "flex justify-center", children: visibleRows *
                    (window.innerWidth < 640
                        ? 1
                        : window.innerWidth < 768
                            ? 2
                            : window.innerWidth < 1024
                                ? 3
                                : window.innerWidth < 1280
                                    ? 4
                                    : 5) <
                    animeList.length && (_jsx("button", { onClick: handleShowMore, className: "mt-4 bg-pink-500 hover:bg-pink-300 text-white hover:text-[#0f151f] font-bold py-2 px-4 rounded", children: "Show More" })) })] }));
};
export default Related;
