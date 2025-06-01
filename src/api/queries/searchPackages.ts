import type { PackagesSummary } from "../types/packagesSummary";

interface SearchResponse {
  data: {
    mal_id: number;
    score: number;
    title: string;
    year: number;
    images: {
      webp: {
        image_url: string;
      };
    };
    rank: number;
    rating?: string; // ใช้ ? เพื่อระบุว่าอาจไม่มีค่า
    type?: string; // ใช้ ? เพื่อระบุว่าอาจไม่มีค่า
  }[];
}

export async function searchPackages(
  query: string,
  type: string | null,
  rating: string | null,
  sort: string | null
): Promise<PackagesSummary[]> {
  // ตั้งค่า rating เป็นค่าว่างหากเป็น null
  const ratingParam = rating ? `&rating=${rating}` : "";

  const res = await fetch(
    `https://api.jikan.moe/v4/anime?q=${query}&type=${type}${ratingParam}&order_by=score&sort=${sort}`
  );

  const data: SearchResponse = await res.json();

  // ตรวจสอบว่า data.data เป็นอาร์เรย์ก่อนเรียก .map()
  if (!Array.isArray(data.data)) {
    console.error("Unexpected response format:", data);
    return [];
  }

  return data.data.map((searchResult) => {
    return {
      mal_id: searchResult.mal_id,
      score: searchResult.score,
      title: searchResult.title,
      year: searchResult.year,
      images: {
        webp: {
          image_url: searchResult.images.webp.image_url,
        },
      },
      rank: searchResult.rank,
      rating: searchResult.rating || undefined, // ใช้ undefined หากไม่มีค่า rating
      type: searchResult.type || undefined, // ใช้ undefined หากไม่มีค่า type
    };
  });
}