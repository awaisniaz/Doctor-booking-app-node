import { Request, Response } from "express";
import { Client, Specialization } from "../models/client";
import { utilities } from "../utilities/utils";
const client_Controller = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req?.body
        const user = await Client?.findOne({ email: email }).populate('treatment', 'name').exec()
        if (!user) {
            return res.send({ message: "User Not Exist with this email" })
        }
        const validatePassword = await utilities?.validatePassword(user?.password, password)
        if (validatePassword == true) {
            const token = await utilities?.generateToken(user?.email)

            return res.send({
                message: "Successfully found data",
                data: { user: user, token }
            })
        }
        else {
            return res.send({ message: "Incorrect Credentials" })
        }
    },
    register: async (req: Request, res: Response) => {
        const { client, specialization } = req.body;
        const password = await utilities?.generatePassword(client?.password)
        const newClient = new Client({ ...client, password: password });
        newClient
            .save()
            .then((data) => {
                if (data?.type == "user") {
                    res.status(201).json({ message: "User Created Successfully" });
                } else {
                    console.log(data)
                    const specializationlist = specialization?.split(',')?.map((item: string) => {
                        return {
                            name: item,
                            doctor_id: data?._id
                        }
                    })
                    Specialization.insertMany(specializationlist)
                        .then((specializations) => {
                            const specializationIds = specializations?.map((item: any) => {
                                return item?._id
                            })
                            Client?.findByIdAndUpdate({ _id: data?._id }, { treatment: specializationIds }).then(() => {
                                res.status(201).json({ message: "User Created Successfull" });
                            }).catch(err => {
                                res.status(500).json({ message: err.message });
                            })

                        })
                        .catch((err: Error) => {
                            res.status(500).json({ message: err.message });
                        });
                }
            })
            .catch((err: Error) => {
                console.log(err)
                res.status(500).json({ message: err.message });
            });
    },
    update_profile: async (req: Request, res: Response) => {
        console.log(req['email'])
        console.log(req?.body)
        Client?.findOneAndUpdate({ email: req['email']?.data }, req?.body, { new: true })
            .then((data: any) => {
                return res.send({ message: "Update profile successfully", data: data })
            }).catch((err: Error) => {
                return res.send({ message: err?.message })
            })
    }
}

export default client_Controller;
