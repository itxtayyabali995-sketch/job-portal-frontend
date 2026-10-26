import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchedQuery } from '@/redux/jobslice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.job);

    useEffect(() => {
        return () => {
            dispatch(setsearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
                <h1 className='font-bold text-xl sm:text-2xl my-5 text-gray-800'>
                    Search Results ({allJobs.length})
                </h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        allJobs.length === 0 ? (
                            <span className='text-gray-500'>No jobs found.</span>
                        ) : (
                            allJobs.map((job) => {
                                return (
                                    <Job key={job?._id} job={job} />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse