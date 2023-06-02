import express, { NextFunction, Request, Response } from 'express'
import { connect } from './db-connection/connection'
import clientrouter from './routers/client'

const app = express()

const PORT = process.env.PORT || 4000

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
app.listen(PORT, () => {
    console.log(`Server is runnig on ${PORT}  🚀🚀🚀🚀`)
    connect()
})
