import express from 'express';
import multer from 'multer';
import client_Controller from '../controller/client.controller';
import { validations_middleware } from '../middlewares/validations.middleware';
import upload from '../multer-configuration/index';
const clientrouter = express.Router()
clientrouter.post('/login', client_Controller.login)
clientrouter.post('/signup', client_Controller.register)
clientrouter.patch('/updateprofile', validations_middleware?.validateUser, client_Controller?.update_profile)
clientrouter.patch('/updateImage', [validations_middleware?.validateUser, (req: any, res: any, next: any) => {
    upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'otherImages' }])(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            // Multer error occurred
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Other error occurred
            return res.status(500).json({ error: err.message });
        }
        next();
    });
}

], client_Controller?.update_image)

export default clientrouter