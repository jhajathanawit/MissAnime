import { useLoaderData } from "react-router-dom";
import type { HomeLoaderResult } from "./homeLoader";
import AnimeList from "../../components/Top";
import Airing from "../../components/airing";
import RandomAnime from "../../components/random";
import SwiperComponent from "../../components/SwiperComponent";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function HomePage() {
    const { featurepackage } = useLoaderData() as HomeLoaderResult;
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

    return (
        <div className="pt-10 pb-10">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <SyncLoader color="pink" />
                </div>
            ) : (
                <>
                    <SwiperComponent />
                    <h1 className="text-2xl font-bold my-6 text-white">Top Ranking</h1>
                    {showAnimeList && <AnimeList />}
                    <h1 className="text-2xl font-bold my-6 text-white">Recommendation</h1>
                    {showAiring && <Airing />}
                    <h1 className="text-2xl font-bold my-6 text-white">Random</h1>
                    {showRandomAnime && <RandomAnime />}
                </>
            )}
        </div>
    );
}