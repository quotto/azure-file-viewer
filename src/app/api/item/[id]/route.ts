import { getItem } from "@/features/item/get-item";
import AzureBlobContainer from "@/repository/azure-blob-container";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    try {
        const data = await getItem(AzureBlobContainer.getInstance(),params.id);
        return new Response(data, {
            status: 200
        });
    } catch (e) {
        return new Response("一覧の取得に失敗しました",{
            status: 500
        });
    }
}