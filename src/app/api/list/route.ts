import { getList } from "@/features/list/get-files";
import CosmosDB from "@/repository/cosmosdb";

export async function GET(request: Request) {
    console.log("GET /api/list");
    try {
        const data = await getList(CosmosDB.getInstance());
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (e) {
        console.error(e);
        return new Response("一覧の取得に失敗しました",{
            status: 500
        });
    }
}