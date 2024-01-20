import { IContainer } from "../container";

export async function getList(container: IContainer) {
    const blobList = await container.getFileList();
    return blobList;
}