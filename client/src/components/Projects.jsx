import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from "./ProjectCard"
import Loader from './Loader.jsx'
import Error from './Error.jsx'

export default function Projects() {
    const {loading, error, data} = useQuery(GET_PROJECTS)

    if (loading) return <Loader />
    if (error) return <Error error={error} />
  return (
    <div >
        {data.projects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-5" >
                {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ) )}
            </div>
        ) : <p>No projects available to show. You can create a new project. 
              <span className="text-sky-500"> Please add a client before if you have not already added a client.</span></p>}
      
      <div className='my-10  border-b-4 border-green-700'></div>
    </div>
  )
}
