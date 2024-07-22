"use server";

import { createClient } from "@/supabase/server";

export async function getBoards(orgId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("org_id", orgId);
    return {
        boards: data ?? [],
        error,
    };
}

export async function getBoardById(boardId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("id", boardId)
        .single();
    return {
        board: data,
        error,
    };
}

export async function createBoard(
    board: Omit<Omit<Board, "id">, "created_at">
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("boards")
        .insert({ ...board })
        .select()
        .single();
    return {
        board: data,
        error,
    };
}
