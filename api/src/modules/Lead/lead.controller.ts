import { Request, Response } from "express";
import { leadRepository } from "./lead.repository.js";
import { LeadService } from "./lead.service.js";
import { CreateLeadInput, UpdateLeadInput } from "./lead.schema.js";
import { QueryFailedError } from "typeorm";
import { ParamsId } from "../../utils/types.js";
import { GenericServiceError } from "../../errors/GenericServiceError.js";

const leadService = new LeadService(leadRepository);

export class LeadController {
    async create(req: Request<{}, {}, CreateLeadInput>, res: Response): Promise<void> {
        try {
            const leadInput = req.body;
            const newLead = await leadService.create(leadInput);
            res.status(201).json(newLead);

        } catch (error) {
            if (error instanceof QueryFailedError) {
                const errorMsg = {
                    statusCode: 400,
                    messageError: error.message
                }

                res.status(400).json(errorMsg);
                return;
            }

            if (error instanceof GenericServiceError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(500).json({ statusCode: 500, messageError: "Internal server error" });
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            const leads = await leadService.getAll();
            res.status(200).json(leads);
        } catch (error) {
            res.status(500).json({ statusCode: 500, messageError: "Internal server error" });
        }
    }

    async getById(req: Request<ParamsId>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const lead = await leadService.getById(Number(id))
            res.status(200).json(lead);

        } catch (error) {
            if (error instanceof GenericServiceError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(500).json({ statusCode: 500, error })
        }
    }

    async update(req: Request<{}, {}, UpdateLeadInput>, res: Response): Promise<void> {
        try {
            const { id, lastInteraction } = req.body;
            const lead = await leadService.updateInteraction({ id, lastInteraction });
            res.status(200).json(lead);

        } catch (error) {
            if (error instanceof GenericServiceError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }
            res.status(500).json({ statusCode: 500, error })
        }
    }

    async delete(req: Request<ParamsId>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const lead = await leadService.delete(id);
            res.status(204).json(lead);

        } catch (error) {
            if (error instanceof GenericServiceError) {
                res.status(error.statusCode)
                    .json({
                        statusCode: error.statusCode,
                        messageError: error.message,
                    });

                return;
            }

            res.status(500).json({ statusCode: 500, error })
        }
    }
}