import React from 'react'
import InterviewHeader from './_components/InterviewHeader'

export default function InterviewLayout({children}) {
  return (
    <div className='bg-secondary'>
        <InterviewHeader />
        {
            children
        }
    </div>
  )
}
