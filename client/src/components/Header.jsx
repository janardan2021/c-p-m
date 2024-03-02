import logo from './assets/logo.png'
import { useUserContext } from "../hooks/useUserContext.js"
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'

export default function Header() {
      const {state: cpmuser, dispatch: cpmuserDispatch} = useUserContext()
      const navigate = useNavigate()
      function logout() {
         localStorage.removeItem("cpmuser");
         localStorage.removeItem("cpmtoken");
         
         cpmuserDispatch({type: 'LOGOUT'})
         navigate('/')
     }
  return (
        <div className='flex justify-between items-center bg-green-900 p-5  text-white'>
             <div className='flex items-center' onClick={() => navigate('/')}>
                  <div >
                     <img src={logo} alt="logo" className='h-10 w-full object-cover pl-5'/>
                  </div>
                  <div className='font-bold text-2xl pl-5 cursor-pointer hover:scale-x-105'>C-P-M</div>
             </div>
             <div className='flex'>
                 {!cpmuser && (
                  <div className='px-4 hover:scale-x-105 cursor-pointer'
                  onClick={() => navigate('/login')}>Log in</div>
                 )}
                 {!cpmuser && (
                  <div className='px-4 hover:scale-x-105 cursor-pointer' 
                  onClick={() => navigate('/signup')}>Sign up</div>
                 )}
                 {cpmuser && (
                  <div className='px-4 hover:scale-x-105 cursor-pointer'
                  onClick={() => navigate('/manage')}>Console</div>
                 )}
                 {cpmuser && (
                  <div className='px-4'>Admin - {cpmuser.name}</div>
                 )}
                 {cpmuser && (
                  <div className='px-4 hover:scale-x-105 cursor-pointer'
                  onClick={logout}>Logout</div>
                 )}
             </div>
        </div>
  )
}
