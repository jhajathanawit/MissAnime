export async function searchPackages(query, type, rating, sort) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=${type}&rating=${rating}&order_by=score&sort=${sort}`);
    const data = await res.json();
    return data.data.map((searchResult) => {
        return {
            mal_id: searchResult.mal_id,
            score: searchResult.score,
            title: searchResult.title,
            year: searchResult.year,
            images: {
                webp: {
                    image_url: searchResult.images.webp.image_url
                }
            },
            rank: searchResult.rank
        };
    });
}
