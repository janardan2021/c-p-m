import Clients from '../components/Clients.jsx';
import AddClient from '../components/AddClient.jsx';
export default function ClientsPage() {
  return (
    <div className='flex flex-col lg:flex-row my-5 px-4 lg:space-x-10'>
      <div className='w-full lg:w-3/5 mx-auto'><Clients /></div>
      <div className='w-full md:w-3/5 mx-auto lg:w-2/5'><AddClient /></div>
    </div>
  )
}