export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function addFavorite(animeId: string, token: string) {
  const response = await fetch(`${API_BASE}/my-anime`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      external_anime_id: animeId.toString(), // เปลี่ยนจาก anime_id เป็น external_anime_id
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add favorite");
  }

  return response.json();
}

export async function getUserFavorites(userId: number | null, token: string) {
  if (!userId) return { data: { userAnimeList: [] } };

  const res = await fetch(`${API_BASE}/my-anime/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteFavoriteByExternalId(
  userId: number,
  externalAnimeId: string,
  token: string
) {
  return fetch(
    `${API_BASE}/my-anime/user/${userId}/anime/${externalAnimeId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

