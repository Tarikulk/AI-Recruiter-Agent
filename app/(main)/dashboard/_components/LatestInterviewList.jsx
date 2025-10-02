"use client"
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';
import React, { useState } from 'react'

export default function LatestInterviewList() {

    const [interviewList, setInterviewList] = useState([]);

  return (
    <div className='my-5'>
        <h2>Previously create interview</h2>

        {
            interviewList?.length == 0 && <div className='p-5 flex flex-col gap-3 items-center bg-gray-100'>
                <Video className='h-10 w-10 text-primary' />
                <h2>You don't have any interview created!</h2>
                <Button>Create new interview</Button>
            </div>
        }
    </div>
  )
}
