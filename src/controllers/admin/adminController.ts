import { Request, Response } from "express"
import { adminService } from "../../services/index";
import statusMessage from "../../helpers/statusMessage";
const adminController = {
    register: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            await adminService.createUser(data);
            res
                .status(statusMessage.statusCode.created)
                .json(statusMessage.success(data))
        } catch (err: any) {
            res
                .status(statusMessage.statusCode.error)
                .json({ errorMessage: `${err.message}` })
        }
    }
}

export = adminController;