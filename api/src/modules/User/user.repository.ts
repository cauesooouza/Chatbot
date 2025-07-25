import { AppDataSource } from "../../data/data-source.js";
import { User } from "./user.entity.js";

export const userRepository = AppDataSource.getRepository(User);
export type userRepository = typeof userRepository;