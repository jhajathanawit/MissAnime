import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";

export default function SearchInput() {
  const [term, setTerm] = useState<string>("");
  const [score, setScore] = useState<string>("desc");
  const [type, setType] = useState<string>("tv");
  const [rating, setRating] = useState<string>("pg13");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      `search?q=${term}&type=${type}&rating=${rating}&order_by=scored_by&sort=${score}`
    );
  }, [score, type, rating, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      `search?q=${term}&type=${type}&rating=${rating}&order_by=scored_by&sort=${score}`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="relative w-screen max-w-md">
        <div className="absolute inset-y-0 flex items-center pl-3">
          <VscSearch className="w-5 h-5 text-gray-500" />
        </div>

        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="pl-10 py-2 w-full border-0 shadow-none bg-white rounded-full focus:ring-0 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex py-1 justify-center items-center space-x-2">
        <select
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="py-2 px-2 border rounded-2xl bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="desc">Max-Score</option>
          <option value="asc">Min-Score</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="py-2 px-2 border rounded-2xl bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
        >
          
          <option value="tv">Tv</option>
          <option value="movie">Movie</option>
          <option value="ova">Ova</option>
          <option value="special">Special</option>
          <option value="ona">Ona</option>
          <option value="music">Music</option>
          <option value="cm">Cm</option>
          <option value="pv">Pv</option>
          <option value="tv_special">Tv_Special</option>
        </select>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="py-2 px-2 border rounded-2xl bg-white text-black focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="g">All Ages</option>
          <option value="pg">PG-Children</option>
          <option value="pg13">PG13</option>
          <option value="r17">R-17+</option>
          <option value="r">R+</option>
          <option value="rx">Rx(Hentai)</option>
        </select>
      </div>
    </form>
  );
}
