"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function ImageSelect({ onImageSelect }) {  // Accept callback as prop
    const defaultImage = "/imageUpload.png";
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const storedImage = localStorage.getItem("uploadedImage");
        if (storedImage) {
            setFile(storedImage);
            onImageSelect(storedImage);  // Pass stored image to parent on load
        }
    }, []);

    const onFileSelected = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setFile(imageUrl);
            localStorage.setItem("uploadedImage", imageUrl);
            onImageSelect(imageUrl);  // Pass new image URL to parent
        }
    };

    const resetImage = () => {
        setFile(null);
        localStorage.removeItem("uploadedImage");
        onImageSelect(null);  // Notify parent that image is reset
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
                    src={file || defaultImage}
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
            />
            {file && (
                <button
                    onClick={resetImage}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Reset Image
                </button>
            )}
        </div>
    );
}

export default ImageSelect;
