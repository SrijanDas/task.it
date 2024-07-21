"use client";

import React from "react";
import PlatformNavbar from "./_components/platform-navbar";
import PlatformSidebar from "./_components/platform-sidebar";
import { ChevronRightIcon } from "lucide-react";
import useModal from "@/hooks/use-modal";
import clsx from "clsx";

function PlatformLayout({ children }: React.PropsWithChildren) {
    const modal = useModal();

    return (
        <div className="h-screen w-full overflow-hidden">
            <PlatformNavbar />
            <div className="flex w-full relative h-full">
                <button
                    onClick={() => modal.onOpenChange(true)}
                    className="h-full w-4 bg-gray-200 fixed hover:bg-opacity-80"
                >
                    <ChevronRightIcon
                        size={24}
                        className="absolute top-3 -right-3 bg-gray-200 border-2 !shrink-0 p-0 rounded-full aspect-square"
                    />
                </button>
                <div
                    className={clsx(
                        "fixed transition-all duration-100 w-60 bg-white h-full",
                        {
                            "left-0": modal.open,
                            "-left-28 transform -translate-x-full": !modal.open,
                        }
                    )}
                >
                    <PlatformSidebar onOpenChange={modal.onOpenChange} />
                </div>
                <main
                    className={clsx("overflow-y-scroll w-full p-8", {
                        "ml-60": modal.open,
                        "ml-0": !modal.open,
                    })}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export default PlatformLayout;
