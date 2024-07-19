import { z } from "zod";

export const CheckListFormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
});

export type CheckListForm = z.infer<typeof CheckListFormSchema>;


export const CheckListItemFormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
});

export type CheckListItemForm = z.infer<typeof CheckListItemFormSchema>;