import { Request, Response } from "express"
import service from "../../services/admin/admin";
import statusMessage from "../../helpers/statusMessage";
const controller = {
    register: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            await service.createUser(data);
            res
            .status(statusMessage.statusCode.created)
        } catch (err: any) {
            console.log(err)
            res
            .status(statusMessage.statusCode.error)
            .json(err.message)
        }
    }
}

export = controller;