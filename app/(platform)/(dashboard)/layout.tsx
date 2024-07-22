"use client";

import React from "react";
import PlatformNavbar from "../_components/platform-navbar";
import PlatformSidebar from "../_components/platform-sidebar";
import { ChevronRightIcon } from "lucide-react";
import useModal from "@/hooks/use-modal";
import clsx from "clsx";
import PlatformSidebarTrigger from "../_components/platform-sidebar-trigger";

function PlatformLayout({ children }: React.PropsWithChildren) {
    const modal = useModal();

    return (
        <div className="h-screen w-full overflow-hidden">
            <PlatformNavbar />
            <div className="flex w-full relative h-full">
                <PlatformSidebarTrigger modal={modal} />
                <div
                    className={clsx(
                        "fixed transition-all duration-100 w-60 bg-white h-full z-10",
                        {
                            "left-0": modal.open,
                            "-left-28 transform -translate-x-full": !modal.open,
                        }
                    )}
                >
                    <PlatformSidebar onOpenChange={modal.onOpenChange} />
                </div>
                <div
                    className={clsx("w-full h-full overflow-y-scroll", {
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
