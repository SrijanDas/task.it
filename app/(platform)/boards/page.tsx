import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import BoardButton from "@/components/boards/board-button";
import { getBoards } from "@/actions/boards.actions";

type Props = {};

async function BoardsPage({}: Props) {
    const { userId, orgId } = auth();

    const { boards, error } = await getBoards(orgId ?? "");

    if (!userId) {
        return redirect("/sign-in");
    }

    if (!orgId) {
        return redirect("/select-org");
    }

    if (error) {
        return <div>Error loading boards</div>;
    }

    return (
        <main className="overflow-y-scroll w-full p-12 py-8 h-full">
            <h2 className="font-semibold text-xl mb-6">Boards</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <BoardButton createButton />
                {boards.map((board) => (
                    <BoardButton key={board.id} board={board} />
                ))}
            </div>
        </main>
    );
}

export default BoardsPage;
