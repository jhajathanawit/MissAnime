import React, { useState, useEffect } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
  url: string;
  rank?: number;
  score?: number;
}

interface RelatedProps {
  type: string;
}

const Related: React.FC<RelatedProps> = ({ type }) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [visibleRows, setVisibleRows] = useState(1);

  useEffect(() => {
    const fetchAnimeData = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime?type=${type}`);
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        const top10Anime = data.data.slice(0, 14);

        setAnimeList(
          top10Anime.map((anime: any) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            image_url: anime.images.jpg.image_url,
            url: anime.url,
            rank: anime.rank,
            score: anime.score,
          }))
        );
      }
    };

    fetchAnimeData();
  }, [type]);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  const visibleAnimeList = animeList.slice(
    0,
    visibleRows *
      (window.innerWidth < 640
        ? 1
        : window.innerWidth < 768
        ? 2
        : window.innerWidth < 1024
        ? 4
        : window.innerWidth < 1280
        ? 6
        : 8)
  );

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-4">
        {visibleAnimeList.map((anime) => (
          <Link
            to={`/MissAnime/packages/${anime.mal_id}`}
            key={anime.mal_id}
            className="object-cover m-4"
          >
            <div className="p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-800 h-full">
              <div className="grid grid-cols-1 w-40 gap-2">
                <div className="mb-2 flex justify-center object-cover">
                  <img
                    src={anime.image_url}
                    alt={anime.title}
                    className="w-40 h-48 object-cover"
                  />
                </div>
                <div className="flex flex-cols justify-between">
                  <div className="flex items-center justify-center gap-1">
                    <FaRankingStar className="text-pink-500 text-sm" />
                    <p className="text-sm text-pink-500">{anime.rank}</p>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <IoStar className="text-amber-300 text-sm" />
                    <p className="text-sm text-pink-100">{anime.score}</p>
                  </div>
                </div>

                <p className="text-sm text-pink-100 not-hover:w-32 not-hover:overflow-hidden not-hover:whitespace-nowrap not-hover:text-ellipsis">
                  {anime.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
      <div className="flex justify-center">
        {visibleRows *
          (window.innerWidth < 640
            ? 1
            : window.innerWidth < 768
            ? 2
            : window.innerWidth < 1024
            ? 4
            : window.innerWidth < 1280
            ? 6
            : 8) < animeList.length && (
          <button
            onClick={handleShowMore}
            className="mt-4 bg-pink-500 hover:bg-pink-300 text-white hover:text-[#0f151f] font-bold py-2 px-4 rounded"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Related;