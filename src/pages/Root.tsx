import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

export default function Root() {
    return (
        <div className='container m-auto px-20 bg-[#0a0f18] '>
            <Header/>
            <div className='font-sans'>
                <Outlet/>
            </div>
            
            
           
        </div>
    )
}