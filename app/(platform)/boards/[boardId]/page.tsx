import AddList from "@/components/list/add-list";
import { redirect } from "next/navigation";
import { getLists } from "@/actions/list.actions";
import RealtimeLists from "@/components/list/realtime-lists";
import BoardHeader from "@/components/boards/board-header";
import { cn } from "@/lib/utils";
import { Gradient, gradients } from "@/components/boards/gradient-button";
import { getBoardById } from "@/actions/boards.actions";
import PlatformNavbar from "../../_components/platform-navbar";
import PlatformSidebarTrigger from "../../_components/platform-sidebar-trigger";
import PlatformSidebar from "../../_components/platform-sidebar";
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
