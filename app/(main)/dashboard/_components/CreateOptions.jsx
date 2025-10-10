import { Phone, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CreateOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Create AI Interview */}
      <Link
        href="/dashboard/create-interview"
        className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
          <Video className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Create New Interview</h2>
        <p className="text-gray-500 text-sm">
          Create AI interview and schedule it with candidates.
        </p>
      </Link>

      {/* Phone Screening */}
      <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
          <Phone className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Create Phone Screening Call</h2>
        <p className="text-gray-500 text-sm">
          Schedule a phone screening call with a candidate.
        </p>
      </div>
    </div>
  );
}
