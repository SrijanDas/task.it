import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {};

function PlatformNavbar({}: Props) {
    return (
        <nav className="bg-white shadow-sm border-b dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4 flex items-center h-14 justify-between">
                <div className="flex items-center gap-2">
                    <Logo />
                    <OrganizationSwitcher hidePersonal />
                    <Button size="sm">
                        <span className="hidden md:block">Create</span>
                        <PlusIcon className="w-5 h-5 md:hidden" />
                    </Button>
                </div>

                <UserButton />
            </div>
        </nav>
    );
}

export default PlatformNavbar;
