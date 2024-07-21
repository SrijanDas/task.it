import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

function BoardsPage({}: Props) {
    const { userId, orgId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    if (!orgId) {
        return redirect("/select-org");
    }

    return <div>BoardsPage</div>;
}

export default BoardsPage;
