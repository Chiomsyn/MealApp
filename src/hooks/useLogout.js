import { useAuthContext } from "./useAuthContext";
import { useTicketsContext } from "./useTicketContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: ticketDispatch } = useTicketsContext()

    const logout = () => {

        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        ticketDispatch({type: 'SET_TICKETS', payload: null})
    }

    return {logout}
}