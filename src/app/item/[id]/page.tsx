import { useRouter } from "next/router";

export default function Item({params}: {params: {id: string}}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <img src={`/api/item/${params.id}`} />
        </main>
    );
}