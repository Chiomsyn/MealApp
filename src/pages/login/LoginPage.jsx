import React from 'react'
import Header from '../../components/login/Header'
import Login from '../../components/login/login'
import foodImg from '../../assests/food2.jpg';
import logo from '../../assests/logo.png';

const LoginPage = () => {
  return (
   <div className=' h-screen bg-slate-900 overflow-hidden'>
     <div className='grid lg:grid-cols-2 md:mx-0'>
    <div className='flex flex-col justify-center items-center lg:ml-44 lg:items-start lg:justify-start'>
      <div className=' lg:hidden'>
      <img className='w-full h-screen mix-blend-overlay' src={foodImg} alt="/" />
      </div>
    <div className='absolute flex flex-col bg-slate-100 rounded-3xl px-10 pb-32 shadow-xl  pt-10 border border-slate-300 my-32'>
    <>
    <Header
     heading="Login to your account"
     paragraph="Don't have an account yet? "
     linkName="Signup"
     linkUrl="/signup"
     />
     <Login/>
    </>
    </div>
    <div className='h-10'>
    </div>
    </div>
    <div className='hidden lg:relative lg:flex'>
    <img className='lg:rounded-l-2xl mix-blend-overlay' src={foodImg} alt="/" />
     <div className='flex flex-col absolute w-[420px] my-48 mx-40 justify-center'>
     <div className='mx-auto'><img className='rounded-l-2xl mix-blend-overlay' src={logo} alt="/" /></div>
     <p className='text-white flex-col  text-9xl font-bold'>LOCTECH Meal
     <span className='text-xl'>ticket.</span></p>
     </div>
    </div>
     </div>
   </div>
  )
}

export default LoginPage
