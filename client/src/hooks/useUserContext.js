import { UserContext } from "../contexts/UserContext.js";
import { useContext } from "react";

export const useUserContext = () => {
    // This context gets the value provided by WorkoutsContext, that is {state, dispatch}
    const context = useContext(UserContext)

    if (!context) {
        throw Error('useUsersContext must be used inside a UserContextProvider')
    }
    return context
}