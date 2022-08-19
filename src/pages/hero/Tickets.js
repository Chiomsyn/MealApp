import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid';
import NavBar from '../../components/hero/Navbar'
// import Select from 'react-select';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { GetTickets, CreateTicket } from '../../hooks/TicketHook';
import TicketDetails from '../../components/ticket/TicketDetails';
import { useAuthContext } from '../../hooks/useAuthContext';

const Tickets = () => {

  const [tickets] = GetTickets();

  const [menuItem, setMenuItem] = useState(" Select Today's Meal");

  const [generate, setGenerate] = useState('no');

  const { submit, error, successful } = CreateTicket()

  const [ticketNo, setTicketNo] = useState(0)

  const [menu, setMenu] = useState(false)

  const { user } = useAuthContext()

  const [afterList, setAfterList] = useState(['','','','',''])

  const handleSubmit = (e) => {
    submitTicket();

  }


  const submitTicket = async () => {
    const ticket = { ticketNo, food: menuItem, user: `${user.email}`, amount: 600 };

    await submit(
      ticket,
      user);

    if (successful) {
      setGenerate('no')
      setMenuItem(" Select Today's Meal")
    }
  }


  const handleTicketNo = () => {
    const min = 1;
    const max = 10000;
    const rand = parseInt(min + Math.random() * (max - min));

    setTicketNo(rand)
  }

  const showALert = () => {
    alert('Please select your food oo!!! before generating ticket')
  }

  const handleClose = (e) => {
    e.preventDefault();
    setMenuItem(" Select Today's Meal");
    setGenerate('no')
  }

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenu(!menu)

  };

  const handleChange = (e, item) => {
    e.preventDefault();
    setMenu(!menu)
    setMenuItem(item)

  }

  function CalcTotal(props) {
    var sum = 0;
    props.tickets.map((ticket) => {
      var paid = ticket.amount - 300;
      sum += paid;
      return ticket
    })
    return sum;
  }

  const handleGenerate = (e) => {
    e.preventDefault();
    handleTicketNo();
    setGenerate('yes');
  }

  const mealList = [
    'Rice & stew',
    'Rice, Stew & Beans',
    'Indomie' ,
    'Egwusi' ,
    'Ogbonno',
    'Okoro',
    'Oha',
    'BitterLeaf',
    'Native Soup'
]

const priceList = [
  '500' ,
  '600' ,
  '700' ,
  '800' ,
  '900' ,
  `1000`,
]

  return (
    <>
      <NavBar />
      <div className='h-full w-full  flex flex-col justify-between'>
        <div className='m-8 mt-20 lg:m-32'>
          <div className='hidden lg:flex justify-between font-bold border-b-2 border-orange-200'>
            <h2 className='text-3xl'>List Of Tickets</h2>
            <h1 className='text-3xl'>Total: &#8358; {tickets && <CalcTotal tickets={tickets} />}</h1>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-[100px] xl:gap-[200px] mt-10'>
            {/*  List */}

            <div className='hidden lg:grid xl:grid-cols-2 xl:w-[800px] lg:w-[450px]'>
              {tickets && tickets.map((ticket, index) => (
                <TicketDetails key={index} ticket={ticket} />
              ))}

            </div>

            {/* genrate */}

            <div className='mx:8 md:mx-20 mt:10 lg:mt-30 relative '>
              <div className={generate !== 'yes' ? 'py-8 px-4 bg-white border-2 shadow-md h-[150px] rounded-xl' : 'py-8 px-4 bg-white border-2 shadow-md h-[180px] rounded-xl'}>
                <div onClick={toggleMenu} className='flex justify-between px-8 py-4 shadow-black border-2 border-slate-900 rounded-xl '>
                  <p className="text-slate-900">
                    {menuItem}</p>
                    <div className='pl-4'><ChevronDownIcon className='w-7'/></div>
                </div>
                <div className={!menu ? 'hidden' : 'flex flex-col px-10 py-3 absolute bg-white w-full drop-shadow-md'}>

                  
                    {afterList && afterList.map((e, i)=>(
                        <div key={i} onClick={click => handleChange(click, mealList[i])} className=' justify-between flex'>
                      <p className='py-3'>{mealList[i]} </p> <div className='px-6'></div> <p className='py-3'>&#8358; { priceList[i]} </p>
                    </div>
                    ))}
                </div>
                <button onClick={menuItem === " Select Today's Meal" ? showALert : handleGenerate} className={generate === "yes" ? 'hidden' : 'my-6 bg-slate-900 p-2 text-2xl font-bold'}> Generate Ticket</button>
                <div className={generate !== 'yes' ? 'hidden' : 'flex mt-4 flex-col'}>
                  <p className='font-medium text-xl'>Ticket-No: <span className='font-bold ml-10 text-2xl'>{ticketNo}</span></p>
                  <div className='flex my-6 justify-between mx-8'>
                    <XIcon onClick={handleClose} className='w-20 text-red-600 rounded-xl px-4 border-2 shadow-sm' />
                    <CheckIcon onClick={handleSubmit} className='w-20 rounded-xl px-4 border-2 text-green-600' />
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-10 lg:hidden'>
                <div className='flex justify-between font-bold border-b-2 border-orange-200'>
                  <h2 className='text-3xl'>List Of Tickets</h2>
                  <h1 className='text-xl'>T/L: &#8358; {tickets && <CalcTotal tickets={tickets} />}</h1>
                </div>
                <div className='mt-4'>
                  {tickets && tickets.map((ticket, index) => (
                    <TicketDetails key={index} ticket={ticket} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Tickets


