import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <div className='p-5 shadow-md flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Image src="/logo.svg" width={50} height={50} priority={true} alt="Logo" />
                <h2 className='font-bold text-lg'>AI Interior Design</h2>
            </div>
            <div>
                <UserButton />
            </div>
        </div>
    )
}

export default Header
