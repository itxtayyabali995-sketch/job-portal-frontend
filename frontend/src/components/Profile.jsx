import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedjobTable from './AppliedjobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import UseGetAllAppliedJobs from '@/hooks/UseGetAllAppliedJobs'

const Profile = () => {
    UseGetAllAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='overflow-x-hidden min-h-screen bg-gray-50/50 pb-10'>
            <Navbar />

            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 mx-4 sm:mx-auto p-6 sm:p-8 shadow-sm'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKFj32h7lhHJfHmUkCVuX4Ulk2MTiP_nJvLpakGWdyfW6VGPrf0oXcGgg&s=10"} alt="profile" />
                        </Avatar>

                        <div>
                            <h1 className='font-bold text-xl sm:text-2xl text-gray-800'>{user?.fullname}</h1>
                            <p className='text-gray-600 text-sm sm:text-base mt-1'>{user?.profile?.bio || "No bio added yet."}</p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)} variant='outline' className="flex items-center gap-2">
                        <Pen className='h-4 w-4' /> Edit Profile
                    </Button>
                </div>

                <div className='my-6 space-y-2'>
                    <div className='flex items-center gap-3 text-gray-700 text-sm sm:text-base'>
                        <Mail className='h-4 w-4 text-gray-500' />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-700 text-sm sm:text-base'>
                        <Contact className='h-4 w-4 text-gray-500' />
                        <span>{user?.phoneNumber || "N/A"}</span>
                    </div>
                </div>

                <div className='my-6'>
                    <h1 className='font-bold text-lg mb-2 text-gray-800'>Skills</h1>
                    <div className='flex items-center flex-wrap gap-2'>
                        {
                            user?.profile?.skills?.length > 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge key={index} className="bg-black text-white hover:bg-gray-800 rounded-full px-3 py-1 text-xs">
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className='text-gray-500 text-sm'>NA</span>
                            )
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5 mt-6'>
                    <Label className="text-md font-bold text-gray-800">Resume</Label>
                    {
                        user?.profile?.resume ? (
                            <a
                                target='_blank'
                                rel='noopener noreferrer'
                                href={user?.profile?.resume}
                                className='text-blue-600 w-full hover:underline cursor-pointer text-sm sm:text-base truncate'
                            >
                                {user?.profile?.resumeOriginalName || "Download Resume"}
                            </a>
                        ) : (
                            <span className='text-gray-500 text-sm'>NA</span>
                        )
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mx-4 sm:mx-auto p-6 sm:p-8 shadow-sm my-6'>
                <h1 className='font-bold text-xl mb-4 text-gray-800'>Applied Jobs</h1>
                <AppliedjobTable />
            </div>

            {open && <UpdateProfileDialog open={open} setOpen={setOpen} />}
        </div>
    )
}

export default Profile