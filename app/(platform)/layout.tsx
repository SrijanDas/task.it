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
                    type="button"
                    onClick={() => modal.onOpenChange(true)}
                    className="h-full w-4 bg-gray-200 fixed hover:bg-opacity-80 left-0"
                ></button>

                <button type="button" onClick={() => modal.onOpenChange(true)}>
                    <ChevronRightIcon
                        size={24}
                        className="absolute top-5 -right-3 left-0 bg-gray-200 border-2 !shrink-0 p-0 rounded-full aspect-square"
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
                <div
                    className={clsx("w-full h-full", {
                        "ml-60": modal.open,
                        "ml-4": !modal.open,
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PlatformLayout;
