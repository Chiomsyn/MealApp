import React, { useState } from 'react';
import logoImg from '../../assests/logo.png';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';


export default function Navbar({
    page
}){
    const [nav, setNav] = useState(false);
const handleClick = () => setNav(!nav);
const navigate = useNavigate()

const {logout} = useLogout();

const handleLogOut = (e) => {
    e.preventDefault();

    logout();
    navigate('/')

}
    return (
        <>
         <div className='h-[60px] w-screen bg-slate-100 fixed z-10'>
            <div className='flex justify-between h-full px-2 md:mx-[80px]'>
                {/*logo */}
                <div className='flex'>
                    <img className='h-15' src={logoImg} alt="/" />
                    <h2 className=' mt-[25px] text-3xl font-bold text-slate-700'>Loctech</h2>
                </div>
                {/* menu */}
                <div className='hidden md:flex '>
                    <ul className='flex mt-6'>
                        <li className='text-xl text-gray-500'>Home</li>
                        <li className='text-xl text-gray-500'>Get Ticket</li>
                        <li className='text-xl text-gray-500'>Meal</li>
                    </ul>
                </div>
               {
                   page==='home' ?  <div className='hidden md:flex'>
                   <Link to='/login'> <button className='ml-4 my-4 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white rounded-3xl px-9 py-2 bg-slate-900 '>LogIn</button> </Link>
                   <Link to='/signup'> <button className='ml-10 my-4 rounded-3xl px-8 py-2 bg-slate-900 '>Register</button> </Link>
               </div> : <button onClick={handleLogOut} className='hidden md:flex ml-10 my-4 rounded-3xl px-8 py-2 bg-slate-900'>LogOut</button>
               }
                {/* Get started */} 
                <div className='md:hidden mr-5 m-auto' onClick={handleClick}>
                   {!nav ?  <MenuIcon className='w-7' /> :  <XIcon  className='w-7'/> }
                </div>
            </div>
                <div className={!nav ? 'hidden' : 'w-full  max-w-[645px] px-4 md:hidden bg-slate-100 absolute'}>
                <ul>
                    <li className='text-xl text-center mx-4'>Home</li>
                    <li className='text-xl text-center mx-4'>Get Ticket</li>
                    <li className='text-xl text-center mx-4'>Meal</li>
                </ul>
               { page==='home' ? <div>
               <Link to='/login'><button className='bg-transparent hover:text-white hover:bg-slate-900 text-slate-900 px-8 py-3 my-4 w-full '>LogIn</button></Link>
               <Link to='/signup'><button className='bg-slate-900 px-8 py-3 my-4 w-full '>Register</button></Link>
                </div> : <button onClick={handleLogOut} className='bg-slate-900 px-8 py-3 my-4 w-full '>LogOut</button>}
                </div>
        </div>
        </>
    )
}



