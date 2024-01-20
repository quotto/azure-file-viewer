'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

type ListItem = {
  id: string,
  title: string
}

enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export default function Home() {
  const [list, setList] = useState([] as ListItem[]);
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.LOADING);
  useEffect(()=>{
    fetch('/api/list').then(async (response: Response)=>{
      if(response.status !== 200) {
        setFetchStatus(FetchStatus.ERROR)
        return;
      }
      const data = await response.json();
      console.log(JSON.stringify(data));
      setList(data)
      setFetchStatus(FetchStatus.SUCCESS)
    })
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {fetchStatus === FetchStatus.SUCCESS && list.length > 0 && list.map((item, index) => (
          <div>
            <Link href={`/item/${item.id}`} key={index}>{item.title}</Link>
          </div>
        ))}
        {fetchStatus === FetchStatus.SUCCESS && list.length === 0 && <div>No data</div>}
        {fetchStatus === FetchStatus.LOADING && <div>Loading...</div>}
        {fetchStatus === FetchStatus.ERROR && <div>Error</div>}
      </div>
      <div>
        <Link href="/upload">Upload</Link>
      </div>
    </main>
  );
}
