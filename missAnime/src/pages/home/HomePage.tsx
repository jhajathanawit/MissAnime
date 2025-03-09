import { useLoaderData } from "react-router-dom"
import type { HomeLoaderResult } from "./homeLoader"
import AnimeList from "../../components/Top";
import Recommendation from "../../components/recommend";
import RandomAnime from "../../components/random"; 
import SwiperComponent from "../../components/SwiperComponent";  

export default function HomePage() {
    const {featurepackage} = useLoaderData() as HomeLoaderResult;
    console.log(featurepackage);
    return (
        <div className="pt-10 pb-10">
            <SwiperComponent/>
            <h1 className="text-2xl font-bold my-6 text-white">Top Ranking</h1>
            <AnimeList/>
            <h1 className="text-2xl font-bold my-6 text-white">Recommendation</h1>
            <Recommendation/>
            <h1 className="text-2xl font-bold my-6 text-white">Random</h1>
            <RandomAnime/>
        </div>
      
    )
}