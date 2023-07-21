import express, { NextFunction, Request, Response } from 'express'
import { connect } from './db-connection/connection'
import clientrouter from './routers/client'
import { ApolloServer, gql } from 'apollo-server-express';
import specialization_route from './routers/specialization.route';
import hospitalRoutes from './routers/hospital';


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use('/profile', express.static('uploadsdat/profile'))
app.use('/other', express.static('uploadsdat/other'))
// Middleware to handle errors and respond with a status code and message
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
app.use('/users', clientrouter)
app.use('', specialization_route)
app.use('/hospital', hospitalRoutes)


const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
    },
};

//Graphql Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})
server
    .start()
    .then(res => {
        server.applyMiddleware({ app })
        app.listen({ port: PORT }, () => {
            connect()
            console.log(`🚀 Server is Ready at ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error.message)
    })


