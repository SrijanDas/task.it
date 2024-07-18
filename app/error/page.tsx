type Props = {
    searchParams?: { message?: string };
};

export default function ErrorPage({ searchParams }: Props) {
    return <p>{searchParams?.message ?? "Sorry, something went wrong"}</p>;
}
