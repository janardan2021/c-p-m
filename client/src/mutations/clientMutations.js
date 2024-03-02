import {gql} from '@apollo/client'


const ADD_CLIENT = gql`
mutation AddClient($name: String!, $email: String!, $phone: String!, $adminId: ID!) {
  addClient(name: $name, email: $email, phone: $phone, adminId: $adminId){
    id
    name
    email
    phone
    adminId
  }
}`

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
        id
        name
        email
        phone
    }
  }
`


export {ADD_CLIENT, DELETE_CLIENT}