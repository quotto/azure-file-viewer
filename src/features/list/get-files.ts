import { IContainer } from "../container";
import { IDatabase } from "../database";

export type Item = {
    id: string,
    title: string,
    blobItemName: string,
    updatedAt: string
}
export async function getList(database: IDatabase) {
    const itemsList = await database.getItems();
    return itemsList.map((item) => {
        return {
            id: item.id,
            title: item.title,
            blobItemName: item.blobItemName,
            updatedAt: new Date(item.timestamp).toISOString()
        }
    });
}