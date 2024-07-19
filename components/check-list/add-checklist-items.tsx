import React, { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { CheckListItemForm } from "@/validators/checklist.validator";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { createCheckListItem } from "@/actions/checklist.actions";
import { toast } from "sonner";
import { Input } from "../ui/input";
import Spinner from "../ui/spinner";
import { useChecklistStore } from "@/store/use-checklist";
import { nanoid } from "nanoid";

type Props = {
    checkListId: string;
    cardId: string;
    index: number;
};

function AddCheckListItems({ cardId, checkListId, index }: Props) {
    const [showInput, setShowInput] = useState(false);
    const addChecklistItem = useChecklistStore(
        (state) => state.addChecklistItem
    );
    const form = useForm<CheckListItemForm>({
        defaultValues: {
            title: "",
        },
    });

    async function onSubmit(data: CheckListItemForm) {
        // update state
        const id = nanoid();
        addChecklistItem({
            card_id: cardId,
            checklist_id: checkListId,
            id,
            index,
            title: data.title,
            completed: false,
            created_at: new Date().toISOString(),
        });

        // update db
        const { error } = await createCheckListItem({
            title: data.title,
            checkListId,
            index,
            cardId,
        });

        if (error) {
            toast.error("Error creating item");
            return;
        }

        form.reset();
        setShowInput(false);
    }
    return (
        <>
            {!showInput && (
                <Button onClick={() => setShowInput(true)} variant="secondary">
                    Add an item
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
                                            placeholder="Add an item..."
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
                                Add
                                {form.formState.isSubmitting && <Spinner />}
                            </Button>
                            <Button
                                onClick={() => setShowInput(false)}
                                variant="ghost"
                                type="button"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </>
    );
}

export default AddCheckListItems;
