import { IContainer } from "../container";
import { v4 } from "uuid";
import { IDatabase } from "../database";

export default async function uploadFile(container: IContainer,database: IDatabase,buffer: Buffer, fileType: string, title: string): Promise<boolean> {
    try {
        const id = v4();
        const itemName = `${id}.${fileType}`;
        await container.uploadFile(buffer, itemName);
        await database.saveItem(id, itemName, title);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}