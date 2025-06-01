import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
export default function RandomAnime() {
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchRandomAnime = async () => {
        setLoading(true);
        const result = await fetch('https://api.jikan.moe/v4/random/anime');
        const data = await result.json();
        setAnime(data.data);
        setLoading(false);
    };
    useEffect(() => {
        fetchRandomAnime();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx(SyncLoader, { color: "pink" }) }));
    }
    return (_jsxs("div", { className: "relative p-4 w-full rounded-[10px]", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 rounded-[10px]", style: { backgroundImage: `url(${anime?.images.webp.large_image_url})` } }), _jsxs("div", { className: "relative grid md:grid-cols-2 justify-center items-center  gap-4", children: [_jsx(Link, { to: `/packages/${anime?.mal_id}`, className: "object-cover m-4 flex justify-center", children: _jsx("div", { className: "w-80 h-108 rounded-[10px] justify-center items-center overflow-hidden", children: _jsx("img", { className: "w-full h-full object-contain", src: anime?.images.webp.large_image_url, alt: anime?.title }) }) }, anime?.mal_id), _jsxs("div", { className: "flex flex-col gap-2 text-pink-100 text-2xl font-bold bg-[#181f2c50] w-[20rem] p-4 rounded-[10px]", children: [_jsx("h2", { children: anime?.title }), _jsxs("p", { children: ["Rank: ", anime?.rank] }), _jsxs("p", { children: ["Score: ", anime?.score] }), _jsxs("div", { className: 'flex gap-4 justify-center', children: [_jsx("button", { className: "bg-pink-500 rounded-[10px] p-1 hover:text-[#0f151f] hover:bg-pink-300", onClick: fetchRandomAnime, children: "Random" }), _jsx(Link, { to: `/packages/${anime?.mal_id}`, className: "object-cover", children: _jsx("button", { className: "bg-pink-500 rounded-[10px] p-1 hover:text-[#0f151f] hover:bg-pink-300", children: "Detail" }) }, anime?.mal_id)] })] })] })] }));
}
