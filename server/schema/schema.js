// import {projects, clients} from '../sampleData.js'
import {Project} from '../models/Project.js'
import {Client} from '../models/Client.js'
import User from '../models/User.js'
// import setCookie from '../utils/setCookie.js'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    // console.log(" Id used to create token", id)
    // console.log(" Secret used to sign",process.env.JWT_SECRET)
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'})
    // console.log(" Token created during using ID", token)
    return token
 }

 const retriveToken =  (context) => {
    if (!context.req.headers.authorization || context.req.headers.authorization === null || context.req.headers.authorization === "") {
        throw Error ('Request not valid, Missing credentials')
    }
    // console.log(context.req.headers.authorization)
    const token = context.req.headers.authorization.split(' ')[1]
    // console.log(" Token sent from the client", token)

    try {
        // console.log(" Secret used to verify",process.env.JWT_SECRET)
        // console.log(jwt.verify(token, process.env.JWT_SECRET))
       const {id} = jwt.verify(token, process.env.JWT_SECRET)
    //    console.log(" Id retrived after verification", id)
       return id
    } catch (error) {
        // console.log(error.message)
        throw Error ('Request is not authorized')
    }
    
}




import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLBoolean,
     GraphQLID, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLError } from 'graphql';


const ClientType = new GraphQLObjectType({
      name: 'Client',
      fields: () => ({
        id: {type: GraphQLID},
        // _id: {type: GraphQLID},
        name: {type: GraphQLString},
        // noname: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
        adminId: {type: GraphQLID},
        createdAt: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                return parent.createdAt.toDateString()
            }},
        updatedAt: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                return parent.updatedAt.toDateString()
            }}
      }),
    })

    const UserType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
          id: {type: GraphQLID},
          _id: {type: GraphQLID},
          name: {type: GraphQLString},
          email: {type: GraphQLString},
          token: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                console.log(parent._id)
                // new ObjectId('65d84c61ea5cab8b83898f85')
                console.log(parent.id)
                // 65d84c61ea5cab8b83898f85
                console.log(parent._id.toString())
                // 65d84c61ea5cab8b83898f85
                const token = createToken(parent.id)
                return token
            }},
        createdAt: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                return parent.createdAt.toDateString()
            }},
        updatedAt: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                return parent.updatedAt.toDateString()
            }}
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
                
                return Client.findById(parent.clientId);
            }
          },
          admin: {
            type: UserType,
            resolve(parent, args) {
                
                return User.findById(parent.adminId);
            }
          },
        //   createdAt: {type: GraphQLString},
        createdAt: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                return parent.createdAt.toDateString()
            }},
          updatedAt: {
            type: GraphQLString,
            resolve(parent, args, context, info) {
                return parent.updatedAt.toDateString()
            }}
        }),
        
      })    

const Queries = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            clients:{
                type: new GraphQLList(ClientType),
                resolve(parent, args, context, info) {
                    try {
                        const id = retriveToken(context)
                        // console.log(id)
                    // return clients
                    // console.log('PRINTINTG THE client CONTEXT HERE', context.req)
                    return Client.find({adminId: id})
                    } catch (error) {
                       throw error 
                    }
                }
            },
            client: {
                type: ClientType,
                args: {id: {type: GraphQLID}},
                resolve(parent, args) {
                    // return clients.find(client => client.id === args.id)
                    try {
                        const id = retriveToken(context)
                        return Client.findById(args.id)
                    } catch (error) {
                       throw error 
                    }
                    
                }
            },
            projects:{
                type: new GraphQLList(ProjectType),
                resolve(parent, args, context, info) {
                    // return projects
                    // console.log('PRINTINTG THE project CONTEXT HERE',context)
                    try {
                        const id = retriveToken(context)
                       return Project.find({adminId: id})
                    } catch (error) {
                       throw error 
                    }
                }
            },
            project: {
                type: ProjectType,
                args: {id: {type: GraphQLID}},
                resolve(parent, args, context) {
                    // return projects.find(project => project.id === args.id)
                    try {
                        const id = retriveToken(context)
                        return Project.findById(args.id)
                    } catch (error) {
                       throw error 
                    }
                }
            }
        }
  })

const Mutations = new GraphQLObjectType({
       name: 'Mutation',
       fields: {
          addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
                adminId: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args, context, info) {

               try {
                const id = retriveToken(context)
                if(id !== args.adminId) {
                    throw Error ('Authentication failed')
                }
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    adminId: id
                    }) 
                    return client.save()
                
               } catch (error) {
                 throw error
               }
            }
          },
          deleteClient: {
            type: ClientType,
            args: {id: {type: GraphQLNonNull(GraphQLID)}},
            resolve(parent, args, context) {
                try {
                    const id = retriveToken(context)
                    Project.deleteMany({clientId: args.id}).then()
                    return Client.findByIdAndDelete(args.id)
                } catch (error) {
                    throw error
                }
            }
          },
          loginUser: {
            type: UserType,
            args: {
                email: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                    const user = User.login(args.email, args.password)
                    return user  
                // console.log('Login request has arrived')
                
                // const token = createToken(user._id)
                // return {...user, token}
                 
                // return new Promise((resolve, reject) => {
                //     User.login(args.email, args.password)
                //         .then((user) => {
                //             resolve(user)
                //         })
                //         .catch((error) => {
                //             reject(error)
                //         })
                //  })
            }
          },
          signupUser: {
            type: UserType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args, context, info) {
                const user = User.signup(args.email, args.password, args.name)
                    //  return new Promise((resolve, reject) => {
                    //     User.signup(args.email, args.password, args.name)
                    //         .then((user) => {
                    //             resolve(user)
                    //         })
                    //         .catch((error) => {
                    //             reject(error)
                    //         })
                    //  })
                    return user
            }
          },
          addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                           'new': {value: 'Not Started'} ,
                           'progress': {value: 'In Progress'} ,
                           'completed': {value: 'Completed'} ,
                        }
                    }),
                    defaultValue: 'Not Started',
                 },
                clientId: {type: GraphQLNonNull(GraphQLID)},
                adminId: {type: GraphQLNonNull(GraphQLID)},
                },
            resolve(parent, args, context, info) {
                try {
                    const id = retriveToken(context)
                    if(id !== args.adminId) {
                        throw Error ('Authentication failed')
                    }
                    const project = new Project({
                        name: args.name,
                        description: args.description,
                        clientId: args.clientId,
                        adminId: id,
                        status: args.status
                       }) 
                    return project.save()
                    
                   } catch (error) {
                     throw error
                   }
            }
           },
           deleteProject: {
            type: ProjectType,
            args: {id: {type: GraphQLNonNull(GraphQLID)}},
            resolve(parent, args, context) {
                try {
                    const id = retriveToken(context)
                    return Project.findByIdAndDelete(args.id)
                } catch (error) {
                    throw Error('User not authorized')
                }
               }
             },
            updateProject: {
            type: ProjectType,
            args: {id: {type: GraphQLNonNull(GraphQLID)},
                    name: {type: GraphQLString},
                    description: {type: GraphQLString},
                    status: {
                        type: new GraphQLEnumType({
                            name: 'ProjectStatusUpdate',
                            values: {
                                'new': {value: 'Not Started'} ,
                                'progress': {value: 'In Progress'} ,
                                'completed': {value: 'Completed'} ,
                            }
                        })
                    },
                    adminId: {type: GraphQLNonNull(GraphQLID)},
                },
            resolve(parent, args, context) {
                try {
                    const id = retriveToken(context)
                    return Project.findByIdAndUpdate(
                        args.id, 
                        {
                            $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                            } 
                        },
                        {new: true}
                        );
                } catch (error) {
                    throw error
                }
                }
            
        }
        }
    });

const schema = new GraphQLSchema({
    query: Queries,
    mutation: Mutations
})

export {schema}