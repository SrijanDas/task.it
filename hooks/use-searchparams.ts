import { useRouter } from "next-nprogress-bar";
import {
    useSearchParams,
    ReadonlyURLSearchParams,
    usePathname,
} from "next/navigation";

type Props = {
    searchParams: ReadonlyURLSearchParams;
    newQuery: {
        name: string;
        value: string;
    };
    pathname?: string;
};

export function getQueryString({
    searchParams,
    newQuery,
    pathname = "",
}: Props): string {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!newQuery.value) {
        current.delete(newQuery.name);
    } else {
        current.set(newQuery.name, newQuery.value);
    }

    const search = current.toString();

    const query = search ? `?${search}` : "";
    return `${pathname}${query}`;
}

export default function useAppSearchParams() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    function set<T>(name: string, value: T) {
        const newPathname = getQueryString({
            newQuery: {
                name,
                value: String(value),
            },
            searchParams,
            pathname,
        });
        router.push(newPathname, {
            scroll: false,
        });
        return;
    }

    function get(name: string) {
        return searchParams.get(name);
    }

    function remove(name: string) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.delete(name);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.replace(`${pathname}${query}`);
        return;
    }
    return { set, get, remove };
}
