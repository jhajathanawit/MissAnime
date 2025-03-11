import type { PackagesSummary } from "../api/types/packagesSummary";
import { Link } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

interface PackagesListItemProps {
  pack: PackagesSummary;
}
export default function PackagesListItem({ pack }: PackagesListItemProps) {
  
  return (
    <Link to={`/MissAnime/packages/${pack.mal_id}`} className="object-cover m-4">
      <div className="p-4  flex justify-between items-center text-xl font-bold rounded-[16px] bg-[#1f293a50] hover:bg-[#546b94] hover:scale-110 transition duration-800 h-full">
        <div className="grid grid-cols-1 w-40 gap-2">
          <div className="mb-2 flex justify-center object-cover">
            <img
              src={pack.images.webp.image_url}
              alt={pack.title}
              className="w-40 h-48 object-cover"
            />
          </div>
          <div className="flex flex-cols justify-between">
            <div className="flex items-center justify-center gap-1">
              <FaRankingStar className="text-pink-500 text-sm" />
              <p className="text-sm text-pink-500">{pack.rank}</p>
            </div>
            

            <div className="flex items-center justify-center gap-1">  
              <IoStar className="text-amber-300 text-sm" />
               <p className="text-sm text-pink-100">{pack.score}</p>
            </div>
           
          </div>
          
          <p className="text-sm text-pink-100">{pack.title}</p>
        </div>
      </div>
    </Link>
  );
}
