// 'use client';
import { getList } from "@/features/list/get-files";
import CosmosDB from "@/repository/cosmosdb";
import Link from "next/link";
// import { useEffect, useState } from "react";

type ListItem = {
  id: string,
  title: string
}

enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}


export default async function Home() {
  // const [list, setList] = useState([] as ListItem[]);
  // const [fetchStatus, setFetchStatus] = useState(FetchStatus.LOADING);
  // useEffect(()=>{
    // fetch('/api/list',{next: {tags:["list"]}}).then(async (response: Response)=>{
    //   if(response.status !== 200) {
    //     setFetchStatus(FetchStatus.ERROR)
    //     return;
    //   }
    //   const data = await response.json();
    //   setList(data)
    //   setFetchStatus(FetchStatus.SUCCESS)
    // })
    
  // },[])
  const list = await getList(CosmosDB.getInstance());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
       {list.map((item, index) => (
        <div key={index}>
            <Link href={`/item/${item.id}`} key={index}>{item.title}</Link>
          </div>
        ))}
        {/* {fetchStatus === FetchStatus.SUCCESS && list.length > 0 && list.map((item, index) => (
          <div key={index}>
            <Link href={`/item/${item.id}`} key={index}>{item.title}</Link>
          </div>
        ))}
        {fetchStatus === FetchStatus.SUCCESS && list.length === 0 && <div>No data</div>}
        {fetchStatus === FetchStatus.LOADING && <div>Loading...</div>}
        {fetchStatus === FetchStatus.ERROR && <div>Error</div>} */}
      </div>
      <div>
        <Link href="/upload">Upload</Link>
      </div>
    </main>
  );
}
