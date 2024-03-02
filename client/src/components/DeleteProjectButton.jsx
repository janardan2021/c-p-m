import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { GET_PROJECTS } from "../queries/projectQueries"
import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/projectMutations"

export default function DeleteProjectButton({projectId}) {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT, 
                  {variables: {id: projectId},
                 onCompleted: () => navigate('/'),
                 refetchQueries: [{query: GET_PROJECTS}]})

   function onDelete() {
         if (window.confirm('Are you sure you want to delete the project?')) {
          deleteProject()
         }
         
   }
  return (
    <div className='w-full bg-green-600 text-white uppercase rounded mb-6 px-10 my-4
    py-4 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
    ease-in-out active:bg-green-800 hover:scale-105 flex justify-center items-center space-x-2'>

      <FaTrash className="" />
      <button className="" onClick={onDelete}> Delete project</button>
      
    </div>
  )
}
