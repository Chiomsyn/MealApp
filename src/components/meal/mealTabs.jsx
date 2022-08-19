import { ChevronDoubleRightIcon } from "@heroicons/react/solid"
import { useState, useEffect } from "react"
import Select from "react-select"
import { ChevronDownIcon, FireIcon } from '@heroicons/react/solid';
import { GetMeal, CreateMeal, UpdateMeal } from "../../hooks/MealHook";
import { useAuthContext } from '../../hooks/useAuthContext';

export function CookTab() {

    const [meals] = GetMeal();
    const { submit, error, successful } = CreateMeal();

    const { update, updateError, updateSuccessful } = UpdateMeal();
    const { user } = useAuthContext()

    const [morning, setMorning] = useState(false)
    const [mornMealNum, setMornMealNum] = useState('0')
    const [mealNum, setMealNum] = useState({ label: '0' })
    const [afternoon, setAfternoon] = useState(false)
    const [mornPriceItem, setMornPriceItem] = useState('Select Price')
    const [mornFoodItem, setMornFoodItem] = useState('Select Meal')
    const [afterPriceItem, setAfterPriceItem] = useState('Select Price')
    const [afterFoodItem, setAfterFoodItem] = useState('Select Meal')
    const [mornFoodNum, setMornFoodNum] = useState(null)
    const [afterFoodNum, setAfterFoodNum] = useState(null)
    const [mornSubmit, setMornSubmit] = useState('Submit')
    const [afterSubmit, setAfterSubmit] = useState('Submit')
    const [mornPriceList, setMornPriceList] = useState(Array(5))
    const [afterPriceList, setAfterPriceList] = useState(Array(5))
    const [mornMealList, setMornMealList] = useState(Array(5))
    const [afterMealList, setAfterMealList] = useState(Array(5))
    const [mornSubmitted, setMornSubmitted] = useState('Submit')
    const [afterSubmitted, setAfterSubmitted] = useState('Submit')

    const mealList = [
        'Rice & stew',
        'Rice, Stew & Beans',
        'Indomie',
        'Egwusi',
        'Ogbonno',
        'Okoro',
        'Oha',
        'BitterLeaf',
        'Native Soup'
    ]

    const priceList = [
        '₦ 500',
        '₦ 600',
        '₦ 700',
        '₦ 800',
        '₦ 900',
        `₦ 1000`,
    ]

    const mealNumList = [
        { label: '1' },
        { label: '2' },
        { label: '3' },
        { label: '4' },
        { label: '5' },
    ]



    const handleSubmit = (e, type) => {
        e.preventDefault()

        let filteredMornPrice = []
        let filteredMornMeal = []
        let filteredAfterPrice = []
        let filteredAfterMeal = []

        if (type === "Morning") {
            filteredMornPrice = filterMornPrice();
            filteredMornMeal = filterMornMeal();
        }

        if (type === "Afternoon") {
            filteredAfterPrice = filterAfterPrice();
            filteredAfterMeal = filterAfterMeal();
        }


        if((type === "Morning" && mornSubmitted === "Submit") || (type === "Afternoon" && afterSubmitted === "Submit")){
            submitMenu(type, filteredMornMeal, filteredAfterMeal, filteredMornPrice, filteredAfterPrice)
        }


        if((type === "Morning" && mornSubmitted === "Update") ||  (type === "Afternoon" && afterSubmitted === "Update")){
            updateMenu(type, filteredMornMeal, filteredAfterMeal, filteredMornPrice, filteredAfterPrice)
        }
        
    }

    const submitMenu = async (type, mornMeal, afterMeal, mornPrice, afterPrice) => {
        let meal = {};
        if (type === "Morning") {
            if (mornMeal.length <= 0 || mornPrice.length <= 0) {
                alert('Please fill all details for morning special')
                return

            } else {
                meal = { session: type, food: mornMeal, price: mornPrice, state: 'Submit' }

                await submit(
                    meal,
                    user);
                setMornSubmitted('Wor-k')
                setMorning(!morning)
            }
        }

        if (type === "Afternoon") {
            if (afterMeal.length <= 0 && afterPrice.length <= 0) {
                alert('Please fill all details for lunch special')
                return
            } else {
                meal = { session: type, food: afterMeal, price: afterPrice, state: 'Submit' }

                await submit(
                    meal,
                    user);
                setAfterSubmitted('Work')
                setAfternoon(!afternoon)
            }
        }
    }

    const updateMenu = async (type, mornMeal, afterMeal, mornPrice, afterPrice) => {
        if (type === "Morning") {
            if (mornMeal.length <= 0 || mornPrice.length <= 0) {
                alert('Please fill all details for morning special')
                return

            } else {

                meals.map((item)=>{
                    if(item.session === 'Morning'){
                        const updatedMeal = {...item, food: mornMeal, price: mornPrice,  state: 'Submit',}
                        
                        update(updatedMeal, user, item._id)
                    }
                    return item
                })
            
                setMornSubmitted('Work')
                setMorning(!morning)
            }
        }

        if (type === "Afternoon") {
            if (afterMeal.length <= 0 && afterPrice.length <= 0) {
                alert('Please fill all details for lunch special')
                return
            } else {

                meals.map((item)=>{
                    if(item.session === 'Afternoon'){
                        const updatedMeal = {...item, food: afterMeal, price: afterPrice, state: 'Submit' }
                        
                        update(updatedMeal, user, item._id)
                    }
                    return item
                })

                setAfterSubmitted('Work')
                setAfternoon(!afternoon)
            }
        }
    }

    useEffect(() => {
        if (mornSubmitted === '') {
            setTimeout(() => {

                if (updateSuccessful) {
                    setMornFoodNum(null)
                } else {
                    setMornSubmitted('Submit')
                    setMorning(false)
                }
            }, 3000);
        }

        if (afterSubmitted === '') {
            setTimeout(() => {

                if (updateSuccessful) {
                    setAfterFoodNum(null)
                } else {
                    setAfterSubmitted('Submit')
                    setAfternoon(false)
                }
            }, 3000);
        }
    }, [mornSubmitted, updateSuccessful, afterSubmitted])

    useEffect(() => {
        if (mornSubmitted === '') {
            setTimeout(() => {

                if (successful) {
                    setMornFoodNum(null)
                    setMornSubmit('Update')
                } else {
                    setMornSubmitted('Submit')
                    setMorning(false)
                }
            }, 3000);
        }

        if (afterSubmitted === '') {
            setTimeout(() => {

                if (successful) {
                    setAfterFoodNum(null)
                    setAfterSubmit('Update')
                } else {
                    setAfterSubmitted('Submit')
                    setAfternoon(false)
                }
            }, 3000);
        }
    }, [mornSubmitted, successful, afterSubmitted])

    function filterAfterMeal() {
        const filterArray = afterMealList.filter(el => el);
        if (afterFoodNum.length < filterArray.length) {
            const s = filterArray.length - afterFoodNum.length;
            const sliced = filterArray.slice(0, -s);
            setAfterMealList(sliced)
            return sliced
        }
        if (afterFoodNum.length > filterArray.length) {
            return []
        }

        return filterArray;
    }

    function filterMornMeal() {
        const filterArray = mornMealList.filter(el => el);
        if (mornFoodNum.length < filterArray.length) {
            const s = filterArray.length - mornFoodNum.length;
            const sliced = filterArray.slice(0, -s);
            setMornMealList(sliced)
            return sliced
        }

        if (mornFoodNum.length > filterArray.length) {
            return []
        }
        return filterArray;
    }

    function filterMornPrice() {
        const filterArray = mornPriceList.filter(el => el);
        if (mornFoodNum.length < filterArray.length) {
            const s = filterArray.length - mornFoodNum.length;
            const sliced = filterArray.slice(0, -s);
            setMornPriceList(sliced)
            return sliced
        }

        if (mornFoodNum.length > filterArray.length) {
            return []
        }
        return filterArray;
    }

    function filterAfterPrice() {
        const filterArray = afterPriceList.filter(el => el);
        if (afterFoodNum.length < filterArray.length) {
            const s = filterArray.length - afterFoodNum.length;
            const sliced = filterArray.slice(0, -s);
            setAfterPriceList(sliced)
            return sliced
        }

        if (afterFoodNum.length > filterArray.length) {
            return []
        }
        return filterArray;
    }

    const selectAfterMealNum = (e) => {
        setMealNum(e.label);
    }

    const selectMornMealNum = (e) => {
        setMornMealNum(e.label);
    }

    const selectMorn = (e, index, type) => {
        if(type === "meal"){
            const cloneArray = mornMealList
        cloneArray[index] = e.target.value
        setMornMealList(cloneArray)
        }

        if(type === "price"){
            const cloneArray = mornPriceList
        const removeNaira = parseInt(e.target.value.split(' ')[1])
        cloneArray[index] = removeNaira
        setMornPriceList(cloneArray)
        }
    }

    const selectAfterMeal = (e, i) => {
        // This is needed for saving the data from drop down in an array
        const cloneArray = afterMealList
        cloneArray[i] = e.label
        setAfterMealList(cloneArray)

        // This is needed for updating the dropdown with data fron db
        if (afterSubmitted === 'Update') {
            setAfterSubmitted('Submit')
        }
    }

    const selectAfterPrice = (e, i) => {
        const cloneArray = afterPriceList
        const removeNaira = parseInt(e.label.split(' ')[1])
        cloneArray[i] = removeNaira
        setAfterPriceList(cloneArray)

        // This is needed for updating the dropdown with data fron db
        if (afterSubmitted === 'Update') {
            setAfterSubmitted('Submit')
        }

    }

    const handleMorning = (e) => {
        e.preventDefault()
        console.log(mornSubmitted)
        if (mornSubmitted === 'Submit' || mornSubmitted === 'Update') {
            setMorning(!morning)
        }
    }

    const handleAfternoon = (e) => {
        e.preventDefault()
        if (afterSubmitted === 'Submit' || afterSubmitted === 'Update') {
            setAfternoon(!afternoon)
        }
    }

    useEffect(() => {
        let foadArray = []

        for (let index = 0; index <= parseInt(mornMealNum); index++) {
            if (index === 0) {
                continue
            }
            foadArray.push(index)
            console.log('hdhd')
        }

        setMornFoodNum(foadArray)
        foadArray = []
    }, [mornMealNum])


    useEffect(() => {
        let me = []

        for (let index = 0; index <= parseInt(mealNum); index++) {
            if (index === 0) {
                continue
            }
            me.push(index)
        }

        setAfterFoodNum(me)
        me = []
    }, [mealNum])

    useEffect(() => {
        if (meals && meals.length > 0) {

            meals.map((item) => {

                if (item.session === 'Morning') {
                    if (item.state === 'Update') {
                        setMornSubmitted('Update')
                        setMornPriceList(item.price)
                        setMornMealList(item.food)
                        setMornMealNum((item.food.length).toString())
                        setMornSubmit('Update')
                    }

                    if (item.state === 'Submit') {
                        setMornSubmitted('Work')

                    }
                }

                if (item.session === 'Afternoon') {
                    if (item.state === 'Update') {
                        setAfterSubmitted('Update')
                        setAfterSubmit('Update')
                    }

                    if (item.state === 'Submit') {
                        setAfterSubmitted('Work')
                    }
                }
                return item;            })
        }

    }, [meals])

    const colourStyles = {
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                border: state.isFocused ? 0 : 0
            }
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            //   const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : '#fff',
                color: '#000',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    };

    return (
        <div className="sm:w-full xl:mr-40">
            <div className="text-3xl font-bold flex justify-between sm:w-full">
                <h2>Upload Today's Meal</h2>
                <ChevronDoubleRightIcon className="text-orange-600 w-7 sm:hidden" />
            </div>
            <div className="my-6 grid sm:grid-cols-2 gap-10">
                <div>
                    <div className='bg-slate-100 flex justify-between rounded-lg p-4 mb-4' onClick={handleMorning}>
                        <h1 className="text-xl flex font-medium">Morning Special<span><FireIcon className="w-5 text-orange-400" /></span></h1>
                        <ChevronDownIcon className="w-7" />
                    </div>
                    <div className={morning === false ? 'hidden' : "flex-col bg-slate-100 p-4 mb-4 "}>
                        <Select styles={colourStyles} className="w-[150px] text-center font-medium xl:mx-20 my-4" value={{ label: mornMealNum }} options={mealNumList} onChange={selectMornMealNum} />
                        <div className="flex-col xl:mx-20 ">
                            {
                                mornFoodNum && mornFoodNum.map((e, index) => {
                                    return <div key={index} className="mb-4 w-full flex justify-between">
                                        <select className="w-[150px] h-14 border-2 font-medium rounded-lg" onChange={e => selectMorn(e, index, "meal")}>
                                            <option value="">{mornSubmitted === 'Update'? mornMealList[index] : 'Select the Meal'}</option>
                                            {mealList.map((meal, key) => (
                                                <option key={key} value={meal}>
                                                    {meal}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="w-[150px] h-14 border-2 font-medium rounded-lg" onChange={e => selectMorn(e, index, 'price')}>
                                            <option value="">Select the Price</option>
                                            {priceList.map((price, key) => (
                                                <option key={key} value={price}>
                                                    {price}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                },
                                )
                            }
                        </div>
                        <div className="w-full flex justify-end">
                            <button onClick={e => handleSubmit(e, 'Morning')} className="my-6 bg-slate-900 py-2 px-8 text-2xl font-bold">{mornSubmit}</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='bg-slate-100 flex justify-between rounded-lg p-4 mb-4' onClick={handleAfternoon}>
                        <h1 className="text-xl flex font-medium">Lunch Special<span><FireIcon className="w-5 text-orange-400" /></span></h1>
                        <ChevronDownIcon className="w-7" />
                    </div>
                    <div className={afternoon ? "flex-col bg-slate-100 p-4 mb-4 " : 'hidden'}>
                        <Select styles={colourStyles} className="w-[150px] text-center xl:mx-20  font-medium my-4" options={mealNumList} placeholder={'Select Meal No'} onChange={selectAfterMealNum} />
                        <div className="flex-col xl:mx-20">
                            {
                                afterFoodNum && afterFoodNum.map((e, i) => (
                                    <div key={i} className="mb-4 w-full flex justify-between">
                                        <Select className="w-[150px] border-2 font-medium rounded-lg" options={mealList} placeholder={'Select Meal '} onChange={e => selectAfterMeal(e, i)} />
                                        <Select className="w-[130px] border-2 font-medium rounded-lg" options={priceList} placeholder={'Select Price'} onChange={e => selectAfterPrice(e, i)} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-full flex justify-end">
                            <button onClick={e => handleSubmit(e, 'Afternoon')} className="my-6 bg-slate-900 py-2 px-8 text-2xl font-bold">{afterSubmit}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}