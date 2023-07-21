import { Request, Response, NextFunction } from "express";
import { utilities } from "../utilities/utils";
import multer from 'multer';
import upload from '../multer-configuration/index';
import fs from 'fs'
export const validations_middleware = {
    validateUser: async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.headers['authorization']
        utilities?.validateToken(token).then((data: any) => {
            req['email'] = data
            next()
        }).catch((err: Error) => {
            return res.send({ message: err?.message })
        })

    },
    validatePhoto: (req: any, res: any, next: any) => {
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
    },
    createFolder: (req: any, res: any, next: any) => {
        const folderPath = './uploadsdat';
        fs.stat(folderPath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.mkdir(folderPath, err => {
                        if (err) {
                            return res.send({ "message": err?.message })
                        }
                        else {
                            fs.mkdir(folderPath + "/" + "profile", err => {
                                if (err) {
                                    return res.send({ "message": err?.message })
                                }
                            })
                            fs.mkdir(folderPath + "/" + "other", err => {
                                if (err) {
                                    return res.send({ "message": err?.message })
                                }
                            })

                            next()
                        }
                    })
                } else {
                    next()
                }
            } else {
                next()
            }
        })
    }
}