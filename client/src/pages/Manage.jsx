import { NavLink, Outlet } from "react-router-dom"


export default function Manage() {
  const navLinkStyle = ({isActive}) => {
    return {
            borderBottom:  isActive ? "thick solid #15803d" : "thick solid #9ca3af"
    }
  }


  return (
    <div>
      <div  className="flex justify-around mt-4 mb-6">
        <div className="uppercase font-semibold" ><NavLink className="" style={navLinkStyle} to='projects'>Projects</NavLink></div>
        <div className="uppercase font-semibold" ><NavLink className="" style={navLinkStyle} to='clients'>Clients</NavLink></div>
      </div>
      <Outlet />
    </div>
  )
}
