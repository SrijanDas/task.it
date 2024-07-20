import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

function LandingPage({}: Props) {
    return (
        <div>
            <Navbar />
            <main className="flex flex-col items-center justify-center text-center pt-40 pb-20 px-6">
                <h1 className="text-6xl font-bold">Welcome to Task.it</h1>
                <p className="text-xl mt-4">
                    An open source alternative of <b>Trello</b>
                    <code>(an over glorified todo list app)</code>
                </p>
                <Button asChild className="mt-4">
                    <Link href="/sign-up">Get Started for free</Link>
                </Button>
            </main>
        </div>
    );
}

export default LandingPage;
