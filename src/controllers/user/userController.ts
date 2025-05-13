import { Request, Response } from "express";
import statusMessage from "../../helpers/statusMessage";
import { userService } from "../../services";

const userController = {
    login: async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await userService.login(data);
            res
            .status(statusMessage.statusCode.success)
            .json(statusMessage.success(result))
        } catch (err: any) {
            res
                .status(statusMessage.statusCode.error)
                .json({ errorMessage: `${err.message}` })
        }
    }
}

export = userController;