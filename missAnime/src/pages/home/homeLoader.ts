import type { PackageDetails } from "../../api/types/packageDetails";
import { getMoreHomePage } from "../../api/queries/getMoreHomepage";

export interface HomeLoaderResult {
    featurepackage: PackageDetails[];
}

export async function homeLoader(): Promise<HomeLoaderResult> {
    const featurePackage = await getMoreHomePage();

    return {
        featurepackage: featurePackage,
    };
}