import query from "../../repositories/query";
import { AppDataSource } from "../../app";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import validator from "../../helpers/validator";

interface CreateUserData {
  name: string;
  nisn: string;
  password: string;
  role?: string;
}

const adminService = {
  createUser: async (data: CreateUserData) => {
    try {
      validator.registerUser(data);
      validator.validateParams(data);
      const uuid = uuidv4();
      const hashPassword = await bcrypt.hash(data.password, 10);
      const checkUserByNISN = await AppDataSource.query(query.checkUserByNISN(), [data.nisn]);
      if (checkUserByNISN.length > 0) {
          throw new Error("Data exist.")
      }
      const createUser = await AppDataSource.query(query.insertUser(), [
        uuid,
        data.name,
        data.nisn,
        hashPassword,
        data.role,
      ]);
      return createUser;
    } catch (err: any) {
      if (err.code === "23505") {
        throw new Error(`Duplicate entry: ${err.detail}`);
      }
      throw new Error(err.message);
    }
  },
};

export = adminService;