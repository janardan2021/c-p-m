import Projects from '../components/Projects.jsx';
import AddProject from '../components/addProject.jsx';
export default function ProjectsPage() {
  return (
    <div className='flex flex-col lg:flex-row my-5 px-4 lg:space-x-10'>
      
      <div className='w-full lg:w-3/5 mx-auto'><Projects /></div>
      <div className='w-full md:w-3/5 mx-auto lg:w-2/5'><AddProject /></div>

    </div>
  )
}
