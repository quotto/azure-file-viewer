import { getList } from "@/features/list/get-files";
import AzureBlobContainer from "@/repository/azure-blob-container";
import CosmosDB from "@/repository/cosmosdb";

export async function GET(request: Request) {
    try {
        const data = await getList(CosmosDB.getInstance());
        console.log(JSON.stringify(data));
        return new Response(JSON.stringify(data), {
            status: 200
        });
    } catch (e) {
        return new Response("一覧の取得に失敗しました",{
            status: 500
        });
    }
}