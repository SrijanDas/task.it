"use server"

import { createClient } from "@/supabase/server";

export async function createChecklist({ title, cardId, index }: { title: string, cardId: string, index: number }) {
    const supabase = createClient()
    const {data, error} = await supabase.from("checklist").insert({
        title,
        card_id: cardId,
        index
    })

    return { error, data };
}

export async function getCheckLists(cardId: string) {
    const supabase = createClient()
    const {data, error} = await supabase.from("checklist").select("*, checklist_items(*)").eq("card_id", cardId).order("index").order("index", {
        referencedTable: "checklist_items",

    })

    return {data: data ?? [], error};
}

export async function createCheckListItem({ title, checkListId, index, cardId }: { title: string, checkListId: string, index: number, cardId: string }) {
    const supabase = createClient()
    const {data, error} = await supabase.from("checklist_items").insert({
        title,
        checklist_id: checkListId,
        index,
        card_id: cardId

    })
    const {count} = await supabase.from("checklist_items").select("*", {count: "exact"}).eq("card_id", cardId)
    await supabase.from("cards").update({ total_checklist_items: count }).eq("id", cardId)
    return { error, data };
}

export async function updateCheckListItem(checklistItem: CheckListItem) {
    const supabase = createClient()
    const {data, error} = await supabase.from("checklist_items").update(checklistItem).eq("id", checklistItem.id)

    return { error, data };
}