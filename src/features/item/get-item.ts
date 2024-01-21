import { IContainer } from "../container";
import { IDatabase } from "../database";

export async function getItem(container: IContainer, id: string): Promise<Buffer> {
    const filedata = await container.getFile(id);
    return filedata;
}