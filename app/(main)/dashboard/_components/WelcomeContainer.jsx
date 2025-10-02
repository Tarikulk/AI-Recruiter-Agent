"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

export default function WelcomeContainer() {

    const {user} = useUser();

  return (
    <div className='bg-gray-100 p-3 rounded-2xl flex justify-between items-center'>
        <div>
            <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interview, Hassel-free Hiring</h2>
        </div>
        {user && <Image src={user?.picture} alt='user' height={40} width={40} className='rounded-full' />}
    </div>
  )
}
