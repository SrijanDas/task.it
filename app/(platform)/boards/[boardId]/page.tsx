import { redirect } from "next/navigation";
import { getLists } from "@/actions/list.actions";
import { cn } from "@/lib/utils";
import { Gradient, gradients } from "@/components/boards/gradient-button";
import { getBoardById } from "@/actions/boards.actions";
import BoardContent from "./board-content";

type Props = {
    params: {
        boardId: string;
    };
};

async function BoardIdPage({ params }: Props) {
    const { board, error: boardFetchError } = await getBoardById(
        params.boardId
    );
    const { data, error } = await getLists();

    if (error || boardFetchError) {
        return redirect(
            "/error?message=An error occurred while fetching board data."
        );
    }

    if (!board) {
        return redirect("/error?message=Board not found.");
    }

    return (
        <div
            id="bg"
            className={cn(
                "h-screen overflow-y-hidden",
                gradients[board?.bg_image as Gradient]
            )}
        >
            <BoardContent board={board} lists={data ?? []} />
        </div>
    );
}

export default BoardIdPage;
