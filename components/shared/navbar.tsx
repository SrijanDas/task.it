import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

type Props = {};

function Navbar({}: Props) {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-14 items-center">
                    <Link
                        href="#"
                        className="flex items-center"
                        prefetch={false}
                    >
                        <MountainIcon className="h-6 w-6" />
                        <span className="">Task.it</span>
                    </Link>
                    <nav className="hidden md:flex gap-4">
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Home
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Services
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        </SignedIn>
                        <SignedOut>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
