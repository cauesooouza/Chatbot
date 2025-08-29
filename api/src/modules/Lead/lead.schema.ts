import { z } from 'zod';

export const LeadResponseSchema = z.object({
    id: z.number(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    isBot: z.boolean(),
    username: z.string().optional(),
    languageCode: z.string(),
    lastInteraction: z.string().nullable(),
    createdAt: z.string().datetime(),
    updateAt: z.string().datetime().nullable()
})

export const createLeadSchema = z.object({
    id: z.number(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    isBot: z.boolean(),
    username: z.string().optional(),
    languageCode: z.string()
})

export const updateLeadSchema = z.object({
    id: z.number(),
    lastInteraction: z.string(),
})



export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;