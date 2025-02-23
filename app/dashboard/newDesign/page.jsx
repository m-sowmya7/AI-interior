"use client"
import React, { useState }from 'react'
import { Button } from '@/components/ui/button'
import ImageSelect from './_components/ImageSelect'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'

function CreateNew() {

    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (value, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName] : value
        }))

        console.log(formData);
    }
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

                        <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')}/>

                        <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'design')}/>

                        <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'requirements')}/>

                    <Button className="mt-4 w-full bg-purple-300 text-black text-base">Generate</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateNew
