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
        const channel = supabase
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
                                    ? (payload.new as ListItem)
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

        return () => {
            supabase.removeChannel(channel);
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
