import { createContext, useReducer } from "react";

export const TicketsContext = createContext();

export const ticketsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TICKETS':
            return {
                tickets: action.payload
            }
        case 'CREATE_TICKET':
            return {
                tickets: [action.payload, ...state.tickets]
            }
        case 'DELETE_TICKET':
            return {
                tickets: state.tickets.filter((t) => t._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TicketContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ticketsReducer, {
        tickets: null
    })

    return (
        <TicketsContext.Provider value={{...state, dispatch}}>
            { children }
        </TicketsContext.Provider>
    )
}