import { useEffect, useState } from 'react'
import { IoIosEye , IoIosEyeOff} from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_USER, SIGNUP_USER } from '../mutations/userMutations';
import { useMutation, useQuery } from "@apollo/client"
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from '../queries/projectQueries.js';

import { useApolloClient } from '@apollo/client';

import { useUserContext } from "../hooks/useUserContext.js"
import Loader from '../components/Loader.jsx';
import Error from '../components/Error.jsx';

export default function LoginPage() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword]= useState(false)
    const {state: cpmuser, dispatch: cpmuserDispatch} = useUserContext()
    const client = useApolloClient()
  
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })
    const {email, password} = formData
   
    function onChange(e){
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value
      } ))
    }

    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER,
        {variables: {email, password} , errorPolicy: "all"})

    function onSubmitSignIn(e) {
        e.preventDefault()
        
        console.log('Signing in')

        if(email === '' || password === ''){
            return alert('Please fill in all the fields')
        }
        loginUser(email, password)
      }

      useEffect(() => {

        if(cpmuser) {
          navigate('/')
        } else 
        if (data && !error) {
          client.resetStore()
          localStorage.setItem('cpmuser' , JSON.stringify(data.loginUser))
          localStorage.setItem('cpmtoken' , JSON.stringify(data.loginUser.token))
          
          cpmuserDispatch({type: 'LOGIN', payload: data.loginUser})
          
          // navigate('/')
        }
      }, [data, error, cpmuserDispatch, cpmuser, navigate])

  if (loading) return <Loader />
  return (
    <div>
      <div className='w-4/5 mx-auto sm:w-3/5 lg:w-2/5 my-8 '>
        
          {error && (
                <Error error={error} /> 
             )}
          <form onSubmit={onSubmitSignIn}>

           <input className='w-full p-2 mb-4 border-2 border-gray-500 rounded-md text-gray-700
                                 focus:outline-green-700 transition ease-in-out duration-200 ' 
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={onChange} />


           <div className='relative mb-6'>
            <input className='w-full p-2 border-2 border-gray-500 rounded-md text-gray-700
                          focus:outline-green-700 transition ease-in-out duration-200' 
                    type={showPassword ? "text" : "password"}
                    id='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={onChange} />
            {showPassword ? <IoIosEye className='absolute right-3 top-3 text-xl cursor-pointer'
                                  onClick={() => setShowPassword(!showPassword)}/> 
                          : <IoIosEyeOff className='absolute right-3 top-3 text-xl cursor-pointer' 
                                 onClick={() => setShowPassword(!showPassword)}/> }     
           </div> 

           <div className='flex justify-between whitespace-nowrap text-sm
                  sm:text-lg mb-6'>
            <p>Don't have an account?
              <Link to='/signup' className='text-green-700 hover:text-green-500 underline
                                   tranasition duration-200 ease-in-out ml-1'>Register</Link>
            </p>
            
           </div>
           
           <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Sign In
           </button>


          </form>
        </div>
    </div>
  )
}
