export async function getPackage(name) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${name}`);
    const data = await res.json();
    return data;
}
