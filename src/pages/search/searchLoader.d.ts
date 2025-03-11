import type { PackagesSummary } from "../../api/types/packagesSummary";
export interface SearchLoaderResult {
    searchResult: PackagesSummary[];
}
export declare function searchLoader({ request }: {
    request: Request;
}): Promise<SearchLoaderResult>;
