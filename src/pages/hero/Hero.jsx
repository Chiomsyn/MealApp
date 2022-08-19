import React from 'react'
import Middle from '../../components/hero/Middle'
import Footer from '../../components/hero/Footer';
import NavBar from '../../components/hero/Navbar';
import foodImg from '../../assests/ticket1.jpg';

const Hero = () => {
    return (
       <>
        <NavBar page='home'/>
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='bg-slate-100/90'>
                <div className='grid mt-[90px] h-[400px] md:grid-cols-2 md:mx-[80px] '>
                    <div className='flex flex-col mt-10 md:items-start'>
                        <p className='mt-4 text-2xl text-orange-500'>Good Morning</p>
                        <h3 className='text-5xl font-bold mt-5'>Loctech Meal Ticket</h3>
                        <h1 className='items-start w-[400px] text-md mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quis sequi aliquid quia earum obcaecati doloremque odio, libero corporis et!</h1>
                        <button className='py-3 px-6 my-4 sm:w-[60%] bg-slate-900'>Get Started</button>
                    </div>
                    <div className='lg:mt-5'>
                        <img className='w-3/4 h-[600px] mt-8 mx-auto rounded-xl border-2 border-white' src={foodImg} alt="/" />
                    </div>
                </div>
            </div>

        </div>
        <Middle/>
      <Footer/>
       </>
    )
}

export default Hero
