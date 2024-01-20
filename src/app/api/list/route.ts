import { getList } from "@/features/list/get-files";
import { getContainerInstance } from "@/repository/azure-blob-container";
export async function GET(request: Request) {
    try {
        const data = await getList(getContainerInstance());
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (e) {
        return new Response("一覧の取得に失敗しました",{
            status: 500
        });
    }
}