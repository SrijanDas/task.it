"use client";

import useModal from "@/hooks/use-modal";
import React from "react";
import PlatformNavbar from "../../_components/platform-navbar";
import PlatformSidebarTrigger from "../../_components/platform-sidebar-trigger";
import clsx from "clsx";
import PlatformSidebar from "../../_components/platform-sidebar";
import BoardHeader from "@/components/boards/board-header";
import RealtimeLists from "@/components/list/realtime-lists";
import AddList from "@/components/list/add-list";

type Props = {
    board: Board;
    lists: ListItem[];
};

function BoardContent({ board, lists }: Props) {
    const modal = useModal();
    return (
        <>
            <PlatformNavbar
                organizationSwitcherClassName="text-white"
                className="bg-black/20 backdrop-blur-md border-none !text-white"
            />

            <div className="flex w-full relative h-full">
                <PlatformSidebarTrigger
                    className="bg-black/20 text-white fill-black/20 backdrop-blur-md"
                    modal={modal}
                />
                <div
                    className={clsx(
                        "fixed transition-all duration-100 w-60 h-full z-10",
                        {
                            "left-0": modal.open,
                            "-left-28 transform -translate-x-full": !modal.open,
                        }
                    )}
                >
                    <PlatformSidebar
                        className="bg-black/20 text-white backdrop-blur-md"
                        onOpenChange={modal.onOpenChange}
                    />
                </div>
                <div
                    className={clsx("w-full h-full", {
                        "ml-60": modal.open,
                        "ml-4": !modal.open,
                    })}
                >
                    <main className="h-screen overflow-y-hidden">
                        <BoardHeader board={board} />
                        <div className="flex flex-row items-start gap-6 p-4 h-full w-screen overflow-x-scroll">
                            <RealtimeLists listItems={lists ?? []} />
                            <AddList />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default BoardContent;
