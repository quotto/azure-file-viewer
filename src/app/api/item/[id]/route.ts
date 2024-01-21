import { getItem } from "@/features/item/get-item";
import AzureBlobContainer from "@/repository/azure-blob-container";
import CosmosDB from "@/repository/cosmosdb";

export const revalidate = 60;
export const dynamic = "force-static"
export async function GET(request: Request, {params}: {params: {id: string}}) {
    console.log("GET /api/item/:id")
    try {
        const data = await getItem(AzureBlobContainer.getInstance(),CosmosDB.getInstance(),params.id);
        return new Response(data, {
            status: 200
        });
    } catch (e) {
        console.error(e);
        return new Response("データの取得に失敗しました",{
            status: 500
        });
    }
}