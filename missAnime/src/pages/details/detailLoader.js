import { getPackage } from "../../api/queries/getPackage";
export async function detailsLoader({ params }) {
    const { name } = params;
    if (!name) {
        throw new Error("Name is required");
    }
    const details = await getPackage(Number(name));
    return {
        details,
    };
}
