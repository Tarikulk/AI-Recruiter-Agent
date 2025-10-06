import Image from 'next/image'
import React from 'react'

export default function InterviewHeader() {
  return (
    <div className='p-3 shadow-sm'>
        <Image src={"/logo.jpeg"}  alt='logo' className='w-[140px]' width={100}  height={100} />
        
    </div>
  )
}
