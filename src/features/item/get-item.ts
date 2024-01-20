import { IContainer } from "../container";

export async function getItem(container: IContainer, id: string): Promise<Buffer> {
    const fileList = await container.getFile(id);
    return fileList;
}