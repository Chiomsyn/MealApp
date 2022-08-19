import { useEffect, useState } from 'react'
import { useTicketsContext } from './useTicketContext';
import { useAuthContext } from './useAuthContext';

export const GetTickets = () => {
    const {tickets, dispatch} = useTicketsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTickets = async () => {
          const response = await fetch('/api/tickets', 
            {headers:{
              'Authorization': `Bearer ${user.token}`
            }})
          const json = await response.json()
    
          if(response.ok){
            dispatch({type: 'SET_TICKETS', payload: json})
          }
        }
    
        if(user) {
         fetchTickets()
        }
      }, [dispatch, user]);

      return [tickets];
}

export const CreateTicket = () => {

  const { dispatch } = useTicketsContext()
  const [error, setError] = useState(null)
  const [successful, setSuccessful] = useState(false)

  const submit = async (ticket, user) => {
    setError(null)

    if(!user){
      setError('You must be logged in')
      return;
    }

    const response = await fetch('api/tickets', {
      method: 'POST',
      body: JSON.stringify(ticket),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
  
    const json = await response.json()
  
    if(!response.ok){
      setError(json.error)
    }
  
    if(response.ok){
      setSuccessful(true)
      setError(null)
      console.log('new workout added', json)
      dispatch({type: 'CREATE_TICKET', payload: json})
    }
  
  }
  
  return { submit, error, successful};
}

// const DeleteTicket = async (id) => {
  
//   const { dispatch } = useTicketsContext()
//   const {user} = useAuthContext()

// const del = async () => {
//   if(!user){
//     return;
//   }
//   const response = await fetch('/api/tickets' + id, {
//     method: 'DELETE'
//   })
//   const json = await response.json()

//   if (response.ok) {
//     dispatch({type: 'DELETE_WORKOUT', payload: json})
//   }
// }

// return del;
// }
