import foodImg from '../../assests/food2.jpg';

const TicketDetails = ({ ticket }) => {

  const getDate = () => {
    const d = new Date(ticket.createdAt);
    return d.toLocaleDateString();
  }


  
    return (
        <div className='flex justify-start h-[170px] bg-slate-100 rounded-xl p-8 '>
        <img className='w-24 flex-wrap  lg:w-32 rounded-xl border-2 border-white' src={foodImg} alt="/" width="384"/>
        <div className='bg-white w-[240px] lg:w-[400px] rounded-r-2xl'>
        <div className='grid grid-cols-2'>
          <p className='mt-5 ml-4 lg:ml-6 text-xl'>Food: <span className='font-bold'>{ticket.food}</span></p>
          <p className='mt-5 ml-4 lg:ml-6 text-xl'> No: <span className='font-bold'>{ticket.ticketNo}</span></p>
          <p className='mt-2 ml-4 lg:ml-6 text-xl'>Price: <span className='font-bold'>&#8358; {ticket.amount}</span></p>
          <p className='mt-2 ml-4 lg:ml-6 text-xl'>Paid: <span className='font-bold'>&#8358; {ticket.amount - 300}</span></p>
        </div>
        <p className='mt-2 ml-4 lg:ml-6 text-xl'> Date: <span className='font-bold'>{getDate()}</span></p>
        </div>
      </div>
    )
}

export default TicketDetails