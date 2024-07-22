"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import clsx from "clsx";
import Spinner from "../ui/spinner";
import { toast } from "sonner";
import { createList } from "@/actions/list.actions";

type Props = {};

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
});

function AddList({}: Props) {
    const [showInput, setShowInput] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { error } = await createList(data.title);
        if (error) {
            toast.error("Error creating list");
            return;
        }
        form.reset();
    }

    return (
        <Card className="w-72">
            <CardContent
                className={clsx({
                    "p-0": !showInput,
                })}
            >
                {!showInput && (
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => setShowInput(true)}
                    >
                        <Plus size={18} />
                        Add another list
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
                                                placeholder="Enter list title..."
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
                                    Add list
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
            </CardContent>
        </Card>
    );
}

export default AddList;
