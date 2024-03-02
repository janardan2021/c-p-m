import {gql} from '@apollo/client'

const GET_CLIENTS = gql`
   query getClients {
    clients{
        id
        name
        email
        phone
        adminId
        createdAt
        updatedAt
    }
   }
`

export {GET_CLIENTS}