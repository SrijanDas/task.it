"use client";

import React, { useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import AddCard from "../card-item/add-card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { deleteList, updateList } from "@/actions/list.actions";
import { useForm } from "react-hook-form";
import { ListItemInput, ListItemSchema } from "@/validators/list.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardItem from "../card-item/card-item";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
    list: ListItem;
};

function List({ list }: Props) {
    const addCardButtonRef = useRef<HTMLButtonElement | null>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    function handleDeleteList(listId: string) {
        toast.promise(deleteList(listId), {
            loading: "Deleting list...",
            success: "List deleted successfully",
            error: "Failed to delete list",
        });
    }

    const [showInput, setShowInput] = useState<boolean>(false);

    const form = useForm<ListItemInput>({
        resolver: zodResolver(ListItemSchema),
        defaultValues: {
            title: list.name,
        },
    });

    async function onSubmit(data: ListItemInput) {
        const { error } = await updateList({
            title: data.title,
            listId: list.id,
        });
        if (error) {
            toast.error("Error creating card");
            return;
        }
        setShowInput(false);
    }
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-md w-full">
                    {showInput ? (
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
                                                    onBlur={() =>
                                                        setShowInput(false)
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="hidden"
                                    disabled={form.formState.isSubmitting}
                                    type="submit"
                                >
                                    Add card
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Button
                            className="cursor-pointer w-full justify-start"
                            variant="ghost"
                            onClick={() => setShowInput(true)}
                        >
                            {list.name}
                        </Button>
                    )}
                </CardTitle>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <Ellipsis size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>List Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => addCardButtonRef.current?.click()}
                        >
                            Add card
                        </DropdownMenuItem>
                        <DropdownMenuItem>Copy list</DropdownMenuItem>
                        <DropdownMenuItem>Move list</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => handleDeleteList(list.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea>
                    <div className="flex flex-col gap-2 max-h-[calc(100vh-15rem)] px-3">
                        {list.cards?.map((card) => (
                            <CardItem
                                key={card.id}
                                cardItem={card}
                                listName={list.name}
                            />
                        ))}
                        <div ref={cardContainerRef} className="p-1" />
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="">
                <AddCard
                    ref={addCardButtonRef}
                    listId={list.id}
                    index={(list.cards ?? []).length}
                    callback={() =>
                        cardContainerRef.current?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                />
            </CardFooter>
        </Card>
    );
}

export default List;
