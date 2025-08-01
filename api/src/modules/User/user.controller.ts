import { Request, Response } from "express";
import { userRepository } from "./user.repository.js";
import { CreateUserInput } from "./user.schema.js";
import { UserService } from "./user.service.js";
import { GenericError, HttpStatus } from "../../middleware/errors/GenericError.js";
import { QueryFailedError } from "typeorm";
import { EmailQuery } from "../../utils/types.js";

const userService = new UserService(userRepository);

export class UserController {
    async create(req: Request<{}, {}, CreateUserInput>, res: Response): Promise<void> {
        try {
            const userInput = req.body;
            const newUser = await userService.create(userInput);
            res.status(HttpStatus.CREATED).json(newUser);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                const errorMsg = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    messageError: error.message
                }

                res.status(HttpStatus.BAD_REQUEST).json(errorMsg);
                return;
            }

            if (error instanceof GenericError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, messageError: "Internal server error" });
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAll();
            res.status(HttpStatus.OK).json(users);
        } catch (error) {
            if (error instanceof GenericError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, messageError: "Internal server error" });
        }
    }

    async getByEmail(req: Request<{}, {}, {}, EmailQuery>, res: Response): Promise<void> {
        try {
            const { email } = req.query;
            const user = await userService.getByEmail(email);
            res.status(HttpStatus.OK).json(user);
        } catch (error) {
            if (error instanceof GenericError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, messageError: "Internal server error" });
        }
    }
}