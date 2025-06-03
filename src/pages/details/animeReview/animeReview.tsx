import React, { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

interface AnimeReviewProps {
  mal_id: number;
}
interface Review {
  review_id: number;
  external_anime_id: string;
  user_id: number;
  username: string;
  review_text: string;
  created_at: string;
}

export default function AnimeReview({ mal_id }: AnimeReviewProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ดึงรีวิวทั้งหมด
  useEffect(() => {
    const fetchAnimeReviews = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(
          `${API_BASE}/reviews/anime/${mal_id}`,
          {
            headers: {
              'Authorization': token ? `Bearer ${token}` : ''
            }
          }
        );
        const data = await response.json();
        setReviews(Array.isArray(data.data?.reviews) ? data.data.reviews : []);
      } catch (error) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeReviews();
  }, [mal_id]);

  // ส่งรีวิวใหม่
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          external_anime_id: String(mal_id),
          Review_text: reviewText
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to submit review");
      }
      const data = await response.json();
      setReviews([data.data, ...reviews]);
      setReviewText("");
    } catch (err: any) {
      setError(err.message || "Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-2 sm:p-4 md:p-6 lg:p-8 rounded shadow max-w-full">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-pink-600">Anime Reviews</h2>
      {/* ฟอร์มเพิ่มรีวิว */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 sm:gap-3 md:gap-4">
        <textarea
          className="border rounded p-2 w-full resize-none text-sm sm:text-base md:text-lg"
          rows={3}
          placeholder="เขียนรีวิวของคุณ..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-xs sm:text-sm">{error}</div>}
        <button
          type="submit"
          disabled={submitting || !reviewText.trim()}
          className="self-end bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded transition text-xs sm:text-sm md:text-base"
        >
          {submitting ? "pending..." : "send"}
        </button>
      </form>
      {/* แสดงรีวิว */}
      {loading ? (
        <div>Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="text-gray-500 text-sm sm:text-base">No reviews found.</div>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.review_id}
              className="border-b pb-2 flex flex-col sm:flex-row sm:items-center gap-2"
            >
              <span className="font-semibold text-xs sm:text-sm md:text-base">
                {review.username || "Anonymous"}
              </span>
              <div className="text-gray-700 text-xs sm:text-sm md:text-base flex-1 break-words">
                {review.review_text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}