
import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext()

const initialUser = localStorage.getItem('cpmuser') 
                  ? JSON.parse(localStorage.getItem('cpmuser')) 
                  : null;

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state       
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialUser)

    console.log('UsersContext state', state)

     useEffect(() => {
        
    }, [dispatch])


    return(
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}