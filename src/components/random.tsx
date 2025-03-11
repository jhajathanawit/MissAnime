import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';

interface RandomAnime {
    mal_id: number;
    title: string;
    images: {
        webp: {
            large_image_url: string;
        };
    };
    rank?: number;
    score?: number;
}

export default function RandomAnime() {
    const [anime, setAnime] = useState<RandomAnime | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRandomAnime = async (): Promise<void> => {
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
        return (
            <div className="flex justify-center items-center h-64">
                <SyncLoader color="pink" />
            </div>
        );
    }

    return (
        <div className="relative p-4 w-full rounded-[10px]">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 rounded-[10px]"
                style={{ backgroundImage: `url(${anime?.images.webp.large_image_url})` }}
            ></div>
            <div className="relative flex justify-center items-center gap-4">
                <Link to={`/packages/${anime?.mal_id}`} key={anime?.mal_id} className="object-cover m-4">
                    <div className="w-80 h-108 rounded-[10px] overflow-hidden">
                        <img
                            className="w-full h-full object-contain"
                            src={anime?.images.webp.large_image_url}
                            alt={anime?.title}
                        />
                    </div>
                </Link>
                <div className="flex flex-col gap-2 text-pink-100 text-2xl font-bold bg-[#1f293a50] p-4 rounded-[10px]">
                    <h2>{anime?.title}</h2>
                    <p>Rank: {anime?.rank}</p>
                    <p>Score: {anime?.score}</p>
                    <div className='flex gap-4 justify-center'>
                        <button className="bg-pink-500 rounded-[10px] p-1 hover:text-[#0f151f] hover:bg-pink-300" onClick={fetchRandomAnime}>
                            Random
                        </button>
                        <Link to={`/packages/${anime?.mal_id}`} key={anime?.mal_id} className="object-cover">
                            <button className="bg-pink-500 rounded-[10px] p-1 hover:text-[#0f151f] hover:bg-pink-300">
                                Detail
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}