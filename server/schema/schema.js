import {projects, clients} from '../sampleData.js'

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';


const ClientType = new GraphQLObjectType({
      name: 'Client',
      fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
      }),
    })

    const ProjectType = new GraphQLObjectType({
        name: 'Project',
        fields: () => ({
          id: {type: GraphQLID},
          name: {type: GraphQLString},
          description: {type: GraphQLString},
          status: {type: GraphQLString},
          client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            }
          }
        }),
      })    

const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            clients:{
                type: new GraphQLList(ClientType),
                resolve(parent, args) {
                    return clients
                }
            },
            client: {
                type: ClientType,
                args: {id: {type: GraphQLID}},
                resolve(parent, args) {
                    return clients.find(client => client.id === args.id)
                }
            },
            projects:{
                type: new GraphQLList(ProjectType),
                resolve(parent, args) {
                    return projects
                }
            },
            project: {
                type: ProjectType,
                args: {id: {type: GraphQLID}},
                resolve(parent, args) {
                    return projects.find(project => project.id === args.id)
                }
            }
        }
  })

const schema = new GraphQLSchema({
    query: RootQuery
})

export {schema}