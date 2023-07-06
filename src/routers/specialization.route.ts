import express from 'express';
import specialization_controllers from '../controller/specialization.controller';
import { validations_middleware } from '../middlewares/validations.middleware';

const specialization_route = express.Router()
specialization_route.get('/getAllSpecialization', [validations_middleware?.validateUser], specialization_controllers?.getListOfSpecialization)

export default specialization_route