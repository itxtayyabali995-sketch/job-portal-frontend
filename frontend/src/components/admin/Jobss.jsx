import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchJobByText } from '@/redux/jobslice'
import JobssTable from './JobssTable'

const Jobss = () => {

    const [input, setInput] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setsearchJobByText(input))

    }, [input, dispatch])


    return (
        <div>

            <Navbar />

            <div className='max-w-6xl mx-auto my-10'>

                <div className='flex items-center justify-between my-5'>

                    <Input
                        className="w-fit"
                        placeholder='Filter by company or job role'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="bg-black text-white"
                    >
                        New Job
                    </Button>

                </div>

                <JobssTable />

            </div>

        </div>
    )
}

export default Jobss