"use server"

import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCard({title, listId}:{title: string; listId: string}) {
    const supabase = createClient()

    const {data, error} = await supabase.from("cards").insert({
        name: title,
        list_id: listId
    }).select().single()


    revalidatePath("/")

    return {data, error}
}