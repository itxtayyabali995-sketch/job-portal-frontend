import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setsearchedQuery } from '@/redux/jobslice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setsearchedQuery(query));
        navigate("/browse")
    }

    return (
        <div className='flex flex-col gap-5 my-10'>
            <div className='text-center'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl mt-5 font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='mt-3 text-gray-600'>Connect with top employers and discover thousands of job opportunities. Take the next step in your career with confidence.</p>

                {/* Search Bar Container */}
                <div className='flex w-[40%] mt-5 shadow-lg border border-gray-200 rounded-full items-center mx-auto overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Find Your Dream Jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-6 py-3 text-gray-700 bg-transparent'
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full rounded-l-none bg-[#6A38C2] hover:bg-[#5a2fb0] px-6 py-6 h-full'>
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection