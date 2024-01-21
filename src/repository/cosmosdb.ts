import { DBItem, IDatabase } from "@/features/database";
import { CosmosClient,Container } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

type Item = {
    id: string,
    title: string,
    blobItemName: string,
    _ts: number
}

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
                timestamp: item._ts
            }
        });
    }

    async getItemById(id: string): Promise<DBItem> {
        const itemResponse = await this.itemsContainer.item(id,id).read<Item>();
        if(itemResponse.statusCode === 404) {
            throw new Error(`Not Found Error: ${id}`);
        }
        const readDoc = itemResponse.resource;
        return {
            id: readDoc!.id,
            title: readDoc!.title,
            blobItemName: readDoc!.blobItemName,
            timestamp: readDoc!._ts
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
