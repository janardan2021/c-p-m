import { Link } from "react-router-dom"

export default function ProjectCard({project}) {
  return (
    <div className="rounded border-r-2 border-b-4 border-gray-500  shadow-md hover:shadow-lg
                   hover:scale-x-105 py-4 px-5 bg-green-100 flex justify-between items-center
                   transition ease-in-out cursor-pointer">

        <div>
        <h2 className="text-xl font-bold text-green-700 py-5">{project.name}</h2>
        <p className="py-3">Status: <strong className={
           project.status === "Not Started" ? "text-red-700"
           : project.status === "In Progress" ? "text-sky-500"
           : "text-green-700"
              }>{project.status}</strong></p>

        <div className=" flex flex-col mt-4">
        <p className="font-semibold text-sm">
           <span className="text-green-500">Created on: </span>
          {project.createdAt}
        </p>
        <p className="font-semibold text-sm">
           <span className="text-sky-500">Last updated on: </span>
          {project.updatedAt}
        </p>
        </div>
        
        </div>

        <div>
            <button className="rounded-md py-1 px-2 text-md font-bold  cursor-pointer
                               border-green-700 border-2 hover:bg-green-700 hover:text-white transition ease-out duration-300">
                {/* <a href={`${project.id}`}>View</a> */}
                <Link to={`/projects/${project.id}`}>View</Link>
            </button>
        </div>
    </div>
  )
}
