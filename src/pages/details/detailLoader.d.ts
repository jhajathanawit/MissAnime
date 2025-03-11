import type { Params } from "react-router-dom";
import type { PackageDetails } from "../../api/types/packageDetails";
interface LoaderArgs {
    params: Params;
}
export interface detailsLoaderResult {
    details: PackageDetails;
}
export declare function detailsLoader({ params }: LoaderArgs): Promise<detailsLoaderResult>;
export {};
