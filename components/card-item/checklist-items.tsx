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
        <div className="flex items-center gap-3 ml-1">
            <Checkbox
                checked={item.completed}
                onCheckedChange={handleCheckChange}
            />
            {item.completed ? <del>{item.title}</del> : <p>{item.title}</p>}
        </div>
    );
}

export default ChecklistItem;
