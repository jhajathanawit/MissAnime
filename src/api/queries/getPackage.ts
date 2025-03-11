import type { PackageDetails } from "../types/packageDetails";

export async function getPackage(name: number): Promise<PackageDetails> {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${name}`);
    const data: PackageDetails = await res.json();
    
    return data;
}