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
import store from '@/redux/store'
import UseGetAllAppliedJobs from '@/hooks/UseGetAllAppliedJobs'

const isResume = true;
const Profile = () => {
    UseGetAllAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKFj32h7lhHJfHmUkCVuX4Ulk2MTiP_nJvLpakGWdyfW6VGPrf0oXcGgg&s=10" />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant='outline'><Pen />Edit</Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-lg mb-2'>Skills</h1>
                    <div className='flex items-center gap-2'>
                        {
                            user?.profile?.skills?.length > 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge key={index} className="bg-black text-white hover:bg-gray-800 rounded-full">
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span>NA</span>
                            )
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume ? (
                            <a
                                target='blank'
                                href={user?.profile?.resume}
                                className='text-blue-500 w-full hover:underline cursor-pointer'
                            >
                                {user?.profile?.resumeOriginalName || "Download Resume"}
                            </a>
                        ) : (
                            <span>NA</span>
                        )
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedjobTable />
            </div>
            {open && <UpdateProfileDialog open={open} setOpen={setOpen} />}
        </div>
    )
}

export default Profile