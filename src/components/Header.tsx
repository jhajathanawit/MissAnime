import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import Navbar from "./navbar/navbar";




export default function Header() {
  const location = useLocation();
  const isloginPage = location.pathname === "/login";
  const isContactPage = location.pathname === "/contact";
  
  return (
    <>
      {!isContactPage && (
        <div className="flex-col border-b py-2">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Link to="/" className="flex text-4xl font-bold">
                <h1 className="text-pink-100">MISS</h1>
                <h1 className="text-pink-500">ANIME</h1>
              </Link>
            </div>
            <div>
              <Navbar />
            </div>
          </div>
          {!isloginPage && (
            <div className="flex justify-center w-full">
              <SearchInput />
            </div>
          )}
        </div>
      )}
    </>
  );
}