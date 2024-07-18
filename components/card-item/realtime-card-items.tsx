"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { createClient } from "@/supabase/client";

type Props = {
    serverCards: CardItem[];
};

function RealtimeCardItems({ serverCards }: Props) {
    const [cardItems, setCardItems] = useState(serverCards);
    const supabase = useMemo(() => createClient(), []);
    useEffect(() => {
        const channel = supabase
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
                        setCardItems((prev) => [
                            ...prev,
                            payload.new as CardItem,
                        ]);
                    } else if (payload.eventType === "UPDATE") {
                        setCardItems((prev) =>
                            prev.map((c) =>
                                c.id === payload.new.id
                                    ? (payload.new as CardItem)
                                    : c
                            )
                        );
                    } else if (payload.eventType === "DELETE") {
                        setCardItems((prev) =>
                            prev.filter((c) => c.id !== payload.old.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);
    return (
        <>
            {cardItems.map((card) => (
                <Button
                    className="justify-between"
                    variant="secondary"
                    key={card.id}
                >
                    {card.name}
                </Button>
            ))}
        </>
    );
}

export default RealtimeCardItems;
