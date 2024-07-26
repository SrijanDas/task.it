"use client";

import React from "react";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import useModal from "@/hooks/use-modal";
import CreateBoard from "./create-board";

type Props = {
    board: Board;
};

function BoardHeader({ board }: Props) {
    const modal = useModal();
    return (
        <nav className="isolate h-16 bg-blend-saturation px-8 py-3 bg-white/20 shadow-sm flex items-center backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <h4 className="font-semibold text-xl text-white">
                    {board.title}
                </h4>
                <Button
                    onClick={() => modal.onOpenChange(true)}
                    size="icon"
                    variant="ghost"
                    className="text-white"
                >
                    <PencilIcon className="h-4 w-4 shrink-0" />
                </Button>
            </div>

            <CreateBoard modal={modal} defaultValues={board} />
        </nav>
    );
}

export default BoardHeader;
