import React from "react";
import { Checkbox } from "../ui/checkbox";
import { useChecklistStore } from "@/store/use-checklist";
import { updateCheckListItem } from "@/actions/checklist.actions";

type Props = { item: CheckListItem };

function ChecklistItem({ item }: Props) {
    const updateChecklistItemState = useChecklistStore(
        (state) => state.updateChecklistItem
    );
    async function handleCheckChange(value: boolean) {
        console.log("checked");
        updateChecklistItemState({ ...item, completed: value });

        // update db
        await updateCheckListItem({ ...item, completed: value });
    }
    return (
        <div className="flex gap-3 ml-1 w-full">
            <Checkbox
                checked={item.completed}
                onCheckedChange={handleCheckChange}
                className="mt-3"
            />
            <div className="leading-0 p-2 hover:bg-secondary w-full rounded-xl cursor-pointer">
                {item.completed ? <del>{item.title}</del> : item.title}
            </div>
        </div>
    );
}

export default ChecklistItem;
