import { Code2Icon, LayoutDashboard } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: "Scheduled Interview",
        icon: LayoutDashboard,
        path: '/scheduled-interview'
    },
    {
        name: "All Interview",
        icon: LayoutDashboard,
        path: '/all-interview'
    },
    {
        name: "Billing",
        icon: LayoutDashboard,
        path: '/billing'
    },
    {
        name: "Settings",
        icon: LayoutDashboard,
        path: '/settings'
    }
]


export const InterviewType = [
    {
        title: "Technical",
        icon: Code2Icon
    },
    {
        title: "Experience",
        icon: Code2Icon
    },
    {
        title: "Non",
        icon: Code2Icon
    },
    {
        title: "Wish",
        icon: Code2Icon
    },
    {
        title: "Example",
        icon: Code2Icon
    },
    {
        title: "Test",
        icon: Code2Icon
    },
]


export const QUESTION_PROMPT = `You are an expert technical interviewer. 
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

🌿 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:"",
  type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
},
...
] 

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`
