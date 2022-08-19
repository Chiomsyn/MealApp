import { TicketsContext } from '../context/TicketContext';
import { useContext } from 'react';

export const useTicketsContext = () => {
    const context = useContext(TicketsContext)

    if(!context) {
        throw Error('useTicketsContext must be used inside a TicketContextProvider')
    }

    return context
}