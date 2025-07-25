"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import ImageSelect from './_components/ImageSelect'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { useRouter } from 'next/navigation';


function CreateNew() {
    const router = useRouter();
    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (value, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))

        console.log(formData);
    }
    // const [formData, setFormData] = useState({
    //     image: null,
    //     roomType: "",
    //     design: "",
    //     requirements: ""
    // });

    const GenerateAiImage = async () => {
        console.log("formData before API call:", formData);
        if (!formData.image || !formData.roomType || !formData.design || !formData.requirements) {
            alert("Please fill all fields before generating.");
            return;
        }
        try {
            const result = await axios.post('/api/redesign-room', {
                imageUrl: formData.image,
                roomType: formData.roomType,
                designType: formData.design,
                requirements: formData.requirements
            });
            console.log(result.data);
            router.push('/dashboard');
        } catch (err) {
            console.error("API error:", err.response?.data || err.message);
        }
    };
    

    // const toBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);  // reads file as base64
    //         reader.onload = () => {
    //             const base64 = reader.result.split(',')[1];  // remove "data:image/png;base64," part
    //             resolve(base64);
    //         };
    //         reader.onerror = reject;
    //     });
    // };


    return (
        <div>
            <h2 className='font-bold text-4xl text-center'>
                Smart AI, Stunning Spaces – Redesign Your Room Effortlessly!
            </h2>
            <p className='text-center text-gray-500 pt-4 font-semibold'>
                Transform any room with a click. Select space, choose a style,
                and watch as AI reimagines your environment
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-8 gap-10'>
                <ImageSelect onImageSelect={(value) => onHandleInputChange(value, 'image')} />

                <div className='mt-6'>

                    <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />

                    <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'design')} />

                    <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'requirements')} />

                    <Button className="mt-4 w-full bg-purple-300 text-black text-base"
                        onClick={GenerateAiImage}>Generate</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateNew
