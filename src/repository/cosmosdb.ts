import { DBItem, IDatabase } from "@/features/database";
import { CosmosClient,Container } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

export default class CosmosDB implements IDatabase {
    private static instance: CosmosDB;
    private dbclient: CosmosClient;
    private itemsContainer: Container;
    private constructor() {
        if(!process.env.COSMOSDB_ENDPOINT) {
            throw new Error("COSMOSDB_ENDPOINT is not set");
        }
        const credential = new DefaultAzureCredential();

        this.dbclient = new CosmosClient({
            endpoint: process.env.COSMOSDB_ENDPOINT,
            aadCredentials: credential
        });

        this.itemsContainer = this.dbclient.database("items").container("items");
    }
    async saveItem(id: string, blobItemName: string, title: string): Promise<void> {
        console.log("saveItem")
        await this.itemsContainer.items.upsert({
            id: id,
            title: title,
            blobItemName: blobItemName,
            updatedAt: new Date().toISOString()
        })
    }

    async getItems(): Promise<DBItem[]> {
        const response = await this.itemsContainer.items.query("SELECT * FROM c").fetchAll();
        return response.resources.map((item) => {
            return {
                id: item.id,
                title: item.title,
                blobItemName: item.blobItemName,
                updatedAt: item.updatedAt
            }
        });
    }

    async getItemById(id: string): Promise<DBItem> {
        const response = await this.itemsContainer.item(id).read();
        const item = response.resource;
        return {
            id: item.id,
            title: item.title,
            blobItemName: item.blobItemName,
            updatedAt: item.updatedAt
        }
    }

    async deleteItemById(id: string): Promise<void> {
        await this.itemsContainer.item(id).delete();
    }

    static getInstance(): CosmosDB {
        if (!CosmosDB.instance) {
            CosmosDB.instance = new CosmosDB();
        }
        return CosmosDB.instance;
    }
}
