import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job)

    const [selectedFilters, setSelectedFilters] = useState({
        location: "",
        Industry: "",
        Salary: ""
    })

    const filteredJobs = allJobs?.filter((job) => {
        const locationMatch =
            !selectedFilters.location ||
            job?.location?.toLowerCase() === selectedFilters.location.toLowerCase()

        const industryText = `
            ${job?.title || ""}
            ${job?.description || ""}
            ${(job?.requirements || []).join(" ")}
        `.toLowerCase()

        let industryMatch = true
        if (selectedFilters.Industry) {
            industryMatch = industryText.includes(selectedFilters.Industry.toLowerCase())
        }

        const salary = Number(job?.sellory || 0)
        let salaryMatch = true

        if (selectedFilters.Salary === "0-40k") {
            salaryMatch = salary >= 0 && salary <= 40000
        } else if (selectedFilters.Salary === "42k-1lakh") {
            salaryMatch = salary >= 42000 && salary <= 100000
        } else if (selectedFilters.Salary === "1lakh-2lakh") {
            salaryMatch = salary >= 100000 && salary <= 200000
        } else if (selectedFilters.Salary === "3lakh-4lakh") {
            salaryMatch = salary >= 300000 && salary <= 400000
        } else if (selectedFilters.Salary === "5lakh") {
            salaryMatch = salary >= 500000
        }

        return locationMatch && industryMatch && salaryMatch
    })

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6'>
                <div className='flex flex-col md:flex-row gap-5'>
                    
                    <div className='w-full md:w-[25%] lg:w-[20%]'>
                        <FilterCard
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />
                    </div>

                    {
                        filteredJobs?.length === 0 ? (
                            <div className='flex-1 flex items-center justify-center py-20'>
                                <span className='text-gray-500 text-lg font-medium'>
                                    Job not found
                                </span>
                            </div>
                        ) : (
                            <div className='flex-1 md:h-[85vh] md:overflow-y-auto pb-5 pr-0 md:pr-2'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filteredJobs.map((job) => (
                                            <motion.div
                                                key={job?._id}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Jobs