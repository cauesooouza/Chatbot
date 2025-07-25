import { AppDataSource } from "../../data/data-source.js";
import { Lead } from "./lead.entity.js";

export const leadRepository = AppDataSource.getRepository(Lead);
export type leadRepository = typeof leadRepository;