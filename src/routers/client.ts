import express from 'express';
import client_Controller from '../controller/client.controller';
const clientrouter = express.Router()
clientrouter.post('/login', client_Controller.login)
clientrouter.post('/signup', client_Controller.register)

export default clientrouter