export type Item = {
    title: string,
    id: string
}
export interface IContainer {
    getFileList(): Promise<Item[]>,
    getFile(id: string): Promise<Buffer>,
    uploadFile(buffer: Buffer, fileName: string): Promise<void>
}