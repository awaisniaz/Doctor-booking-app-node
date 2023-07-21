import { Request, Response } from "express";
import { Hospital } from "../models/hospital";

export const hospitalController = {
    add_hospital: (req: Request, res: Response) => {
        const newHospital = new Hospital(req?.body)
        newHospital?.save().then((data: any) => {
            res.send({ "message": data })

        }).catch((err: any) => {
            res.send({ "message": err?.message })
        })

    }
}