import React from 'react';
import foodImg from '../../assests/food2.jpg';
import { HeartIcon } from '@heroicons/react/solid';

const Middle = () => {
    return (
        <div className=' bg-slate-900 '>
            <div className='grid mb-32 lg:grid-cols-2 md:gap-[150px] h-[600px] lg:mx-[80px]'>
                <div className=' mt-96  relative'>
                    <img className='w-3/4 h-[600px] mx-auto mt-8 rounded-xl border-2 border-white' src={foodImg} alt="/" />
                    <div className='lg:w-4/6 mt-4 lg:absolute bottom-[10%] text-white border-white border-4 md:inline-flex right-[-20%] bg-slate-900 rounded-xl shadow-xl px-4 '>
                        <h1 className='text-md text-center '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate cumque officiis dolore distinctio inventore.</h1>
                        <div className=' flex rounded-full md:absolute bg-white w-12 h-12 p-2 left-[-7%] top-[20%]'>
                            <HeartIcon className='w-10 text-slate-900' />
                        
                    </div>
                    </div>
                </div>
                <div className='flex flex-col mb-32 w-full items-center md:mt-72 md:pt-40 lg:items-start'>
                    <p className='mt-4 text-2xl text-slate-500'>Choose your meal today!!!!</p>
                    <h3 className='text-3xl font-bold md:mt-5 lg:text-white'>Loctech Meal Ticket</h3>
                    <h1 className='items-start w-[400px] text-xl md:text-white text-md mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quis sequi aliquid quia earum obcaecati doloremque odio, libero corporis et!</h1>
                        <h2 className='border-b-orange-300 md:mt-4 border-b-2 text-orange-600'>View todays Meal</h2>
                </div>
            </div>
        </div>
    )
}

export default Middle
