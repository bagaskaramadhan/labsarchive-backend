import { AppDataSource } from "../../app";
import validator from "../../helpers/validator";
import query from "../../repositories/query";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import serviceENV from "../../config/service";

dotenv.config();


interface LoginData {
    nisn: string;
    password: string;
}

const userService = {
    login: async (data: LoginData) => {
        try {
            validator.validateParams(data);
            const checkUserByNISN = await AppDataSource.query(query.checkUserByNISN(), [data.nisn]);
            if (checkUserByNISN.length == 0) {
                throw new Error("Data not found.")
            }
            const isMatchPassword = await bcrypt.compare(data.password, checkUserByNISN[0].password);
            if (!isMatchPassword) {
                throw new Error("Incorrect Password or NISN.")
            }
            const token = jwt.sign(
                { nisn: data.nisn, role: checkUserByNISN[0].role },
                serviceENV.JWT_SECRET,
                { expiresIn: "1m" }
            )
            return token;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export = userService;