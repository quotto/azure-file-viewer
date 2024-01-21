import uploadFile from "@/features/upload/upload-file";
import AzureBlobContainer from "@/repository/azure-blob-container";
import CosmosDB from "@/repository/cosmosdb";
import { revalidatePath, revalidateTag } from "next/cache";
export const revalidate = 300;
export async function POST(request: Request) {
    const formData = await request.formData();
    const file: File = formData.get("file") as File;
    const title: string = formData.get("title") as string;
    if(!title) {
        return new Response("Missing title", {status: 400});
    }
    if(!file) {
        return new Response("Missing file", {status: 400});
    }
    return await file.arrayBuffer().then(async(buffer) => {
        // ファイルの拡張子を抽出する。image/pngのようになっているので、/で分割して後ろの要素を取得する
        const extension = file.type.split("/").pop() || "";
        if(await uploadFile(AzureBlobContainer.getInstance(),CosmosDB.getInstance(),Buffer.from(buffer), extension, title)) {
            revalidatePath("/");
            return new Response("アップロードしました", {status: 200});
        } else {
            return new Response("エラーが発生しました", {status: 500});
        }
    }).catch((e) => {
        console.log(e);
        return new Response("エラーが発生しました", {status: 500});
    });
}