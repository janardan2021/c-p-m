import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { useUserContext } from "../hooks/useUserContext.js"
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";

export default function EditProjectForm({project}) {
    const {state: cpmuser} = useUserContext()
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('new')
    // const [adminId, setAdminId] = useState((cpmuser === null) ? '' : cpmuser.id)
    const adminId = (cpmuser === null) ? '' : cpmuser.id

    const [updateProject , {error, loading}] = useMutation(UPDATE_PROJECT, 
                            {variables: {id: project.id, name, description, status, adminId},
                            errorPolicy: "all",
                           refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}]
                    })

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('form submitted')
        if(name === '' || description === '' || status === ''){
            return alert('Please fill in all the fields')
        }
        if (adminId === 'null' || adminId === '') {
            return alert('Please login to continue')
        }
        updateProject(name, description, status, adminId)

    }
if (loading) return <Loader />
  return (
    <div className='mx-4'>
      <h2 className="text-2xl font-semibold text-green-700">Edit project details</h2>
        
        <form onSubmit={onSubmit} className="flex flex-col">
            {error && (
                <Error error={error} />
            )}
            <div className="mb-2">
                <label className="block text-xl font-medium mb-2">Name</label>
                <input className="block w-full p-2 mb-4 border-2 border-gray-500 rounded-md text-gray-700
                                 focus:outline-green-700 transition ease-in-out duration-200"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-2">Description</label>
                <textarea className="block w-full p-2 mb-4 border-2 border-gray-500 rounded-md text-gray-700
                                 focus:outline-green-700 transition ease-in-out duration-200"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </textarea>
            </div>
            <div className="mb-2">
                <label className="block text-xl font-medium mb-2">Status</label>
                <select className="block w-full p-2 mb-4 border-2 border-gray-500 rounded-md text-gray-700
                                 focus:outline-green-700 transition ease-in-out duration-200"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                   <option value='new'>Not Started</option>
                   <option value='progress'>In progress</option>
                   <option value='completed'>Completed</option>
                </select>
            </div>
            <button type='submit'
              className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105'>Edit Project
           </button>
            
        </form>
    </div>
  )
}
