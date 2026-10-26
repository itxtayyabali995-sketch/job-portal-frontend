import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    
    const daysAgofunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiffernce = currentTime - createdAt;
        return Math.floor(timeDiffernce / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col justify-between'>
            <div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        {daysAgofunction(job?.createdAt) === 0 ? "Today" : `${daysAgofunction(job?.createdAt)} days ago`}
                    </p>
                    <Button variant='outline' className="rounded-full" size="icon"><Bookmark /></Button>
                </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button variant="outline" className="p-2 h-10 w-10 rounded-full">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} alt="logo" />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='font-medium text-lg'>{job?.company?.name || "Unknown Company"}</h1>
                        <p className='text-sm text-gray-500'>{job?.location || "Pakistan"}</p>
                    </div>
                </div>

                <div className='my-2'>
                    <h1 className='font-bold text-lg'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
                </div>

                <div className='flex items-center flex-wrap gap-2 mt-4'>
                    <span className="text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs">
                        {job?.position} Positions
                    </span>
                    <span className="text-[#F83002] font-bold bg-red-50 px-3 py-1 rounded-full text-xs">
                        {job?.jobType}
                    </span>
                    <span className="text-[#7209B7] font-bold bg-purple-50 px-3 py-1 rounded-full text-xs">
                        {job?.sellory} LPA
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-4 pt-3 border-t border-gray-100'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className="w-1/2">
                    Details
                </Button>
                <Button className="bg-[#7209B7] hover:bg-[#5e0798] text-white w-1/2">
                    Save for later
                </Button>
            </div>
        </div>
    )
}

export default Job