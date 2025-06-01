// utils/animeBadge.tsx หรือวางบนสุดของแต่ละไฟล์

export function getRatingShort(rating?: string) {
  if (!rating) return "";
  const match = rating.match(/^[A-Z0-9\+]+/i);
  return match ? match[0] : "";
}

export function getRatingBadge(rating?: string) {
  const short = getRatingShort(rating);
  if (!short) return null;
  let color = "bg-gray-400";
  if (short === "G") color = "bg-green-500";
  else if (short === "PG") color = "bg-blue-400";
  else if (short === "PG13") color = "bg-yellow-400";
  else if (short === "R17") color = "bg-orange-500";
  else if (short === "R+") color = "bg-red-500";
  else if (short === "RX") color = "bg-pink-600";
  return (
    <span className={`text-base px-3 py-1 rounded-full text-white font-bold ${color}`}>
      {short}
    </span>
  );
}

export function getTypeBadge(type?: string) {
  if (!type) return null;
  let color = "bg-gray-400";
  if (type === "TV") color = "bg-blue-500";
  else if (type === "Movie") color = "bg-purple-500";
  else if (type === "OVA") color = "bg-pink-500";
  else if (type === "ONA") color = "bg-green-500";
  else if (type === "Special") color = "bg-yellow-500";
  else if (type === "Music") color = "bg-indigo-500";
  return (
    <span className={`text-base px-3 py-1 rounded-full text-white font-bold ${color}`}>
      {type}
    </span>
  );
}