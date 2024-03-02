import {gql} from '@apollo/client'

const ADD_PROJECT = gql`
mutation AddProject($name: String!, $description: String!,
                  $status: ProjectStatus!, $clientId: ID!, $adminId: ID!) {
  addProject(name: $name, description: $description, 
            status: $status, clientId: $clientId, adminId: $adminId){
    id
    name
    description
    status
    client {
        id
        name
        email
        phone
    }
    admin {
      id
      name
    }
    createdAt
    updatedAt
  }
}`

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
        id
    }
  }
`

const UPDATE_PROJECT = gql`
mutation UpdateProject($name: String!, $description: String!,
                  $status: ProjectStatusUpdate!, $id: ID!, $adminId: ID!) {
  updateProject(name: $name, description: $description, 
            status: $status, id: $id, adminId: $adminId){
    id
    name
    description
    status
    client {
        id
        name
        email
        phone
    }
    admin {
      id
      name
    }
    createdAt
    updatedAt
  }
}`

export {ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT}