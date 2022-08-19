import { createContext, useReducer } from "react";

export const MealsContext = createContext();

export const mealReducer = (state, action) => {
    switch(action.type){
        case 'SET_MEALS':
            return {
                meals: action.payload
            }
        case 'CREATE_MEAL':
            return {
                meals: [action.payload, ...state.meals]
            }
        default:
            return state
    }
}

export const MealContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(mealReducer, {
        meals: null
    })

    return (
        <MealsContext.Provider value={{...state, dispatch}}>
            { children }
        </MealsContext.Provider>
    )
}