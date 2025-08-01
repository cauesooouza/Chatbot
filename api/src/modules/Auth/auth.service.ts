import { User } from "../User/user.entity.js";
import { Password } from "../../utils/Password.js";
import { config } from "../../config/config.js";
import jwt from 'jsonwebtoken';
import { AppDataSource } from "../../data/data-source.js";
import { GenericError } from "../../middleware/errors/GenericError.js";

const activeSession = new Map<string, string>();

export class AuthService {
    async login(email: string, password: string): Promise<string> {
        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne();

        if (!user) throw new GenericError("Invalid email or password", 401);

        const isValid = await Password.verifyPassword(password, user.password);

        if (!isValid) throw new GenericError("Invalid email or password", 401);

        if (activeSession.has(user.id)) return activeSession.get(user.id)!;

        const token = jwt.sign({ userId: user.id }, config.apiSecret, { expiresIn: "6h" });
        activeSession.set(user.id, token);
        return token;
    }

    async logout(token: string): Promise<boolean> {
        for (const [userId, sessionToken] of activeSession)
            if (sessionToken === token) {
                activeSession.delete(userId);
                return true;
            }

        return false;
    }

    static isSessionActive(token: string): boolean {
        for (const sessionToken of activeSession.values()) {
            if (sessionToken === token) return true;
        }
        return false;
    }
}