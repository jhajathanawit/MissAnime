export async function searchPackages(query, type, rating, sort) {
    // ตั้งค่า rating เป็นค่าว่างหากเป็น null
    const ratingParam = rating ? `&rating=${rating}` : "";
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=${type}${ratingParam}&order_by=score&sort=${sort}`);
    const data = await res.json();
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
