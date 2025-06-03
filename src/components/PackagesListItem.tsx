import type { PackagesSummary } from "../api/types/packagesSummary";
import { Link } from "react-router-dom";
import { getRatingBadge, getTypeBadge } from "./utils/animeBadge";
import React, { useEffect, useState } from "react";
import FavoriteHeartButton from "./favorite/favoriteHeartButton";
import { getUserFavorites } from "./favorite/addFavorite";
import { useUser } from "../contexts/UserContext";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

interface PackagesListItemProps {
  pack: PackagesSummary;
}

export default function PackagesListItem({ pack }: PackagesListItemProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && user) {
      getUserFavorites(user, token).then((res) => {
        // ใช้ userAnimeList และ external_anime_id
        const favArr = Array.isArray(res.data?.userAnimeList) ? res.data.userAnimeList : [];
        setFavorites(favArr.map((a: any) => a.external_anime_id));
      });
    }
  }, [user]);

  const handleFavoriteChange = (fav: boolean) => {
    setFavorites((prev) =>
      fav ? [...prev, String(pack.mal_id)] : prev.filter((id) => id !== String(pack.mal_id))
    );
  };

  return (
    <Link to={`/packages/${pack.mal_id}`} className="object-cover m-4">
      <div className="p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-800 h-full relative">
        <div className="p-3 items-center absolute top-0 left-0 right-0 flex justify-evenly gap-4 mx-auto z-10">
          <span className="scale-125">{getRatingBadge(pack.rating)}</span>
          <span className="scale-125">{getTypeBadge(pack.type)}</span>
          {user !== null && (
            <FavoriteHeartButton
              animeId={pack.mal_id}
              userId={user}
              isFavorite={favorites.includes(String(pack.mal_id))}
              onChange={handleFavoriteChange}
            />
          )}
        </div>
        <div className="grid grid-cols-1 w-40 gap-2">
          <div className="mb-2 flex justify-center object-cover">
            <img
              src={pack.images.webp.image_url}
              alt={pack.title}
              className="w-40 h-48 object-cover"
            />
          </div>
          <div className="flex flex-cols justify-between">
            <div className="flex items-center justify-center gap-1">
              <FaRankingStar className="text-pink-500 text-sm" />
              <p className="text-sm text-pink-500">{pack.rank}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IoStar className="text-amber-300 text-sm" />
              <p className="text-sm text-pink-100">{pack.score}</p>
            </div>
          </div>
          <p className="text-sm text-pink-100 not-hover:w-32 not-hover:overflow-hidden not-hover:whitespace-nowrap not-hover:text-ellipsis">
            {pack.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
