"use client";

import { ModalProps } from "@/hooks/use-modal";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    modal: ModalProps;
    className?: string;
};

function PlatformSidebarTrigger({ modal, className }: Props) {
    return (
        <>
            <button
                type="button"
                onClick={() => modal.onOpenChange(true)}
                className={twMerge(
                    "h-full w-4 bg-gray-200 fixed hover:bg-opacity-80 left-0 z-10",
                    className
                )}
            ></button>

            <button type="button" onClick={() => modal.onOpenChange(true)}>
                <ChevronRightIcon
                    size={24}
                    className={twMerge(
                        "absolute top-5 -right-3 left-0 bg-gray-200 border-2 !shrink-0 p-0 rounded-full aspect-square z-10",
                        className
                    )}
                />
            </button>
        </>
    );
}

export default PlatformSidebarTrigger;
