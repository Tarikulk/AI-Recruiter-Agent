import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'> 
        <Link href={"/dashboard/create-interview"} className='bg-gray-100 border-gray-200 rounded-lg p-5 cursor-pointer'>
            <Video className='p-3 text-2xl text-primary bg-white rounded-lg h-10 w-10'/>
            <h2>Create New Interview</h2>
            <p className='text-gray-500'>Create AI interview and scheduled then with Candidates</p>
        </Link>
        <div className='bg-gray-100 border-gray-200 rounded-lg p-5'>
            <Phone className='p-3 text-2xl text-primary bg-white rounded-lg h-10 w-10'/>
            <h2>Create Phone Screening call</h2>
            <p className='text-gray-500'>Scheduled phone screening call with candidate</p>
        </div>
    </div>
  )
}
