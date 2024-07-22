"use client";

import CreateBoard from "@/components/boards/create-board";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import useModal from "@/hooks/use-modal";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = { className?: string };

function PlatformNavbar({ className }: Props) {
    const modal = useModal();

    return (
        <nav
            className={twMerge(
                "bg-white shadow-sm border-b dark:bg-gray-950/90",
                className
            )}
        >
            <div className="w-full mx-auto px-5  flex items-center h-14 justify-between">
                <div className="flex items-center gap-2">
                    <Logo />
                    <OrganizationSwitcher hidePersonal />
                    <Button onClick={() => modal.onOpenChange(true)} size="sm">
                        <span className="hidden md:block">Create</span>
                        <PlusIcon className="w-5 h-5 md:hidden" />
                    </Button>
                </div>

                <UserButton />
            </div>
            <CreateBoard modal={modal} />
        </nav>
    );
}

export default PlatformNavbar;
