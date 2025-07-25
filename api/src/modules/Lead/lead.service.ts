import { DeleteResult, Repository } from "typeorm";
import { CreateLeadInput, UpdateLeadInput } from "./lead.schema.js";
import { Lead } from "./lead.entity.js";
import { GenericServiceError } from "../../errors/GenericServiceError.js";

export class LeadService {
    constructor(private leadRepository: Repository<Lead>) { }

    async create(leadInput: CreateLeadInput): Promise<Lead> {
        const existingLead = await this.leadRepository.findOneBy({ id: leadInput.id });

        if (existingLead) {
            throw new GenericServiceError(`Lead id ${leadInput.id} already exist`, 409)
        }

        const newLead = this.leadRepository.create(leadInput);
        return await this.leadRepository.save(newLead);
    }

    async getAll(): Promise<Lead[]> {
        return await this.leadRepository.find();
    }

    async getById(id: number): Promise<Lead> {
        const lead = await this.leadRepository.findOneBy({ id });

        if (!lead) throw new GenericServiceError(`Lead id ${id} not found`, 404);

        return lead;
    }

    async updateInteraction(updateSchema: UpdateLeadInput): Promise<Lead> {
        const leadToUpdate = await this.leadRepository.findOneBy({ id: updateSchema.id });

        if (!leadToUpdate) throw new GenericServiceError(`Lead id ${updateSchema.id} not found`, 404);

        leadToUpdate.lastInteraction = updateSchema.lastInteraction;
        return await this.leadRepository.save(leadToUpdate);
    }

    async delete(id: string): Promise<DeleteResult> {
        const leadToDelete = await this.leadRepository.findOneBy({ id: Number(id) });

        if (!leadToDelete) throw new GenericServiceError(`Lead id ${id} doesn't exist`, 404);

        return await this.leadRepository.delete({ id: Number(id) });
    }
}