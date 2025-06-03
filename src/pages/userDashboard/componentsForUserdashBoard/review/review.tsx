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

interface Review {
  review_id: number;
  external_anime_id: string;
  review_text: string;
  created_at: string;
}

interface AnimeWithReviews {
  anime: JikanAnime;
  reviews: Review[];
}

export default function Favorite() {
  const [animeList, setAnimeList] = useState<AnimeWithReviews[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState<{ [animeId: string]: boolean }>(
    {}
  );

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

        // ดึงรีวิวทั้งหมด
        const res = await fetch(`${API_BASE}/reviews/user/${user.user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const reviewsArr: Review[] = Array.isArray(data?.data?.reviews)
          ? data.data.reviews
          : [];

        // รวม external_anime_id ที่ไม่ซ้ำ
        const animeReviewMap = new Map<string, Review[]>();
        reviewsArr.forEach((review) => {
          if (!animeReviewMap.has(review.external_anime_id)) {
            animeReviewMap.set(review.external_anime_id, []);
          }
          animeReviewMap.get(review.external_anime_id)!.push(review);
        });

        // ดึงข้อมูล Jikan ทีละ batch (3 เรื่องต่อ 1.1 วิ)
        const batchSize = 3;
        const animeIds = Array.from(animeReviewMap.keys());
        let allAnime: AnimeWithReviews[] = [];
        for (let i = 0; i < animeIds.length; i += batchSize) {
          const batch = animeIds.slice(i, i + batchSize);
          const results = await Promise.all(
            batch.map(async (id) => {
              try {
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const jikan = await res.json();
                return jikan.data
                  ? { anime: jikan.data, reviews: animeReviewMap.get(id) || [] }
                  : null;
              } catch {
                return null;
              }
            })
          );
          allAnime = allAnime.concat(results.filter(Boolean) as AnimeWithReviews[]);
          if (i + batchSize < animeIds.length) {
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

  const handleToggleShowReviews = (animeId: string) => {
    setShowReviews((prev) => ({
      ...prev,
      [animeId]: !prev[animeId],
    }));
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  if (animeList.length === 0)
    return <div className="text-center text-white">No favorite anime found.</div>;

  return (
    <div className="bg-black p-4 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {animeList.map(({ anime, reviews }) => (
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
              <button
                className="mt-2 px-2 py-1 bg-pink-500 text-white rounded text-xs"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleShowReviews(anime.mal_id.toString());
                }}
              >
                {showReviews[anime.mal_id.toString()]
                  ? "Hide Reviews"
                  : "Show Reviews"}
              </button>
              {showReviews[anime.mal_id.toString()] && (
                <div className="mt-2 text-xs text-pink-200 text-left">
                  {reviews
                    .sort((a, b) => b.review_id - a.review_id)
                    .map((r) => (
                      <div
                        key={r.review_id}
                        className="mb-2 border-b border-pink-400 pb-1"
                      >
                        <div className="italic">"{r.review_text}"</div>
                        <div>
                          {new Date(r.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
