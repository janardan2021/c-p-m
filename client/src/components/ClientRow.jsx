import {FaTrash} from 'react-icons/fa'

import { useMutation } from '@apollo/client'
import {DELETE_CLIENT} from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import {GET_PROJECTS} from '../queries/projectQueries'

export default function ClientRow({client}) {
  console.log(client.id)
  const [deleteClient] = useMutation(DELETE_CLIENT, 
                                     {variables: {id: client.id},
                                     refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
                                    //  update(cache, {data: {deleteClient}}){
                                    //   const {clients} = cache.readQuery({query: GET_CLIENTS})
                                    //   cache.writeQuery({
                                    //     query: GET_CLIENTS,
                                    //     data: {
                                    //       clients: clients.filter(client => client.id !== deleteClient.id)
                                    //     }
                                    //   })
                                    //  }
                         })

  function onDelete() {
  if (window.confirm('Are you sure you want to delete the client?')) {
    deleteClient()
  }
  
}
  return (
    <tr className='text-md font-semibold'>
        <td className='px-5 xl:px-10 py-2'>{client.name}</td>
        <td className='px-5 lg:px-10 py-2'>{client.email}</td>
        <td className='px-5 xl:px-10 py-2'>{client.phone}</td>
        <td className='px-5 xl:px-10 py-2 text-center text-red-700'>
            <button onClick={onDelete}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
