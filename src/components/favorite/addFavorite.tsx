export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function addFavorite(animeId: number, token: string) {
  return fetch(`${API_BASE}/my-anime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // ต้องเป็น anime_id และเป็น string
    body: JSON.stringify({ anime_id: String(animeId) }),
  });
}

export async function getUserFavorites(userId: number, token: string) {
  const res = await fetch(`${API_BASE}/my-anime/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteFavoriteByExternalId(userId: number, externalAnimeId: string, token: string) {
  return fetch(`${API_BASE}/my-anime/user/${userId}/anime/${externalAnimeId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

