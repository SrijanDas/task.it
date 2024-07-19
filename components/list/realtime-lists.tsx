"use client";
import React, { useEffect, useMemo, useState } from "react";
import List from "./list";
import { createClient } from "@/supabase/client";

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
    return (
        <>
            {realtimeLists.map((list) => (
                <List key={list.id} list={list} />
            ))}
        </>
    );
}

export default RealtimeLists;
