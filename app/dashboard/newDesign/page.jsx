import React from 'react'
import ImageSelect from './_components/ImageSelect'

function CreateNew() {
    return (
        <div>
            <h2 className='font-bold text-4xl text-center'>
                Smart AI, Stunning Spaces – Redesign Your Room Effortlessly!
            </h2>
            <p className='text-center text-gray-500 pt-4 font-semibold'>
                Transform any room with a click. Select space, choose a style, 
                and watch as AI reimagines your environment
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-10'>
                {/* Image Selection  */}
                    <ImageSelect />
                {/* Form input section  */}
            </div>
        </div>
    )
}

export default CreateNew
