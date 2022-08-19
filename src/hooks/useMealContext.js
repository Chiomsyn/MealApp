import { MealsContext } from "../context/MealContext";
import { useContext } from "react";

export const useMealsContext = () => {
    const context = useContext(MealsContext)

    if(!context) {
        throw Error('useTicketsContext must be used inside a TicketContextProvider')
    }

    return context
}