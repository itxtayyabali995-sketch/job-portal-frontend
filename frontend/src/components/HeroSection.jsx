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
        <div className='flex flex-col gap-5 my-10 px-4'>
            <div className='text-center'>
                <span className='inline-block mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-xs sm:text-sm'>
                    No. 1 Job Hunt Website
                </span>
                
                <h1 className='text-3xl sm:text-4xl md:text-5xl mt-5 font-bold leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                
                <p className='mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto'>
                    Connect with top employers and discover thousands of job opportunities. Take the next step in your career with confidence.
                </p>

                <div className='flex w-full sm:w-[80%] md:w-[50%] mt-5 shadow-lg border border-gray-200 rounded-full items-center mx-auto overflow-hidden bg-white'>
                    <input
                        type="text"
                        placeholder='Find Your Dream Jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-4 sm:px-6 py-3 text-gray-700 bg-transparent text-sm sm:text-base'
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full rounded-l-none bg-[#6A38C2] hover:bg-[#5a2fb0] px-5 sm:px-6 py-6 h-full'>
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection