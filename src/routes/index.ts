import express from "express";
import { register } from "../controllers/admin/admin";

const router = express.Router();
const path = "/api/v1/"
router.post(`${path}admin/register`, register);

export default router;