import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Related from "./related/related";
import AnimeReview from "./animeReview/animeReview";
export default function DetailsPage() {
    const { details } = useLoaderData();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [details]);
    return (_jsxs("div", { className: "flex flex-col w-full mt-4 bg-gray-900 min-h-screen", children: [_jsx("div", { className: "text-pink-100 text-4xl font-bold p-4", children: _jsxs("p", { children: [details.data.title, " - ", details.data.year] }) }), loading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx(SyncLoader, { color: "pink" }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex flex-col w-full mt-4", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-0 justify-items-center ", children: [_jsxs("div", { className: "w-full grid-rows-2 lg:grid-rows-1 gap-0 justify-items-center", children: [_jsx("img", { className: "w-96 h-128 object-fit", src: details.data.images.webp.image_url, alt: details.data.title }), _jsxs("div", { className: "grid grid-cols-2 gap-1 text-xl py-2", children: [_jsxs("p", { className: "text-white py-2", children: [_jsxs("span", { className: "text-xl font-bold text-pink-500", children: ["Type:", " "] }), details.data.type] }), _jsxs("p", { className: "text-white py-2", children: [_jsxs("span", { className: "text-xl font-bold text-pink-500", children: ["Episodes:", " "] }), details.data.episodes] }), _jsxs("p", { className: "text-white py-2", children: [_jsxs("span", { className: "text-xl font-bold text-pink-500", children: ["Score:", " "] }), details.data.score] }), _jsxs("p", { className: "text-white py-2", children: [_jsxs("span", { className: "text-xl font-bold text-pink-500", children: ["Rank:", " "] }), details.data.rank] }), _jsx("div", { className: "col-span-2", children: _jsxs("p", { className: "text-white py-2", children: [_jsxs("span", { className: "text-xl font-bold text-pink-500", children: ["Status:", " "] }), details.data.status] }) })] })] }), _jsxs("div", { className: "px-4", children: [_jsx("iframe", { className: "aspect-video w-full h-96", src: details.data.trailer.embed_url }), _jsxs("p", { className: "text-white py-5", children: [_jsxs("span", { className: "text-xl font-bold text-pink-500", children: ["Synosis:", " "] }), details.data.synopsis] })] })] }) }), _jsx("div", { className: "w-full mb-4", children: _jsx(AnimeReview, { mal_id: details.data.mal_id }, details.data.mal_id) }), _jsxs("div", { className: "flex flex-col w-full mb-4", children: [_jsx("h3", { className: "text-pink-100 text-2xl font-bold p-4", children: "Related Anime" }), _jsx(Related, { type: details.data.type }, details.data.mal_id)] })] }))] }));
}
