import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { addFavorite, getUserFavorites, deleteFavoriteByExternalId } from "./addFavorite";

interface Props {
  animeId: number;
  userId: number | null;
  isFavorite: boolean;
  onChange: (fav: boolean) => void;
}

const FavoriteHeartButton: React.FC<Props> = ({ animeId, userId, isFavorite, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    const favs = await getUserFavorites(userId!, token!);
    // ใช้ userAnimeList และ external_anime_id
    const favArr = Array.isArray(favs.data?.userAnimeList) ? favs.data.userAnimeList : [];
    const found = favArr.some((a: any) => a.external_anime_id === String(animeId));
    if (found) {
      setShowModal(true);
    } else {
      const res = await addFavorite(animeId, token!);
      if (!res.ok) {
        const err = await res.json();
        console.error("Add favorite error:", err);
        alert(err.message || "เพิ่มลิสต์ไม่สำเร็จ");
        setLoading(false);
        return;
      }
      onChange(true);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token || !userId) return;
    await deleteFavoriteByExternalId(userId, String(animeId), token);
    onChange(false);
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="focus:outline-none"
        onClick={handleClick}
        disabled={loading}
        aria-label="favorite"
      >
        <AiFillHeart
          className={`w-9 h-9 transition-colors duration-200 ${
            isFavorite ? "text-red-500" : "text-white"
          }`}
        />
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className="mb-4">คุณมีอนิเมะนี้ในลิสต์อยู่แล้ว ต้องการลบออกหรือไม่?</div>
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >ยกเลิก</button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
              >ตกลง</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteHeartButton;