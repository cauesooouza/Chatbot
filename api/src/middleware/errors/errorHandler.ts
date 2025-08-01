import { NextFunction, Request, Response } from "express";
import { GenericError, HttpStatus } from "./GenericError.js";
import { QueryFailedError } from "typeorm";

export const errorHandler = (error: any, _req: any, res: Response, _next: NextFunction) => {
    if (error instanceof GenericError) {
        res.status(error.statusCode)
            .json({
                statusCode: error.statusCode,
                messageError: error.message,
            });

        return;
    }

    if (error instanceof QueryFailedError) {
        const errorMsg = {
            statusCode: HttpStatus.BAD_REQUEST,
            messageError: error.message
        }

        res.status(HttpStatus.BAD_REQUEST).json(errorMsg);
        return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        messageError: "Internal Server Error"
    });
}