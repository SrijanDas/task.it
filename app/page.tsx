import List from "@/components/list/list";
import AddList from "@/components/list/add-list";
import { redirect } from "next/navigation";
import { getLists } from "@/actions/list.actions";
import RealtimeLists from "@/components/list/realtime-lists";

export default async function Home() {
    const { data, error } = await getLists();

    if (error) {
        redirect("/error?message=An error occurred while fetching lists.");
    }

    return (
        <main className="flex h-screen flex-row items-start gap-6 p-24 w-screen overflow-x-scroll bg-slate-200">
            <RealtimeLists listItems={data ?? []} />
            <AddList />
        </main>
    );
}
