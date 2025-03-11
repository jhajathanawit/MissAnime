import type { PackagesSummary } from "../types/packagesSummary";
export declare function searchPackages(query: string, type: string | null, rating: string | null, sort: string | null): Promise<PackagesSummary[]>;
