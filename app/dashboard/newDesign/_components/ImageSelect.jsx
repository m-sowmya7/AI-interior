"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

function ImageSelect() {
    const defaultImage = '/imageUpload.png';
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    // Load stored image from localStorage on mount
    useEffect(() => {
        const storedImage = localStorage.getItem("uploadedImage");
        if (storedImage) {
            setFile(storedImage);
        }
    }, []);

    // Handle file selection
    const onFileSelected = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setFile(imageUrl);
            localStorage.setItem("uploadedImage", imageUrl);
        }
    };

    // Reset to default image
    const resetImage = () => {
        setFile(null);
        localStorage.removeItem("uploadedImage");
    };

    return (
        <div className="mt-3 flex flex-col items-center">
            <div className="font-semibold text-2xl pb-4">
                <label htmlFor="upload-image">Select Image of your room</label>
            </div>
            <div 
                className="p-4 w-80 h-80 rounded-xl border-dotted
                flex justify-center border-black border-2 bg-slate-200 
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
