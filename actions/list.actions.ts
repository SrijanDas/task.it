"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createList({
    boardId,
    title,
    index,
}: {
    title: string;
    boardId: string;
    index: number;
}) {
    const supabase = createClient();

    // const {data: {user}} = await supabase.auth.getUser()

    // if(!user) return { data: null, error: "User not found" }

    const { data, error } = await supabase
        .from("list")
        .insert({ name: title, board_id: boardId, index })
        .select()
        .single();

    // revalidatePath("/")

    return { data, error };
}

export async function deleteList(listId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("list")
        .delete()
        .eq("id", listId);

    revalidatePath("/");

    return { data, error };
}

export async function updateList({
    listId,
    title,
}: {
    listId: string;
    title: string;
}) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("list")
        .update({ name: title })
        .match({ id: listId });

    return { data, error };
}

export async function getLists(boardId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("list")
        .select(`*, cards(*)`)
        .eq("board_id", boardId)
        .order("index");

    return { data, error };
}

export async function updateListOrder(lists: ListItem[]) {
    const supabase = createClient();
    const { data, error } = await supabase.from("list").upsert(lists);

    console.log(data, error);
}
