import { searchPackages } from "../../api/queries/searchPackages";
import type {PackagesSummary} from "../../api/types/packagesSummary";

export interface SearchLoaderResult {
    searchResult: PackagesSummary[];
}

export async function searchLoader({request}: {request: Request}):Promise<SearchLoaderResult> {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get("q");

    if(!query){
      throw new Error("Search term is required");
    }
    
    const results = await searchPackages(query);
    return {
        searchResult: results,
    }
  }