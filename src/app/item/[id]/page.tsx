'use client';
import { useEffect, useState } from "react";
import { getItem } from "@/features/item/get-item";
import AzureBlobContainer from "@/repository/azure-blob-container";
import CosmosDB from "@/repository/cosmosdb";
import { ResourceResponse } from "@azure/cosmos";

enum LoadStatus {
    LOADING,
    SUCCESS,
    ERROR
}
export default function Item({params}: {params: {id: string}}) {
    const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING);
    const [image, setImage] = useState<Buffer>();
    useEffect(() => {
        fetch(`/api/item/${params.id}`).then(async (response: Response) => {
            if(response.status !== 200) {
                setLoadStatus(LoadStatus.ERROR);
                return;
            }
            const data = await response.arrayBuffer();
            setImage(Buffer.from(data));
            setLoadStatus(LoadStatus.SUCCESS);
        }).catch((err) => {
            console.log(err);
            setLoadStatus(LoadStatus.ERROR);
        });
    });
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {loadStatus === LoadStatus.SUCCESS && <img src={`data: "image/png"; base64, ${image?.toString("base64")}`} />}
        </main>
    );
}