import express from "express";
import { adminController, userController } from "../controllers/index";

const router = express.Router();
const path = "/api/v1/"
router.post(`${path}admin/register`, adminController.register);
router.post(`${path}login`, userController.login);
export default router;