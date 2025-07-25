import z from "zod";

const paramsId = z.object({
    id: z.string()
})

const emailQuery = z.object({
    email: z.string().email()
})

export type ParamsId = z.infer<typeof paramsId>;
export type EmailQuery = z.infer<typeof emailQuery>;
