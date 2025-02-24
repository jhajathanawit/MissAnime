import  { useEffect, useState } from 'react';

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
    console.log(anime, 'random anime');

    const fetchRandomAnime = async (): Promise<void> => {
        const result = await fetch('https://api.jikan.moe/v4/random/anime');
        const data = await result.json();
        setAnime(data.data);
    };

    useEffect(() => {
        fetchRandomAnime();
    }, []);

    if (!anime) {
        return <div>Loading...</div>;
    }

    return (
        <div key={anime.mal_id} className='flex items-center gap-4'>
            <div className='w-80 h-108'>
                <img className='rounded-[10px] w-full h-full object-contain' src={anime.images.webp.large_image_url} alt={anime.title} />
            </div>
            <div className='flex flex-col gap-2 text-pink-100'>
                <h2>{anime.title}</h2>
                <p>Rank: {anime.rank}</p>
                <p>Score: {anime.score}</p>
            <button className='bg-pink-500' onClick={fetchRandomAnime}>Random</button>
            </div>
        </div>
    );
}