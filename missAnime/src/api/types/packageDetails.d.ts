export interface PackageDetails {
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
        trailer: {
            youtube_id: string;
            url: string;
            embed_url: string;
        };
        rating: string;
        status: string;
        season: string;
        duration: string;
        producers: {
            mal_id: number;
            type: string;
            name: string;
        };
        synopsis: string;
        type: string;
        episodes: number;
    };
}
