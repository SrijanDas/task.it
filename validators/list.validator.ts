import { z } from "zod";

export const ListItemSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
});

export type ListItemInput = z.infer<typeof ListItemSchema>;