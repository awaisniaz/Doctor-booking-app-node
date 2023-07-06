import { Request, Response } from "express";
import { Specialization } from "../models/client";
const specialization_controllers = {
    getListOfSpecialization: async (req: Request, res: Response) => {
        Specialization?.find().then(data => {
            res.status(200).send({ message: "Data Found", data: data })
        }).catch((err: Error) => {
            res.status(500).send({ message: err?.message, data: [] })
        })

    }
};
export default specialization_controllers;
