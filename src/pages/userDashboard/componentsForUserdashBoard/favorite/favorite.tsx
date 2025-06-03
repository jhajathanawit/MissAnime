import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

interface JikanAnime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score?: number;
  type?: string;
  rating?: string;
}

export default function Favorite() {
  const [animeList, setAnimeList] = useState<JikanAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        // ดึง user_id จาก localStorage
        const storedUser = localStorage.getItem("currentUser");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);
        const token = localStorage.getItem("jwtToken");
        if (!user?.user_id || !token) return;

        // ดึง external_anime_id ทั้งหมด
        const res = await fetch(`${API_BASE}/my-anime/user/${user.user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const favArr: string[] = Array.isArray(data?.data?.userAnimeList)
          ? data.data.userAnimeList.map((a: any) => a.external_anime_id)
          : [];

        // ดึงข้อมูล Jikan ทีละ batch (3 เรื่องต่อ 1.1 วิ)
        const batchSize = 3;
        let allAnime: JikanAnime[] = [];
        for (let i = 0; i < favArr.length; i += batchSize) {
          const batch = favArr.slice(i, i + batchSize);
          const results = await Promise.all(
            batch.map(async (id) => {
              try {
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const jikan = await res.json();
                return jikan.data;
              } catch {
                return null;
              }
            })
          );
          allAnime = allAnime.concat(results.filter(Boolean) as JikanAnime[]);
          if (i + batchSize < favArr.length) {
            await new Promise((r) => setTimeout(r, 1100));
          }
        }
        setAnimeList(allAnime);
      } catch (e) {
        setAnimeList([]);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="text-center text-white">Loading...</div>;

  if (animeList.length === 0)
    return <div className="text-center text-white">No favorite anime found.</div>;
  return (
    <div className="bg-black p-4 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {animeList.map((anime) => (
        <Link
          to={`/packages/${anime.mal_id}`}
          key={anime.mal_id}
          className="object-cover"
        >
          <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-32 h-44 object-cover rounded"
            />
            <div className="mt-2 text-white text-center">
              <div className="font-bold">{anime.title}</div>
              {anime.score && <div>⭐ {anime.score}</div>}
              {anime.type && <div className="text-xs">{anime.type}</div>}
              {anime.rating && <div className="text-xs">{anime.rating}</div>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 
