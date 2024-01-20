export type DBItem = {
    id: string,
    title: string,
    blobItemName: string,
    updatedAt: string
}
export interface IDatabase {
    saveItem(id: string, blobItemName: string, title: string): Promise<void>,
    getItems(): Promise<DBItem[]>,
    getItemById(id: string): Promise<DBItem>
    deleteItemById(id: string): Promise<void>
}