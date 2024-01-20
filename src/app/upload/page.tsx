'use client';
import React, { useState } from "react";

enum UploadStatus {
    UPLOADING,
    SUCCESS,
    ERROR
}

export default function Upload() {
    const [file, setFile] = useState<File>()
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.UPLOADING)
    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setFile(e.target.files[0])
    }
    const uploadFile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus(UploadStatus.ERROR);
        }
        const formData = new FormData();
        formData.append("file", file!);
        fetch("/api/upload", {
            method: "POST",
            body: formData
        }).then((res) => {
            if (res.ok) {
                setUploadStatus(UploadStatus.SUCCESS);
            } else {
                setUploadStatus(UploadStatus.ERROR);
            }
        }).catch(() => {
            setUploadStatus(UploadStatus.ERROR);
        });
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={uploadFile}>
                <input type="file" name="file" onChange={changeFile}  />
                <button type="submit">Upload</button>
            </form>
            {uploadStatus === UploadStatus.ERROR && <p>Upload failed</p>}
            {uploadStatus === UploadStatus.SUCCESS && <p>Upload succeeded</p>}
        </main>
    );
}