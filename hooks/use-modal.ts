import { useState } from "react";

export type ModalProps = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
};

export default function useModal(defaultValue?: boolean) {
    const [open, setOpen] = useState<boolean>(defaultValue ?? false);

    function onOpenChange(value: boolean) {
        setOpen(value);
    }

    return {
        open,
        onOpenChange,
    };
}
