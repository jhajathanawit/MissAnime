import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import Navbar from "./navbar/navbar";

export default function Header() {
  return (
    <div className="flex-col border-b py-2">
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center">
          <Link to="/MissAnime/" className="flex text-4xl font-bold">
            <h1 className="text-pink-100">MISS</h1>
            <h1 className="text-pink-500">ANIME</h1>
          </Link>
          
        </div>
        <div>
          <Navbar />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <SearchInput />
      </div>
    </div>
  );
}