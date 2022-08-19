import Navbar from "../../components/hero/Navbar"
import { useState, useEffect } from "react"
import { CookTab } from "../../components/meal/mealTabs"
import { StarIcon } from "@heroicons/react/solid"
import { GetMeal, UpdateMeal } from "../../hooks/MealHook"
import { useAuthContext } from '../../hooks/useAuthContext';
// import chroma from 'chroma-js';

const Meal = () => {

    const [meals] = GetMeal();
    const { update, updateError, updateSuccessful } = UpdateMeal();
    const { user } = useAuthContext()

    const [tab, setTab] = useState(0)
    const [mornMeals, setMornMeals] = useState(['onit', 'onit', 'onit', 'onit', 'rice,beans & stew'])
    const [afterMeals, setAfterMeals] = useState(['', '', '', '', ''])
    const [afterPrice, setAfterPrice] = useState([0, 0, 0, 0, 0])
    const [mornPrice, setMornPrice] = useState([0, 0, 0, 0, 0])
    const [mornUpdate, setMornUpdate] = useState('false')
    const [afterUpdate, setAfterUpdate] = useState(false)

    const handleTab = (e, num) => {
        e.preventDefault()

        setTab(num)
    }

    const getTabPage = () => {
        if (tab === 0) {
            return <CookTab />
        } else {
            return <></>
        }
    }

    useEffect(() => {
        if(meals && meals.length > 0 ){
            
            meals.map((item)=>{
                if(item.session === 'Morning' && item.state === 'Submit'){
                    setMornUpdate('true')
                    setMornMeals(item.food)
                    setMornPrice(item.price)
                }

                if(item.session === 'Afternoon' && item.state === 'Submit'){
                    setAfterUpdate(true)
                    setAfterMeals(item.food)
                    setAfterPrice(item.price)
                }
                return item
            },
            )
        }

    }, [meals])
    
  const updateMeal = (e) => {

      meals.map((item)=>{
        if(item.session === 'Morning'){
            const updatedMeal = {...item, state: 'Update'}
            
            update(updatedMeal, user, item._id)
            setMornUpdate(null)
        }
        return item
    })
}


useEffect(() => {
    if (mornUpdate === null) {
        setTimeout(() => {

            if (updateSuccessful) {
                setMornMeals(['','','','',''])
                setMornUpdate(null)
                // setMornFoodNum(null)
                // setMornSubmit('Update')
            } else {
                setMornUpdate('true')
                // setMorning(false)
            }
        }, 3000);
    }
}, [mornUpdate, updateSuccessful])
     
    

    return (
        <>
            <Navbar />
            <div className="h-full w-full mb-96 flex flex-col justify-between">
                <div className="m-8 mt-24 sm:hidden">
                    <CookTab/>
                </div>


                <div className="hidden sm:flex sm:mx-24 2xl:mx-[20rem] mt-32 items-start">
                    {/* <ul className="w-96 xl:mr-24 mt-16 bg-slate-100 rounded-xl">
                        <li className="flex-grow text-center">
                            <p onClick={e => handleTab(e, 0)} className={"font-medium text-xs text-slate-900 leading-tight uppercase  px-6 py-3 bg-transparent my-2 " + (tab === 0 ? 'border-b-2 border-orange-700' : 'border-none')}>Upload</p>
                        </li>
                        <li>
                            <p onClick={e => handleTab(e, 1)} className={"font-medium text-xs text-slate-900 leading-tight uppercase px-6 py-3 bg-transparent my-2 " + (tab === 1 ? 'border-b-2 border-orange-700' : 'border-none')}>Meal</p>
                        </li>
                        <li>
                            <p onClick={e => handleTab(e, 2)} className={"font-medium text-xs text-slate-900 leading-tight uppercase px-6 py-3 bg-transparent my-2 " + (tab === 2 ? 'border-b-2 border-orange-700' : 'border-none')}>Ticket</p>
                        </li>
                    </ul> */}
                    <div className="w-full xl:mr-40">
                    <CookTab />
                        <div className="xl:mx-24" >
                            <h1 className="text-4xl py-2 font-bold border-b-2 border-orange-500 sm:w-full">Today's Menu</h1>
                            <div className="flex mt-4 justify-center mx-10">
                                <div className="bg-slate-900 px-6 border-2 border-slate-900 mt-10">
                                    <h2 className="text-3xl my-8 font-medium text-center w-full text-white">Morning Special</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            {
                                                mornMeals && mornMeals.map((e, i) => (
                                                    <div key={i} className='py-6 px-2'>
                                                        <span className="flex"><StarIcon className="w-7 text-orange-700" /> <h1 className="text-xl mx-4 text-white font-medium">Meal {i + 1}</h1></span>
                                                        <p className="text-xl pl-10 text-white font-bold">{e}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div>
                                            {
                                                mornPrice && mornPrice.map((e, i) => (
                                                    <div key={i} className='py-6 ml-10'>
                                                        <h1 className="text-xl font-medium">Price</h1>
                                                        <p className="text-xl font-bold">&#8358; {e}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <button onClick={updateMeal} className={mornUpdate === 'true' ? "my-6 bg-slate-900 py-2 px-8 text-2xl font-bold" : 'hidden'}>Update</button>
                                    </div>
                                </div>
                                <div className="bg-[#FEEAB5] mx-4 px-6 border-2 border-slate-900 mt-10">
                                    <h2 className="text-3xl my-8 font-medium text-center w-full">Lunch Special</h2>
                                    <div className="grid grid-cols-2 gap-4 ">
                                        <div>
                                            {
                                                afterMeals && afterMeals.map((e, i) => (
                                                    <div key={i} className='py-6 px-2'>
                                                        <span className="flex"><StarIcon className="w-7 text-orange-700" /> <h1 className="text-xl mx-4 font-medium">Meal {i + 1}</h1></span>
                                                        <p className="text-xl pl-10 font-bold">{e}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div>
                                            {
                                                afterPrice && afterPrice.map((e, i) => (
                                                    <div key={i} className='py-6 ml-10'>
                                                        <h1 className="text-xl font-medium">Price</h1>
                                                        <p className="text-xl font-bold">&#8358; {e}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <button className={afterUpdate ? "my-6 bg-slate-900 py-2 px-8 text-2xl font-bold" : 'hidden'}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Meal