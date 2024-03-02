import { useState } from "react"
// import {FaUser} from 'react-icons/fa'
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useUserContext } from "../hooks/useUserContext.js"

import Error from "./Error.jsx";
import Loader from "./Loader.jsx";

export default function AddClient() {
    const {state: cpmuser} = useUserContext()
    const adminId = (cpmuser === null) ? '' : cpmuser.id
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient, { loading, error }] = useMutation(ADD_CLIENT , 
                                     {variables: {name, email, phone, adminId},
                                      errorPolicy: "none",
                                    //  refetchQueries: [{query: GET_CLIENTS}]
                                     update(cache, {data: {addClient}}){
                                       if (addClient && !error) {
                                        const {clients} = cache.readQuery({query: GET_CLIENTS}) 
                                       cache.writeQuery({
                                        query: GET_CLIENTS,
                                        data: {clients: [...clients, addClient]}
                                       })
                                       }
                                     }}
                                     )

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name, email, phone)
        if(name === '' || email === '' || phone === ''){
            return alert('Please fill in all the fields')
        }
        if (adminId === 'null' || adminId === '') {
            return alert('Please login to continue')
        }
        addClient(name, email, phone, adminId)
        setName('')
        setEmail('')
        setPhone('')

    }
    if (loading) return <Loader />
  return (
    <div className='mx-4'>
        <h2 className="text-2xl font-bold text-green-700">Add a client</h2>
        
        <form onSubmit={onSubmit} className="flex flex-col">
        {error && <Error error={error}/>}
            <div className="mb-2" >
                <label className="block text-xl font-medium mb-1">Name:</label>
                <input className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                        focus:outline-green-700 transition ease-in-out duration-200"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-1">Email:</label>
                <input className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                        focus:outline-green-700 transition ease-in-out duration-200"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-1">Phone:</label>
                <input className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                        focus:outline-green-700 transition ease-in-out duration-200"
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Add Client
           </button>
            
        </form>
    </div>
  )
}
