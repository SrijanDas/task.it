"use client";

import useModal from "@/hooks/use-modal";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import CreateBoard from "./create-board";
import { cn } from "@/lib/utils";
import { Gradient, gradients } from "./gradient-button";

type Props = {
    createButton?: boolean;
    board?: Board;
};

function BoardButton({ createButton = false, board }: Props) {
    const router = useRouter();
    const modal = useModal();
    return (
        <>
            <button
                onClick={() => {
                    if (createButton) {
                        modal.onOpenChange(true);
                    } else {
                        router.push(`/boards/${board?.id}`);
                    }
                }}
                className={cn(
                    "w-full text-white h-20 rounded-md p-2 hover:brightness-95 transition-all duration-150 font-semibold",
                    gradients[board?.bg_image as Gradient],
                    {
                        "bg-gray-200 text-black font-normal": createButton,
                    }
                )}
            >
                {createButton && "Create new board"}

                {!createButton && board?.title}
            </button>

            <CreateBoard modal={modal} />
        </>
    );
}

export default BoardButton;
