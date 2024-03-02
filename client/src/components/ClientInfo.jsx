import {FaEnvelope, FaPhone, FaIdBadge} from 'react-icons/fa'

export default function ClientInfo({client}) {
  console.log(client)
  return (
    <div className='flex flex-col justify-center items-center mx-auto'>
      <h2 className="mt-4 mb-2 text-xl font-bold text-green-700">Client Information</h2>
      <ul>
        <li>
           <div className='flex items-center mt-4 mb-2 '>
            <FaIdBadge className='text-green-700 font-bold text-2xl mr-2'/> 
            <h3>{client.name}</h3>
          </div>
        </li>
        <li>
          <div className='flex items-center mt-4 mb-2 '>
            <FaEnvelope className='text-green-700 font-bold text-2xl mr-2'/> 
            <h3>{client.email}</h3>
          </div>
        </li>
        <li>
          <div className='flex items-center mt-4 mb-2 '>
            <FaPhone className='text-green-700 font-bold text-2xl mr-2'/> 
            <h3>{client.phone}</h3>
           </div>
        </li>
      </ul>
    </div>
  )
}
