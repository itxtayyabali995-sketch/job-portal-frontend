import React from 'react'
import LatestJobcard from './LatestJobcard';
import { useSelector } from 'react-redux';

const LatestJobs = () => { 
    const { allJobs } = useSelector(store => store.job); 
    
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-20'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-6'>
                {
                    allJobs?.length <= 0 ? (
                        <span className='text-gray-500 text-sm sm:text-base'>No Job Available</span>
                    ) : (
                        allJobs?.slice(0, 6).map((item) => (
                            <LatestJobcard key={item?._id} job={item} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs