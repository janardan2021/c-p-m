import {  useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectForm from "../components/EditProjectForm"
import Loader from "../components/Loader"
import Error from "../components/Error"

export default function Projectpage() {
  const {id} = useParams()
  const {loading, error, data} = useQuery(GET_PROJECT, 
                     {
                      variables: {id}
                     })

  if (loading) return <Loader />  
  if (error) return <Error error={error}/>             
  return (
    <div>
      {!loading && !error && 
        <div className="flex flex-col items-center mt-5">
          
          <div className="flex flex-col items-center md:flex-row md:justify-center w-full md:space-x-4 ">

          <div className="w-4/5 md:w-2/5">
                <h2 className="mt-4 mb-2 text-xl font-bold text-green-700">{data.project.name}</h2>
                <h3 className="mt-4 mb-2 font-semibold border-b-2 border-green-700">Description</h3>
                <p>{data.project.description}</p>
                <h3 className="mt-4 mb-2 font-semibold border-b-2 border-green-700">Status</h3>
                <p>{data.project.status}</p>

                <div className=" flex space-x-2 my-2">
                  <p className="font-semibold text-sm">
                    <span className="text-green-500">Created on: </span>
                    {data.project.createdAt}
                  </p>
                  <p className="font-semibold text-sm">
                    <span className="text-sky-500">Last updated on: </span>
                    {data.project.updatedAt}
                  </p>
                </div>

                <DeleteProjectButton projectId={data.project.id}/>
          </div>

          <div className="w-4/5 md:w-2/5">
            <ClientInfo client= {data.project.client} />
          </div>

          </div>


          <div className="w-4/5 md:w-3/5">

            <EditProjectForm project={data.project} />
            
          </div>
        </div>
      }
    </div>
  )
}
