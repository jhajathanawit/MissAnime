import type { PackageDetails } from "../types/packageDetails";

const MORE_HOMEPAGE = [
    'top',
    'random',
    'recommendations',

]

export async function getMoreHomePage() {
    const promise =  MORE_HOMEPAGE.map(async (name) => {
        const res = await fetch(`https://api.jikan.moe/v4/${name}/anime`);
        return res.json();
    })
    const data = await Promise.all(promise);

    return data as PackageDetails[];
}