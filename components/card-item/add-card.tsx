"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import React, { forwardRef, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Spinner from "../ui/spinner";
import { toast } from "sonner";
import { createCard } from "@/actions/card.actions";
import { ListItemInput, ListItemSchema } from "@/validators/list.validator";

type Props = { listId: string };

const AddCard = forwardRef<HTMLButtonElement, Props>(function AddCard(
    { listId },
    ref
) {
    const [showInput, setShowInput] = useState<boolean>(false);

    const form = useForm<ListItemInput>({
        resolver: zodResolver(ListItemSchema),
        defaultValues: {
            title: "",
        },
    });

    async function onSubmit(data: ListItemInput) {
        const { error } = await createCard({ title: data.title, listId });
        if (error) {
            toast.error("Error creating card");
            return;
        }
        form.reset();
    }

    return (
        <>
            {!showInput && (
                <Button
                    ref={ref}
                    onClick={() => setShowInput(true)}
                    variant="ghost"
                    className="w-full"
                >
                    <Plus size={18} />
                    Add a card
                </Button>
            )}
            {showInput && (
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
                        <div className="flex items-center gap-2">
                            <Button
                                disabled={form.formState.isSubmitting}
                                type="submit"
                            >
                                Add card
                                {form.formState.isSubmitting && <Spinner />}
                            </Button>
                            <Button
                                onClick={() => setShowInput(false)}
                                variant="ghost"
                                type="button"
                                size="icon"
                            >
                                <X size={24} />
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </>
    );
});

export default AddCard;
