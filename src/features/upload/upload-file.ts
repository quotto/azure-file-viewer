import { IContainer } from "../container";
import { v4 } from "uuid";

export default async function uploadFile(container: IContainer,buffer: Buffer, fileType: string): Promise<boolean> {
    try {
        const id = v4();
        await container.uploadFile(buffer, `${id}.${fileType}`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}