import {useQuery} from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'

import ClientRow from './ClientRow'
import Loader from './Loader'
import Error from './Error'
import { useEffect } from 'react'

export default function Clients() {
   const {loading, error, data} = useQuery(GET_CLIENTS)

 

   if(loading) return <Loader />
   if(error) return <Error error={error} />

  //  useEffect(() => {

  //  }, [data])
  return (
    <div className='px-5 flex flex-col justify-center'>
     <table className=''>
        <thead className='py-10 text-xl text-green-700 border-b-4 border-green-700' >
            <tr>
                <th className=''>Name</th>
                <th className=''>Email</th>
                <th className=''>Phone</th>
                <th className=''>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.clients.length === 0 && <p>No clients to show. Try adding new clients</p>}
            {data.clients.map(client =>(
               <ClientRow key={client.id} client={client}/>
            ) )}
        </tbody>
     </table>
     <div className='my-10 border-b-4 border-green-700'></div>
    </div>
  )
}
