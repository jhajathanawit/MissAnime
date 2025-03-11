import type { PackageDetails } from "../../api/types/packageDetails";
export interface HomeLoaderResult {
    featurepackage: PackageDetails[];
}
export declare function homeLoader(): Promise<HomeLoaderResult>;
