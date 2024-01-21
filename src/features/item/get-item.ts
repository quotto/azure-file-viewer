import { IContainer } from "../container";
import { IDatabase } from "../database";

export async function getItem(container: IContainer,database: IDatabase, id: string): Promise<Buffer> {
    const savedItem = await database.getItemById(id);
    const filedata = await container.getFile(savedItem.blobItemName);
    return filedata;
}