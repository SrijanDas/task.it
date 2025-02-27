"use client";
import React, { useEffect, useMemo, useState } from "react";
import List from "./list";
import { createClient } from "@/supabase/client";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { reorder } from "@/utils/reorder";
import { updateListOrder } from "@/actions/list.actions";

type Props = {
    listItems: ListItem[];
};

function RealtimeLists({ listItems }: Props) {
    const [realtimeLists, setRealtimeLists] = useState(listItems);
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        const listChannel = supabase
            .channel("list-changes")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    table: "list",
                    event: "*",
                },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        setRealtimeLists((prev) => [
                            ...prev,
                            payload.new as ListItem,
                        ]);
                    } else if (payload.eventType === "UPDATE") {
                        setRealtimeLists((prev) =>
                            prev.map((l) =>
                                l.id === payload.new.id
                                    ? {
                                          ...(payload.new as ListItem),
                                          cards: l.cards,
                                      }
                                    : l
                            )
                        );
                    } else if (payload.eventType === "DELETE") {
                        setRealtimeLists((prev) =>
                            prev.filter((l) => l.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        // cards
        const cardsChannel = supabase
            .channel("card-changes")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    table: "cards",
                    event: "*",
                },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        setRealtimeLists((prev) =>
                            prev.map((l) =>
                                l.id === payload.new.list_id
                                    ? {
                                          ...l,
                                          cards: l.cards
                                              ? [
                                                    ...l.cards,
                                                    payload.new as CardItem,
                                                ]
                                              : [payload.new as CardItem],
                                      }
                                    : l
                            )
                        );
                    } else if (payload.eventType === "UPDATE") {
                        setRealtimeLists((prev) =>
                            prev.map((l) =>
                                l.id === payload.new.list_id
                                    ? {
                                          ...l,
                                          cards: l.cards
                                              ? l.cards.map((c) =>
                                                    c.id === payload.new.id
                                                        ? (payload.new as CardItem)
                                                        : c
                                                )
                                              : [payload.new as CardItem],
                                      }
                                    : l
                            )
                        );
                    } else if (payload.eventType === "DELETE") {
                        setRealtimeLists((prev) =>
                            prev.map((l) =>
                                l.id === payload.old.list_id
                                    ? {
                                          ...l,
                                          cards: l.cards?.filter(
                                              (c) => c.id !== payload.old.id
                                          ),
                                      }
                                    : l
                            )
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(listChannel);
            supabase.removeChannel(cardsChannel);
        };
    }, [supabase]);

    async function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const items = reorder(
            realtimeLists,
            result.source.index,
            result.destination.index
        );

        setRealtimeLists(items);

        // update in db
        const formattedItems = items.map((item, index) => {
            const { cards, ...rest } = item;
            return { ...rest, index };
        });
        await updateListOrder(formattedItems);
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="list"
                    direction="horizontal"
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ display: "flex", gap: "1rem" }}
                        >
                            {realtimeLists.map((list, index) => (
                                <List
                                    setList={setRealtimeLists}
                                    key={list.id}
                                    list={list}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        className="flex items-start gap-6"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {realtimeLists.map((item, index) => (
                            <div key={item.id} className="flex flex-col">
                                <Draggable draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="w-full h-10 bg-slate-100 hover:bg-blue-100"
                                        >
                                            <List
                                                setList={setRealtimeLists}
                                                key={item.id}
                                                list={item}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext> */}
        </>
    );
}

export default RealtimeLists;
