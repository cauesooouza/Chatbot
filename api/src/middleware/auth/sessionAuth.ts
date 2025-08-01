import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../modules/Auth/auth.service.js";
import { GenericError, HttpStatus } from "../errors/GenericError.js";
import jwt from 'jsonwebtoken';
import { config } from "../../config/config.js";

export const sessionAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new GenericError("Token expired or invalid", HttpStatus.UNAUTHORIZED);
    }

    jwt.verify(token, config.apiSecret)
    const isActive = AuthService.isSessionActive(token);
    if (!isActive) throw new GenericError("Token expired or invalid 00", HttpStatus.UNAUTHORIZED);
    next();
}