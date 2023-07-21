import express from 'express';
import { hospitalController } from '../controller/hospital.controller';
const hospitalRoutes = express.Router()
hospitalRoutes.post('/add_hospital', hospitalController?.add_hospital)

export default hospitalRoutes