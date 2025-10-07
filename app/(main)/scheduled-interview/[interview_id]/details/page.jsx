"use client"

import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer'; 
import CandidatesList from './_components/CandidatesList';

export default function InterviewDetails() {

    const {interview_id} = useParams();

    const [interviewDetail, setInterviewDetail] = useState();

    const {user} = useUser();

    useEffect(() =>{
       if(user){
        getInterviewDetails()
       }
    }, [user])

    const getInterviewDetails = async() =>{
        const result = await supabase
        .from("Interviews")
        .select(
          `jobPosition, jobDescription, type, questionList, duration, interview_id, created_at, interview-feedback(userEmail, userName, feedback, created_at)`
        )
        .eq("userEmail", user?.email)
        .eq("interview_id", interview_id) 

        setInterviewDetail( result?.data[0])

        console.log(result)
    }

  return (
    <div>
        <h2>Interview Detail</h2>
        <InterviewDetailContainer interviewDetail={interviewDetail} />
        <CandidatesList candidatesList={interviewDetail?.['interview-feedback']} />
    </div>
  )
}