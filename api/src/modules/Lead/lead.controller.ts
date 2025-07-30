import { Request, Response } from "express";
import { leadRepository } from "./lead.repository.js";
import { LeadService } from "./lead.service.js";
import { CreateLeadInput, UpdateLeadInput } from "./lead.schema.js";
import { QueryFailedError } from "typeorm";
import { ParamsId } from "../../utils/types.js";
import { GenericError, HttpStatus } from "../../errors/GenericError.js"

const leadService = new LeadService(leadRepository);

export class LeadController {
    async create(req: Request<{}, {}, CreateLeadInput>, res: Response): Promise<void> {
        try {
            const leadInput = req.body;
            const newLead = await leadService.create(leadInput);
            res.status(HttpStatus.CREATED).json(newLead);

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
            const leads = await leadService.getAll();
            res.status(HttpStatus.OK).json(leads);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, messageError: "Internal server error" });
        }
    }

    async getById(req: Request<ParamsId>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const lead = await leadService.getById(Number(id))
            res.status(HttpStatus.OK).json(lead);

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

    async update(req: Request<{}, {}, UpdateLeadInput>, res: Response): Promise<void> {
        try {
            const { id, lastInteraction } = req.body;
            const lead = await leadService.updateInteraction({ id, lastInteraction });
            res.status(HttpStatus.OK).json(lead);

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

    async delete(req: Request<ParamsId>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const lead = await leadService.delete(id);
            res.status(HttpStatus.NO_CONTENT).json(lead);

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