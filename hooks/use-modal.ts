import { useState } from "react";

type ModalTypes = "create-board";

export default function useModal(modalType?: ModalTypes) {
    const [open, setOpen] = useState<boolean>(false);

    function onOpenChange(value: boolean) {
        setOpen(value);
    }

    return {
        open,
        onOpenChange,
    };
}
