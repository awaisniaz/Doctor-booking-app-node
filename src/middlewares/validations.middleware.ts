import { Request, Response, NextFunction } from "express";
import { utilities } from "../utilities/utils";
export const validations_middleware = {
    validateUser: async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.headers['authorization']
        utilities?.validateToken(token).then((data: any) => {
            req['email'] = data
            next()
        }).catch((err: Error) => {
            return res.send({ message: "Validate Issue" })
        })

    }
}