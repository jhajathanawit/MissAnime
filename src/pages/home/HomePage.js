import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useLoaderData } from "react-router-dom";
import AnimeList from "../../components/Top";
import Airing from "../../components/airing";
import RandomAnime from "../../components/random";
import SwiperComponent from "../../components/SwiperComponent";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
export default function HomePage() {
    const { featurepackage } = useLoaderData();
    console.log(featurepackage);
    const [loading, setLoading] = useState(true);
    const [showAnimeList, setShowAnimeList] = useState(false);
    const [showAiring, setShowAiring] = useState(false);
    const [showRandomAnime, setShowRandomAnime] = useState(false);
    useEffect(() => {
        const animeListTimeout = setTimeout(() => {
            setShowAnimeList(true);
        }, 500);
        const airingTimeout = setTimeout(() => {
            setShowAiring(true);
        }, 1000);
        const randomAnimeTimeout = setTimeout(() => {
            setShowRandomAnime(true);
        }, 1500);
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            clearTimeout(animeListTimeout);
            clearTimeout(airingTimeout);
            clearTimeout(randomAnimeTimeout);
            clearTimeout(loadingTimeout);
        };
    }, []);
    return (_jsx("div", { className: "pt-10 pb-10", children: loading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx(SyncLoader, { color: "pink" }) })) : (_jsxs(_Fragment, { children: [_jsx(SwiperComponent, {}), _jsxs("div", { className: "mt-10", children: [_jsx("h1", { className: "text-2xl font-bold my-6 text-white", children: "Top Ranking" }), showAnimeList && _jsx(AnimeList, {})] }), _jsxs("div", { className: "mt-10", children: [_jsx("h1", { className: "text-2xl font-bold my-6 text-white", children: "Recommendation" }), showAiring && _jsx(Airing, {})] }), _jsx("h1", { className: "text-2xl font-bold my-6 text-white", children: "Random" }), showRandomAnime && _jsx(RandomAnime, {})] })) }));
}
