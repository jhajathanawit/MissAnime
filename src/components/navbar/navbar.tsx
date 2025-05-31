import { useState } from 'react';
// Correct the import path below if necessary
import Contact from "../../pages/contact/contact";
import { Link } from "react-router-dom";

function Navbar(){

    const[menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => { 
        setMenuOpen(!menuOpen);
        
    } 

    

    return (
       <div className='text-white text-xl'>
        <div className='text-white text-xl'>

            <div className='md:hidden'>
                <button id='menu-toggle' className='text-white' onClick={toggleMenu}>
                    <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            <ul className="hidden md:flex gap-4">
                <li><a target='_blank' href="https://jikan.moe/">Jikan.API</a></li>
                <li><a target='_blank' href="https://github.com/jhajathanawit/MissAnime">GitHub</a></li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
        {menuOpen ? (<ul className="flex-col md:hidden gap-4">
                <li><a target='_blank' href="https://jikan.moe/">JikanAPI</a></li>
                <li><a target='_blank' href="https://github.com/jhajathanawit/MissAnime">GitHub</a></li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            ):null}
        
       </div>
        
       

    )
}

export default Navbar;