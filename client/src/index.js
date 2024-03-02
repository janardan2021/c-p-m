import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, from} from '@apollo/client'
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { UserContextProvider } from './contexts/UserContext.js';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'


import NotFound from './pages/NotFound'
import Projectpage from './pages/Projectpage.jsx'
import Home from './pages/Home.jsx';
import Manage from './pages/Manage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ClientsPage from './pages/ClientsPage.jsx'
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// import Clients from './components/Clients.jsx';
// import Projects from './components/Projects.jsx';
// import Header from "./components/Header";
// import AddClient from './components/AddClient.jsx';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const httpLink = createHttpLink({
  // uri: '/graphql',
  uri: 'http://localhost:5000/graphql'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('cpmtoken')
  const token = JSON.parse(localStorage.getItem('cpmtoken'));
  
  // return the headers to the context so httpLink can read them
  if(token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  // link: authLink.concat(httpLink),
  // uri: 'http://localhost:5000/graphql',
  // cache: new InMemoryCache()
  cache
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index  element={<Home/>} />
      <Route path='login' element={<LoginPage/>}/> 
      <Route path='signup' element={<SignupPage/>}/> 
      <Route path='' element={<PrivateRoute />}>
          <Route path='manage' element={<Manage/>}>
            <Route index element={<ProjectsPage/>}/>
            <Route path='projects' element={<ProjectsPage/>}/>
            <Route path='clients' element={<ClientsPage/>}/> 
          </Route>
      </Route>
      
       
       <Route path='/projects/:id' element={<Projectpage/>}/>
       {/* <Route path='*' element={<NotFound />}/> */}
       <Route path='*' element={<Home />}/>
    </Route>
    
  )
)






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserContextProvider> 
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
