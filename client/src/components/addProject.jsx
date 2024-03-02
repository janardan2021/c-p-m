import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { useUserContext } from "../hooks/useUserContext.js"


import Loader from '../components/Loader.jsx'
import Error from "./Error.jsx";

export default function AddProject() {
    const {state: cpmuser} = useUserContext()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    // const [adminId, setAdminId] = useState((cpmuser === null) ? '' : cpmuser.id)
    const adminId = (cpmuser === null) ? '' : cpmuser.id

    // console.log(adminId)
    const [status, setStatus] = useState("new")

  

    const [addProject, {loading, error }] = useMutation(ADD_PROJECT, 
                                       {variables: {name, description, clientId, status, adminId},
                                       errorPolicy: "none",
                                       update(cache, {data: {addProject}}){
                                            if(addProject && !error) {
                                                const {projects} = cache.readQuery({query: GET_PROJECTS}) 
                                            cache.writeQuery({
                                            query: GET_PROJECTS,
                                            data: {projects: [...projects, addProject]}
                                            })
                                            }
                                            }
    })
 
    const {loading: clientsLoading, data:clientsData, error: clientsError} = useQuery(GET_CLIENTS)
    // const [addClient] = useMutation(ADD_CLIENT , 
    //                                  {variables: {name, email, phone},
    //                                 //  refetchQueries: [{query: GET_CLIENTS}]
    //                                  update(cache, {data: {addClient}}){
    //                                    const {clients} = cache.readQuery({query: GET_CLIENTS}) 
    //                                    cache.writeQuery({
    //                                     query: GET_CLIENTS,
    //                                     data: {clients: [...clients, addClient]}
    //                                    })
    //                                  }}
    //                                  )

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('form submitted')
        if(name === '' || description === '' || status === ''){
            return alert('Please fill in all the fields')
        }
        if (adminId === 'null' || adminId === '') {
            return alert('Please login to continue')
        }
        addProject(name, description, clientId, status, adminId)
        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')

    }

    if (clientsLoading) return <Loader />
    if (clientsError) return <Error error={clientsError}/>
    if (loading) return <Loader />
  return (
    <div className="mx-4">
         <h1 className="text-2xl font-semibold text-green-700">Add a project for your client</h1>

        <form onSubmit={onSubmit}  id="myForm"  className=''>
            {error && <Error error={error}/>}
           <div className="flex flex-col">
            <div className="mb-2">
                <label className="block text-xl font-medium mb-1">Name:</label>
                <input className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                                 focus:outline-green-700 transition ease-in-out duration-200"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-1">Description:</label>
                <textarea className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                                 focus:outline-green-700 transition ease-in-out duration-200 h-20"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </textarea>
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-1">Status</label>
                <select value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                        focus:outline-green-700 transition ease-in-out duration-200">
                   <option value='new'>Not Started</option>
                   <option value='progress'>In progress</option>
                   <option value='completed'>Completed</option>
                </select>
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-1">Select client</label>
                <select value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="block w-full p-2 mb-2 border-2 border-gray-500 rounded-md text-gray-700
                        focus:outline-green-700 transition ease-in-out duration-200">
                   <option value=''>Select Client</option>
                   {clientsData.clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                   ))}
                </select>
            </div>
            <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Add Project
           </button>
           </div>


           
            
        </form>
    </div>
   
  )
}
