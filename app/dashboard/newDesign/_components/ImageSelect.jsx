"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function ImageSelect({ onImageSelect }) {
    const defaultImage = "/imageUpload.png";
    const [fileUrl, setFileUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const onFileSelected = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        setUploading(true);

        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`; // Folder path inside 'images' bucket

        // Upload to Supabase Storage
        const { error } = await supabase.storage
            .from("images")
            .upload(filePath, selectedFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            alert("Upload failed: " + error.message);
            setUploading(false);
            return;
        }

        // Get the public URL of the uploaded file
        const { data } = supabase.storage
            .from("images")
            .getPublicUrl(filePath);

        setFileUrl(data.publicUrl);
        onImageSelect(data.publicUrl);
        setUploading(false);
    };


    const resetImage = () => {
        setFileUrl(null);
        onImageSelect(null);
    };

    return (
        <div className="mt-3 flex flex-col items-center">
            <div className="font-semibold text-2xl pb-4">
                <label htmlFor="upload-image">Select Image of your room</label>
            </div>
            <div
                className="p-4 w-80 h-80 rounded-xl border-dotted
                flex justify-center border-blue-500 border-2 bg-slate-200 
                cursor-pointer hover:shadow-lg"
                onClick={() => fileInputRef.current?.click()}
            >
                <Image
                    src={fileUrl || defaultImage}
                    width={300}
                    height={300}
                    alt="upload-image"
                    className="object-cover rounded-lg"
                />
            </div>
            <input
                type="file"
                accept="image/*"
                id="upload-image"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={onFileSelected}
                disabled={uploading}
            />
            {fileUrl && (
                <button
                    onClick={resetImage}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Reset Image
                </button>
            )}
            {uploading && <div className="mt-2 text-blue-500">Uploading...</div>}
        </div>
    );
}

export default ImageSelect;