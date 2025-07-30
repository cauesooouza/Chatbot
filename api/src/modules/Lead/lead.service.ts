import { DeleteResult, Repository } from "typeorm";
import { CreateLeadInput, UpdateLeadInput } from "./lead.schema.js";
import { Lead } from "./lead.entity.js";
import { GenericError, HttpStatus } from "../../errors/GenericError.js";

export class LeadService {
    constructor(private leadRepository: Repository<Lead>) { }

    async create(leadInput: CreateLeadInput): Promise<Lead> {
        const existingLead = await this.leadRepository.findOneBy({ id: leadInput.id });

        if (existingLead) {
            throw new GenericError(`Lead id ${leadInput.id} already exist`, HttpStatus.CONFLICT)
        }

        const newLead = this.leadRepository.create(leadInput);
        return await this.leadRepository.save(newLead);
    }

    async getAll(): Promise<Lead[]> {
        return await this.leadRepository.find();
    }

    async getById(id: number): Promise<Lead> {
        const lead = await this.leadRepository.findOneBy({ id });

        if (!lead) throw new GenericError(`Lead id ${id} not found`, HttpStatus.NOT_FOUND);

        return lead;
    }

    async updateInteraction(updateSchema: UpdateLeadInput): Promise<Lead> {
        const leadToUpdate = await this.leadRepository.findOneBy({ id: updateSchema.id });

        if (!leadToUpdate) throw new GenericError(`Lead id ${updateSchema.id} not found`, HttpStatus.NOT_FOUND);

        leadToUpdate.lastInteraction = updateSchema.lastInteraction;
        return await this.leadRepository.save(leadToUpdate);
    }

    async delete(id: string): Promise<DeleteResult> {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            throw new GenericError(`Invalid id: ${id}`, HttpStatus.BAD_REQUEST);
        }

        const leadToDelete = await this.leadRepository.findOneBy({ id: numericId });

        if (!leadToDelete) throw new GenericError(`Lead id ${id} doesn't exist`, HttpStatus.NOT_FOUND);

        return await this.leadRepository.delete({ id: numericId });
    }
}