import query from "../../repositories/query";
import { AppDataSource } from "../../app";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import validator from "../../helpers/validator";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: string;
  nisn: string;
}

const service = {
  createUser: async (data: CreateUserData) => {
    try {
      validator.registerUser(data); // Panggil fungsi validasi
      const uuid = uuidv4();
      const hashPassword = await bcrypt.hash(data.password, 10);
      const createUser = await AppDataSource.query(query.insertUser(), [
        uuid,
        data.name,
        data.email,
        hashPassword,
        data.role,
        data.nisn
      ]);
      return createUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};

export = service;