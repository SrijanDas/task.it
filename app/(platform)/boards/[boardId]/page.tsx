import AddList from "@/components/list/add-list";
import { redirect } from "next/navigation";
import { getLists } from "@/actions/list.actions";
import RealtimeLists from "@/components/list/realtime-lists";

type Props = {};

async function BoardIdPage({}: Props) {
    const { data, error } = await getLists();

    if (error) {
        redirect("/error?message=An error occurred while fetching lists.");
    }

    return (
        <main className="flex h-screen flex-row items-start gap-6 p-10 w-screen overflow-x-scroll overflow-y-hidden bg-slate-200">
            <RealtimeLists listItems={data ?? []} />
            <AddList />
        </main>
    );
}

export default BoardIdPage;
