import { searchPackages } from "../../api/queries/searchPackages";
import type {PackagesSummary} from "../../api/types/packagesSummary";

export interface SearchLoaderResult {
    searchResult: PackagesSummary[];
}

export async function searchLoader({request}: {request: Request}):Promise<SearchLoaderResult> {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || null;
    const rating = searchParams.get("rating") || null;
    const sort = searchParams.get("sort") || null;

   
    
    const results = await searchPackages( query,type, rating, sort);
    return {
        searchResult: results,
    }
  }