import express from 'express'; 
import 'dotenv/config'
import cors from 'cors'
import path from 'path'
const port = process.env.PORT || 5000
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser'

import expressPlayground from 'graphql-playground-middleware-express'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema.js';


const app = express();


app.use(cookieParser())
app.use(cors())

app.all('/graphql', createHandler({ schema, graphiql: true, context: (req, res) => ({req, res})}));
// app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))

const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production') {
    // Provide the static folder that has client side files
    app.use(express.static(path.join(__dirname, '/client/build')))
    // Any route that is not api will be directed to index.html
    app.get('*', (req, res) => 
      res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html'))
    )
}


// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
// app.all('/graphql', createHandler({ schema, graphiql: true, context: (req, res) => ({req, res})}));
// app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))


try {
    connectDB()
    app.listen(port, console.log(`Listening to port ${port}`));
} catch (error) {
    console.log(error)
}

 