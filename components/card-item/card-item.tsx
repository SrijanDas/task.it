"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlignLeft,
    ArrowRight,
    Rows3,
    SquareCheckBig,
    Trash,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import MoveCard from "./move-card";
import AddCheckList from "../check-list/add-check-list";
import Spinner from "../ui/spinner";
import AddCheckListItems from "../check-list/add-checklist-items";
import { useChecklistStore } from "@/store/use-checklist";
import { Checkbox } from "../ui/checkbox";
import ChecklistItem from "./checklist-items";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
    cardItem: CardItem;
    listName: string;
    open: boolean;
    onOpenChange: (value: string | null) => void;
};

function CardItem({ cardItem, listName, open, onOpenChange }: Props) {
    const fetchChecklists = useChecklistStore((state) => state.fetchChecklists);
    const checkLists = useChecklistStore((state) => state.checkLists);
    const isPending = useChecklistStore((state) => state.isLoading);
    const error = useChecklistStore((state) => state.error);

    useEffect(() => {
        if (open) {
            fetchChecklists(cardItem.id);
        }
    }, [cardItem.id, open]);

    return (
        <Dialog
            open={open}
            onOpenChange={(value) =>
                value ? onOpenChange(cardItem.id) : onOpenChange(null)
            }
        >
            <DialogContent className="max-h-[calc(100dvh-1.5rem)]">
                <ScrollArea className="max-h-[calc(100dvh-5rem)] pr-4">
                    <DialogHeader className="text-start mb-10">
                        <DialogTitle className="flex items-center text-2xl gap-3">
                            <Rows3 size={24} />
                            {cardItem.name}
                        </DialogTitle>
                        <DialogDescription className="pl-10">
                            in list{" "}
                            <span className="underline underline-offset-4">
                                {listName}
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    {isPending ? (
                        <div className="w-full flex flex-col items-center justify-center p-10">
                            <Spinner />
                        </div>
                    ) : error ? (
                        <p>Error fetching card data</p>
                    ) : (
                        <div className="flex gap-4">
                            <div className="w-full space-y-10">
                                <div>
                                    <Heading>
                                        <AlignLeft size={24} />
                                        Description
                                    </Heading>
                                    <Textarea className="ml-10 w-[85%] mt-4" />
                                </div>

                                {checkLists.map((checklist, index) => (
                                    <div
                                        key={checklist.id}
                                        className="space-y-4"
                                    >
                                        <Heading>
                                            <SquareCheckBig size={24} />
                                            {checklist.title}
                                        </Heading>
                                        {checklist.checklist_items.map(
                                            (item) => (
                                                <ChecklistItem
                                                    key={item.id}
                                                    item={item}
                                                />
                                            )
                                        )}
                                        <div className="ml-10">
                                            <AddCheckListItems
                                                cardId={checklist.card_id}
                                                index={
                                                    checklist.checklist_items
                                                        .length
                                                }
                                                checkListId={checklist.id}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* *** RIGHT SIDE ACTIONS *** */}
                            <div className="w-[30%] space-y-6">
                                <div className="space-y-2">
                                    <h6 className="text-sm font-semibold">
                                        Add to card
                                    </h6>

                                    <AddCheckList
                                        index={checkLists.length}
                                        cardId={cardItem.id}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h6 className="text-sm font-semibold">
                                        Actions
                                    </h6>

                                    <MoveCard />
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        <Trash size={16} /> Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="text-lg font-semibold leading-none tracking-tight flex items-center gap-3">
            {children}
        </h4>
    );
}

export default CardItem;
