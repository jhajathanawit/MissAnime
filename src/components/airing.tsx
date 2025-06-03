import React, { useState, useEffect } from "react";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import FavoriteHeartButton from "./favorite/favoriteHeartButton";
import { getUserFavorites } from "./favorite/addFavorite";
import { useUser } from "../contexts/UserContext";

interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
  url: string;
  rank?: number;
  score?: number;
  type?: string;
  rating?: string;
}

const Airing: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [visibleRows, setVisibleRows] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchAnimeData = async () => {
      const response = await fetch("https://api.jikan.moe/v4/anime?status=airing");
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
            rating: anime.rating,
            type: anime.type,
          }))
        );
      }
    };
    fetchAnimeData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && user) {
      getUserFavorites(user, token).then(res => {
        // ใช้ userAnimeList และ external_anime_id
        const favArr = Array.isArray(res.data?.userAnimeList) ? res.data.userAnimeList : [];
        setFavorites(favArr.map((a: any) => a.external_anime_id));
      });
    }
  }, [user]);

  const handleShowMore = () => {
    setVisibleRows(animeList.length);
  };

  const visibleAnimeList = animeList.slice(
    0,
    visibleRows *
      (window.innerWidth < 640
        ? 2
        : window.innerWidth < 768
        ? 3
        : window.innerWidth < 1024
        ? 4
        : window.innerWidth < 1280
        ? 6
        : 8)
  );

  // ฟังก์ชันแปลง rating เป็นตัวย่อ
  function getRatingShort(rating?: string) {
    if (!rating) return "";
    // ตัด string หลังตัวอักษร/ตัวเลข/เครื่องหมาย + ตัวแรกที่ไม่ใช่ (เช่น "PG-13" => "PG", "R+ (Violence)" => "R+")
    const match = rating.match(/^[A-Z0-9\+]+/i);
    return match ? match[0] : "";
  }

  // ฟังก์ชันแสดง badge พร้อมสี
  function getRatingBadge(rating?: string) {
    const short = getRatingShort(rating);
    if (!short) return null;
    let color = "bg-gray-400";
    if (short === "G") color = "bg-green-500";
    else if (short === "PG") color = "bg-blue-400";
    else if (short === "PG13") color = "bg-yellow-400";
    else if (short === "R17") color = "bg-orange-500";
    else if (short === "R+") color = "bg-red-500";
    else if (short === "RX") color = "bg-pink-600";
    return (
      <span className={`text-xs px-2 py-1 rounded-full text-white font-bold ${color}`}>
        {short}
      </span>
    );
  }

  // ฟังก์ชันกำหนดสี type
  function getTypeBadge(type?: string) {
    if (!type) return null;
    let color = "bg-gray-400";
    if (type === "TV") color = "bg-blue-500";
    else if (type === "Movie") color = "bg-purple-500";
    else if (type === "OVA") color = "bg-pink-500";
    else if (type === "ONA") color = "bg-green-500";
    else if (type === "Special") color = "bg-yellow-500";
    else if (type === "Music") color = "bg-indigo-500";
    return (
      <span className={`text-xs px-2 py-1 rounded-full text-white font-bold ${color}`}>
        {type}
      </span>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 items-center justify-center gap-2">
        {visibleAnimeList.map((anime) => (
          <Link
            to={`/packages/${anime.mal_id}`}
            key={anime.mal_id}
            className="object-cover m-2"
          >
            <div className="p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-300 h-full relative">
              <div className="p-3 items-center absolute top-0 left-0 right-0 flex justify-evenly gap-4 mx-auto z-10">
                <span className="scale-125">{getRatingBadge(anime.rating)}</span>
                <span className="scale-125">{getTypeBadge(anime.type)}</span>
                <FavoriteHeartButton
                  animeId={anime.mal_id}
                  userId={user}
                  isFavorite={favorites.includes(String(anime.mal_id))}
                  onChange={fav =>
                    setFavorites(prev =>
                      fav ? [...prev, String(anime.mal_id)] : prev.filter(id => id !== String(anime.mal_id))
                    )
                  }
                />
              </div>
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
                <p className="text-sm text-pink-100 not-hover:w-32 not-hover:overflow-hidden not-hover:whitespace-nowrap not-hover:text-ellipsis ">{anime.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
      <div className="flex justify-center">
        {visibleRows *
          (window.innerWidth < 640
            ? 2
            : window.innerWidth < 768
            ? 3
            : window.innerWidth < 1024
            ? 4
            : window.innerWidth < 1280
            ? 6
            : 8) <
          animeList.length && (
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

export default Airing;