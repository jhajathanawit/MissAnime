import { Link } from "react-router-dom"
import SearchInput from "./SearchInput"
import Navbar from "./navbar/navbar"

export default function Header() {
    return (
        <div className="flex-col justify-between items-center px-4 border-b py-2"> 
           <div className="flex justify-between items-center py-2">
                <div >
                    <Link to='/' className="flex text-4xl font-bold ">
                        <h1 className="text-pink-100">MISS</h1>
                        <h1 className="text-pink-500">ANIME</h1>
                    </Link>
                </div>
                <div >
                    <Navbar/>
                </div>
            </div> 
            
            <div className="justify-center items-center w-full ">
                <SearchInput/>
            </div>
            
        </div>
    )
}