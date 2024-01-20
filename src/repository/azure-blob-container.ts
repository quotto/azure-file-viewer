import { IContainer, Item } from "@/features/container";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export default class AzureBlobContainer implements IContainer {
    private static instance: AzureBlobContainer;
    private container: ContainerClient
    constructor()  {
        if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
            throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
        }
        this.container = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING).getContainerClient('items');
    }
    async getFileList(): Promise<Item[]> {
        console.log("getFileList")
        const blobs = this.container.listBlobsFlat();
        const blobList = [];
        for await (const blob of blobs) {
            blobList.push({
                title: blob.name,
                id: blob.name
            })
        }
        return blobList;
    }
    async getFile(id: string): Promise<Buffer> {
        const blobClient = this.container.getBlobClient(id);
        const downloadBlockBlobResponse = await blobClient.downloadToBuffer();
        return downloadBlockBlobResponse;
        }
    async uploadFile(buffer: Buffer, fileName: string): Promise<void> {
        const blockBlobClient = this.container.getBlockBlobClient(fileName);
        await blockBlobClient.upload(buffer, buffer.length);
    }

    static getInstance(): AzureBlobContainer {
        if (!AzureBlobContainer.instance) {
            console.log("create instance");
            AzureBlobContainer.instance = new AzureBlobContainer();
        }
        return AzureBlobContainer.instance;
    }
}
