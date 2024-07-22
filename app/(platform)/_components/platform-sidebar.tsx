"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useOrganization } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type Props = {
    onOpenChange: (open: boolean) => void;
    className?: string;
};

const sidebarItems = [
    {
        title: "Boards",
        href: "/boards",
    },
    // {
    //     title: "Members",
    //     href: "/organizations",
    // },
    // {
    //     title: "Settings",
    //     href: "/settings",
    // },
];

function PlatformSidebar({ onOpenChange, className }: Props) {
    const pathname = usePathname();
    const { organization } = useOrganization();

    return (
        <div className={twMerge("bg-white h-full border-r", className)}>
            <div className="p-4 flex items-center gap-6 justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="rounded-md">
                        <AvatarImage src={organization?.imageUrl} alt="org" />
                        <AvatarFallback>
                            {organization?.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <h6 className="font-bold whitespace-nowrap">
                        {organization?.name}
                    </h6>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenChange(false)}
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Button>
            </div>
            <Separator />
            <ul className="py-3">
                {sidebarItems.map((item) => (
                    <li key={item.title}>
                        <Button
                            className={clsx("w-full", {
                                "bg-accent font-semibold":
                                    pathname === item.href,
                            })}
                            variant="ghost"
                            asChild
                        >
                            <Link href={item.href}>{item.title}</Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlatformSidebar;
