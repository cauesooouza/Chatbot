import { User } from "../User/user.entity.js";
import { Password } from "../../utils/Password.js";
import { config } from "../../config/config.js";
import jwt from 'jsonwebtoken';
import { AppDataSource } from "../../data/data-source.js";
import { GenericServiceError } from "../../errors/GenericServiceError.js";

const activeSession = new Set<string>();

export class AuthService {
    async login(email: string, password: string): Promise<string> {
        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne();

        if (!user) throw new GenericServiceError("Invalid email or password", 401);

        const isValid = await Password.verifyPassword(password, user.password);

        if (!isValid) throw new GenericServiceError("Invalid email or password", 401);

        const token = jwt.sign({ userId: user.id }, config.apiSecret, { expiresIn: "1h" });
        activeSession.add(token);
        return token;
    }

    async logout(token: string): Promise<boolean> {
        if (await AuthService.isSessionActive(token)) {
            activeSession.delete(token);
            return true;
        }

        return false;
    }

    static async isSessionActive(token: string): Promise<boolean> {
        return activeSession.has(token);
    }
}