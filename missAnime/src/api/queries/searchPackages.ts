import type { PackagesSummary } from "../types/packagesSummary";
import axios from "axios";

interface SearchResponse {
    
        data:
         {
            mal_id: number;
            score: number;
            title: string;
            year: number;
            images: {
                webp: {
                    image_url: string;

                },
            },
            rank: number;
        
    }[],
}

export async function searchPackages(query: string, type: string | null, rating: string | null, sort: string | null): Promise<PackagesSummary[]> {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=${type}&rating=${rating}&order_by=score&sort=${sort}`);
    const data: SearchResponse = await res.json();
    

    
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
        }
    });


}