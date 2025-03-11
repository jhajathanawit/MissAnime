import { getMoreHomePage } from "../../api/queries/getMoreHomepage";
export async function homeLoader() {
    const featurePackage = await getMoreHomePage();
    return {
        featurepackage: featurePackage,
    };
}
