import type { PackagesSummary } from "../api/types/packagesSummary";
import { Link, useNavigate } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { getRatingBadge, getTypeBadge } from "./utils/animeBadge";
import React, { useState } from "react";

interface PackagesListItemProps {
  pack: PackagesSummary;
}

export default function PackagesListItem({ pack }: PackagesListItemProps) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favorite_anime_ids");
    return stored ? JSON.parse(stored) : [];
  });
  const navigate = useNavigate();

  const handleToggleFavorite = (animeId: number) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/MissAnime/login');
      return;
    }
    setFavorites((prev) =>
      prev.includes(animeId)
        ? prev.filter((id) => id !== animeId)
        : [...prev, animeId]
    );
    // คุณสามารถเพิ่ม fetch ไปยัง API ได้ที่นี่ถ้าต้องการ
  };

  return (
    <Link to={`/MissAnime/packages/${pack.mal_id}`} className="object-cover m-4">
      <div className="p-4 flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-800 h-full relative">
        {/* Badge ด้านบน */}
        <div className="p-3 items-center absolute top-0 left-0 right-0 flex justify-evenly gap-4 mx-auto z-10">
          <span className="scale-125">{getRatingBadge(pack.rating)}</span>
          <span className="scale-125">{getTypeBadge(pack.type)}</span>
          <button
            type="button"
            className="focus:outline-none"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              handleToggleFavorite(pack.mal_id);
            }}
          >
            <AiFillHeart
              className={`w-9 h-9 transition-colors duration-200 ${
                favorites.includes(pack.mal_id)
                  ? "text-pink-500"
                  : "text-white"
              }`}
            />
          </button>
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
