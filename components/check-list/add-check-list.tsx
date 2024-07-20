"use client";

import React, { useOptimistic, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { SquareCheckBig, X } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { CheckListForm } from "@/validators/checklist.validator";
import { toast } from "sonner";
import { createChecklist } from "@/actions/checklist.actions";
import Spinner from "../ui/spinner";
import { useChecklistStore } from "@/store/use-checklist";
import { nanoid } from "nanoid";

type Props = {
    cardId: string;
    index: number;
};

function AddCheckList({ cardId, index }: Props) {
    const addChecklist = useChecklistStore((state) => state.addChecklist);
    const [open, setOpen] = useState(false);
    const form = useForm<CheckListForm>({
        defaultValues: {
            title: "Checklist",
        },
    });

    async function onSubmit(data: CheckListForm) {
        const id = nanoid();
        addChecklist({
            card_id: cardId,
            title: data.title,
            created_at: new Date().toISOString(),
            created_by: "currentUser",
            id,
            index,
            checklist_items: [],
            updated_at: new Date().toISOString(),
        });

        setOpen(false);

        const { error } = await createChecklist({
            title: data.title,
            cardId,
            index,
        });

        if (error) {
            toast.error("Error creating checklist");
            return;
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="secondary" className="w-full">
                    <SquareCheckBig className="shrink-0" size={16} /> Checklist
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="flex items-center justify-between gap-4">
                    <h4 className="font-medium leading-none text-center">
                        Add checklist
                    </h4>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(false)}
                    >
                        <X size={16} />
                    </Button>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>

                                    <FormControl>
                                        <Input
                                            autoFocus
                                            placeholder="Enter a title for this card..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={form.formState.isSubmitting}
                            type="submit"
                        >
                            Add
                            {form.formState.isSubmitting && <Spinner />}
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}

export default AddCheckList;
