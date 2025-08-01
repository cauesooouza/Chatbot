import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { LoginInput } from "./auth.schema.js";
import { GenericError } from "../../middleware/errors/GenericError.js";

const authService = new AuthService();

export class AuthController {
    async login(req: Request<{}, {}, LoginInput>, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.setHeader("Authorization", `Bearer ${token}`);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof GenericError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(401).json({ messageError: "Invalid credential" });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                res.status(400).json({ messageError: "Invalid token", statusCode: 400 });
                return;
            }

            const token = authorization.split(' ')[1];
            if (await authService.logout(token)) {
                res.status(200).json({ messageError: "Logout success", statusCode: 200 });
            } else {
                res.status(400).json({ messageError: "Invalid token", statusCode: 400 });
            }
        } catch (error) {
            res.status(400).json({ messageError: "Bad request" });
        }
    }
}