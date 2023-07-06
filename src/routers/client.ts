import express from 'express';
import client_Controller from '../controller/client.controller';
import { validations_middleware } from '../middlewares/validations.middleware';
const clientrouter = express.Router()
clientrouter.post('/login', client_Controller.login)
clientrouter.post('/signup', client_Controller.register)
clientrouter.patch('/updateprofile', validations_middleware?.validateUser, client_Controller?.update_profile)

export default clientrouter