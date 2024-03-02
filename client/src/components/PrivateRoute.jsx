import { Outlet, Navigate } from "react-router"

import { useUserContext } from "../hooks/useUserContext.js"

export default function PrivateRoute() {
    const {state: cpmuser} = useUserContext()
    if(!cpmuser || cpmuser === null) return <Navigate to='/login'/>
    return <Outlet /> 
  
}
