import { Request, Response } from "express";
import { Client, Specialization } from "../models/client";
const client_Controller = {
    login: (req: Request, res: Response) => { },
    register: (req: Request, res: Response) => {
        const { client, specialization } = req.body;
        const newClient = new Client(client);
        newClient
            .save()
            .then((data) => {
                console.log(data)
                console.log(data?._id)
                if (data?.type == "user") {
                    res.status(201).json({ message: "User Created Successfully" });
                } else {
                    let specializationlist = specialization?.split(',')?.map((item: String) => {
                        return {
                            name: item,
                            doctor_id: data?._id
                        }
                    })
                    Specialization.insertMany(specializationlist)
                        .then((data: any) => {
                            res.status(201).json({ message: "User Created Successfull" });
                        })
                        .catch((err: Error) => {
                            res.status(500).json({ message: err.message });
                        });
                }
            })
            .catch((err: Error) => {
                res.status(500).json({ message: err.message });
            });
    },
};

export default client_Controller;
