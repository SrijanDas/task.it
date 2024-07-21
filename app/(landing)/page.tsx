import Navbar from "@/app/(landing)/_components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import SiteFooter from "./_components/footer";

type Props = {};

function LandingPage({}: Props) {
    return (
        <div className="h-[100dvh]">
            <Navbar />
            <main className="flex flex-col items-center justify-center text-center h-full">
                <h1 className="text-6xl font-bold">Welcome to Task.it</h1>
                <p className="text-xl mt-4">
                    An open source alternative of <b>Trello</b>
                    <code>(an over glorified todo list app)</code>
                </p>
                <Button asChild className="mt-4">
                    <Link href="/sign-up">Get Started for free</Link>
                </Button>
            </main>
            <SiteFooter />
        </div>
    );
}

export default LandingPage;
