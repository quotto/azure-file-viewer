import uploadFile from "@/features/upload/upload-file";
import { getContainerInstance } from "@/repository/azure-blob-container";
export const config = {
    api: {
        bodyParser: false
    }
}
export async function POST(request: Request) {
    const formData = await request.formData();
    const file: File = formData.get("file") as File;
    if (!file) {
        return new Response("Missing file", {status: 400});
    }
    return await file.arrayBuffer().then(async(buffer) => {
        // ファイルの拡張子を抽出する。image/pngのようになっているので、/で分割して後ろの要素を取得する
        const extension = file.type.split("/").pop() || "";
        if(await uploadFile(getContainerInstance(),Buffer.from(buffer), extension)) {
            return new Response("アップロードしました", {status: 200});
        } else {
            return new Response("エラーが発生しました", {status: 500});
        }
    }).catch((e) => {
        console.log(e);
        return new Response("エラーが発生しました", {status: 500});
    });
}