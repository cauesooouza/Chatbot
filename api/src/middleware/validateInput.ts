import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateInput = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            let errorMsg = {
                statusCode: 400,
                messageError: error.message
            }
            res.status(400).json(errorMsg);
            return;
        }
        res.status(500).send(`Uncaugth error ${error}`);
        return;
    }
}