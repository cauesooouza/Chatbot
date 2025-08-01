import { NextFunction, Request, Response } from "express";
import { config } from "../../config/config.js";
import { GenericError, HttpStatus } from "../errors/GenericError.js";

export const validatePermission = (req: Request, _res: Response, next: NextFunction) => {
    if (req.body.permission !== config.apiPermission) {
        throw new GenericError("Permission denied", HttpStatus.FORBIDDEN);
    }
    next()
}