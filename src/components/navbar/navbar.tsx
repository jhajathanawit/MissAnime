import { useState } from 'react';

function Navbar(){

    const[menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => { 
        setMenuOpen(!menuOpen);
        
    } 

    const[contact, setContact] = useState(false);
    const toggleContact = () => {
        setContact(!contact);
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
                <button onClick={toggleContact}>contact
                    {contact ? (
                        <ul className='text-sm text-left'>
                            <li><a target='_blank' href="https://www.facebook.com/thanawit.rungsangchan/">FaceBook</a></li>
                            <li><a target='_blank' href="https://github.com/jhajathanawit">mygithub</a></li>
                            <li><a target='_blank' href="https://fastwork.co/user/thanawit.r">FastWork</a></li>
                        </ul>
                    ):null}
                </button>
                


            </ul>
        </div>
        {menuOpen ? (<ul className="flex-col md:hidden gap-4">
                <li><a target='_blank' href="https://jikan.moe/">JikanAPI</a></li>
                <li><a target='_blank' href="https://github.com/jhajathanawit/MissAnime">GitHub</a></li>
                <button onClick={toggleContact}>contact
                    {contact ? (
                        <ul className='text-sm text-left'>
                           <li><a target='_blank' href="https://www.facebook.com/thanawit.rungsangchan/">FaceBook</a></li>
                            <li><a target='_blank' href="https://github.com/jhajathanawit">mygithub</a></li>
                            <li><a target='_blank' href="https://fastwork.co/user/thanawit.r">FastWork</a></li>
                        </ul>
                    ):null}
                </button>
            </ul>
            ):null}
        
       </div>
        
       

    )
}

export default Navbar;