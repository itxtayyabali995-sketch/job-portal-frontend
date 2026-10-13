import React from 'react'
import { useNavigate } from 'react-router-dom'

const LatestJobcard = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>

            {/* Company */}
            <div>
                <h1 className='font-medium text-lg'>
                    {job?.company?.name}
                </h1>

                <p className='text-sm text-gray-500'>
                    {job?.location}
                </p>
            </div>

            {/* Job Details */}
            <div>
                <h1 className='font-bold text-lg my-2'>
                    {job?.title}
                </h1>

                <p className='text-sm text-gray-600'>
                    {job?.description}
                </p>
            </div>

            {/* Job Information */}
            <div className='flex items-center gap-2 mt-4'>

                <span className='text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs'>
                    {job?.position} Positions
                </span>

                <span className='text-[#F83002] font-bold bg-red-50 px-3 py-1 rounded-full text-xs'>
                    {job?.jobType}
                </span>

                <span className='text-[#7209B7] font-bold bg-purple-50 px-3 py-1 rounded-full text-xs'>
                    {job?.sellory} LPA
                </span>

            </div>
        </div>
    )
}

export default LatestJobcard