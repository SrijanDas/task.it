"use server"

import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCard({title, listId, index}:{title: string; listId: string, index: number}) {
    const supabase = createClient()

    const {data, error} = await supabase.from("cards").insert({
        name: title,
        list_id: listId,
        index: index
    }).select().single()

    revalidatePath("/")

    return {data, error}
}


export async function updateCardOrder(cards: CardItem[]) {
    const supabase = createClient()
    await supabase.from("cards").upsert(cards)

}