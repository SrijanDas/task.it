"use client";

import { ModalProps } from "@/hooks/use-modal";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { CreateBoardForm } from "@/validators/board.validators";
import { Input } from "../ui/input";
import GradientButton, { gradients } from "./gradient-button";
import { useRouter } from "next-nprogress-bar";
import { createBoard, updateBoard } from "@/actions/boards.actions";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import Spinner from "../ui/spinner";

type Props = {
    modal: ModalProps;
    defaultValues?: Board;
};

function CreateBoard({ modal, defaultValues }: Props) {
    const router = useRouter();
    const { userId, orgId } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const form = useForm<CreateBoardForm>({
        defaultValues: {
            background: defaultValues?.bg_image ?? "default",
            title: defaultValues?.title ?? "",
        },
    });

    async function onSubmit(data: CreateBoardForm) {
        console.log(data);
        if (!userId || !orgId) {
            return;
        }

        setIsSubmitting(true);

        if (defaultValues) {
            // edit mode
            const { board, error } = await updateBoard({
                bg_image: data.background ?? "default",
                title: data.title,
                org_id: orgId,
                user_id: userId,
                created_at: defaultValues.created_at,
                id: defaultValues.id,
            });

            if (error || !board) {
                console.error(error);
                toast.error("Failed to update board");
                setIsSubmitting(false);
                return;
            }

            router.push(`/boards/${board.id}`);
        } else {
            // create mode
            const { board, error } = await createBoard({
                bg_image: data.background ?? "default",
                title: data.title,
                org_id: orgId,
                user_id: userId,
            });

            if (error || !board) {
                console.error(error);
                toast.error("Failed to create board");
                setIsSubmitting(false);
                return;
            }

            router.push(`/boards/${board.id}`);
        }

        modal.onOpenChange(false);
        setIsSubmitting(false);
    }

    return (
        <Dialog {...modal}>
            <DialogContent
                aria-describedby={undefined}
                className="max-w-md lg:max-w-md xl:max-w-md"
            >
                <DialogHeader>
                    <DialogTitle>Create Board</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="background"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background</FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-6 gap-4 items-center justify-between">
                                            {Object.keys(gradients).map(
                                                (key) => (
                                                    <GradientButton
                                                        type="button"
                                                        key={key}
                                                        gradient={key as any}
                                                        selected={
                                                            field.value === key
                                                        }
                                                        onClick={() =>
                                                            field.onChange(key)
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Board title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                disabled={isSubmitting}
                                className="justify-center"
                                type="submit"
                            >
                                {defaultValues ? "Update" : "Create"}
                                {isSubmitting && <Spinner />}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateBoard;
