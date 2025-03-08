import { Link } from "react-router-dom"
import SearchInput from "./SearchInput"

export default function Header() {
    return (
        <div className="flex-col justify-between items-center px-4 border-b h-14 py-2"> 
           <div className="flex justify-between items-center">
                <div >
                    <Link to='/' className="flex text-4xl font-bold ">
                        <h1 className="text-pink-100">MISS</h1>
                        <h1 className="text-pink-500">ANIME</h1>
                    </Link>
                </div>
                <div className="flex gap-4">
                    <ul className="flex gap-4 text-pink-100">
                        <li>JikanAPI</li>
                        <li>GitHub</li>
                        <li>ContactUs</li>
                    </ul>
                </div>
            </div> 
            
            <div className="w-full max-w-xl ml-4 font-sans p-4">
                <SearchInput/>
            </div>
            
        </div>
    )
}