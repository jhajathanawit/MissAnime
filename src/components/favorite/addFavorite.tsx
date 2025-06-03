export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function addFavorite(animeId: number, token: string) {
  return fetch(`${API_BASE}/my-anime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mal_id: animeId }),
  });
}

export async function getUserFavorites(userId: number, token: string) {
  const res = await fetch(`${API_BASE}/my-anime/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteFavorite(userId: number, animeId: number, token: string) {
  return fetch(`${API_BASE}/my-anime/user/${userId}/anime/${animeId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}