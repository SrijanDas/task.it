import { MountainIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function Logo({}: Props) {
    return (
        <Link href="/" className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="">Task.it</span>
        </Link>
    );
}

export default Logo;
