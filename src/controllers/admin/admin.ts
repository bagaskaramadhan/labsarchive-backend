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
            .json(statusMessage.success(data))
        } catch (err: any) {
            console.log(err)
            res
            .status(statusMessage.statusCode.error)
            .json({errorMessage: `${err.message}`})
        }
    }
}

export = controller;