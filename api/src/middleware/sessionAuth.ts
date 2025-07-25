import { NextFunction, Request, Response } from "express";
import { AuthService } from "../modules/Auth/auth.service.js";

export const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !(AuthService.isSessionActive(token))) {
        res.status(401).json({
            statusCode: 400,
            messageError: "Session expired"
        });
        return;
    }
    next();
}