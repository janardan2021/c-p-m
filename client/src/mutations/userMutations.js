import {gql} from '@apollo/client'


const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password){
    id
    name
    email
    token
  }
}`

const SIGNUP_USER = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
        id
        name
        email
        token
    }
  }
`


export {LOGIN_USER, SIGNUP_USER}