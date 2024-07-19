"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Ellipsis, SquareCheckBig } from "lucide-react";
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
// import { ScrollArea } from "../ui/scroll-area";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
    OnDragEndResponder,
} from "@hello-pangea/dnd";
import { reorder } from "@/utils/reorder";
import { updateCardOrder } from "@/actions/card.actions";

type Props = {
    list: ListItem;
    setList: React.Dispatch<React.SetStateAction<ListItem[]>>;
};

function List({ list, setList }: Props) {
    const addCardButtonRef = useRef<HTMLButtonElement | null>(null);
    const cardContainerRef = useRef<HTMLDivElement>(null);

    // const [list, setList] = useState(serverList);

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

    function onDragEnd(result: DropResult): void {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const items = reorder(
            list.cards ?? [],
            result.source.index,
            result.destination.index
        );

        setList((prev) =>
            prev.map((l) =>
                l.id === list.id
                    ? {
                          ...list,
                          cards: items,
                      }
                    : l
            )
        );

        // update index in db
        updateCardOrder(items);
    }

    const [open, setOpen] = useState<string | null>(null);

    return (
        <Card className="bg-[#F1F2F4]">
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
                            className="cursor-pointer w-full justify-start font-semibold text-wrap text-start"
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
            {list.cards && list.cards.length > 0 && (
                <CardContent className="p-0">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-col gap-2 max-h-[calc(100vh-15rem)] px-3 overflow-y-auto overflow-x-hidden"
                                >
                                    {list.cards?.map((card, index) => (
                                        <div key={`card-wrapper-${card.id}`}>
                                            <Draggable
                                                key={card.id}
                                                draggableId={card.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        onClick={() =>
                                                            setOpen(card.id)
                                                        }
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white rounded-lg px-3 py-2 shadow-md border text-wrap break-all"
                                                    >
                                                        <span>{card.name}</span>
                                                        {card.total_checklist_items && (
                                                            <span className="flex items-center gap-2">
                                                                <SquareCheckBig
                                                                    size={16}
                                                                    className="mb-0.5"
                                                                />
                                                                {`${card.completed_checklist_items}/${card.total_checklist_items}`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>

                                            <CardItem
                                                cardItem={card}
                                                listName={list.name}
                                                onOpenChange={(value) =>
                                                    setOpen(value)
                                                }
                                                open={open === card.id}
                                            />
                                        </div>
                                    ))}
                                    {provided.placeholder}

                                    <div
                                        ref={cardContainerRef}
                                        className="p-1"
                                    />
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </CardContent>
            )}

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
