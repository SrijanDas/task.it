import { z } from "zod";

export const CreateBoardSchema = z.object({
    background: z.string().optional(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
});

export type CreateBoardForm = z.infer<typeof CreateBoardSchema>;
