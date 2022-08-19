import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext';
import { useMealsContext } from './useMealContext';

export const GetMeals = () => {
    const {meals, dispatch} = useMealsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('/api/meals',
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                const json = await response.json()

                if(response.ok){
                    dispatch({type: 'SET_MEALS', payload: json})
                }
        }
        if(user) {
            fetchMeals()
        }
    }, [dispatch, user]);

    return [meals];
}

export const GetMeal = () => {
    const {meals, dispatch} = useMealsContext()
    const {user} = useAuthContext()


    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(`/api/meals/:createdAt`,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                const json = await response.json()

                if(response.ok){
                    dispatch({type: 'SET_MEALS', payload: json})
                }
        }
        if(user) {
            fetchMeals()
        }
    }, [dispatch, user]);

    return [meals];
}



export const CreateMeal = () => {
    const { dispatch } = useMealsContext()
    const [error, setError] = useState(null)
    const [successful, setSuccessful] = useState(false)

    const submit = async (meal, user) => {
        setError(null)

        if(!user){
          setError('You must be logged in')
          return;
    }

    const response = await fetch('api/meals', {
        method: 'POST',
        body: JSON.stringify(meal),
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
        console.log('new meal added', json)
        dispatch({type: 'CREATE_MEAL', payload: json})
      }
    }
    
    return { submit, error, successful};
}


export const UpdateMeal = () => {
    const { dispatch } = useMealsContext()
    const [updateError, setUpdateError] = useState(null)
    const [updateSuccessful, setUpdateSuccessful] = useState(false)

    const update = async (meal, user, jobId) => {
        setUpdateError(null)

        if(!user){
          setUpdateError('You must be logged in')
          return;
    }

    const response = await fetch('api/meals/' + jobId, {
        method: 'PATCH',
        body: JSON.stringify(meal),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
    
      const json = await response.json()
    
    if(!response.ok){
        setUpdateError(json.error)
      }
    
      if(response.ok){
        setUpdateSuccessful(true)
        setUpdateError(null)
        console.log('new meal updated', json)
        dispatch({type: 'CREATE_MEAL', payload: json})
      }
    
    }
    
    return { update, error: updateError, updateSuccessful};
}