import express from 'express'; 
import 'dotenv/config'
const port = process.env.PORT || 5000
import { connectDB } from './config/db.js';

import expressPlayground from 'graphql-playground-middleware-express'
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema.js';


const app = express();
connectDB()

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
app.all('/graphql', createHandler({ schema, graphiql: true}));
app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))

app.listen(port, console.log(`Listening to port ${port}`));
