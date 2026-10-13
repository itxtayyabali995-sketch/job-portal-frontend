import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/components/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const UpdateJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        sellory: "",
        location: "",
        jobtype: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const params = useParams(); 
    const navigate = useNavigate();
    
    const { companies } = useSelector(store => store.company);
    const { allJobss } = useSelector(store => store.job);

    useEffect(() => {
        const job = allJobss.find((j) => j._id === params.id);
        if (job) {
            setInput({
                title: job.title || "",
                description: job.description || "",
                requirements: job.requirements || "",
                sellory: job.sellory || "",
                location: job.location || "",
                jobtype: job.jobtype || "",
                experience: job.experience || "",
                position: job.position || 0,
                companyId: job.company?._id || job.company || ""
            });
        }
    }, [params.id, allJobss]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Job update karne me masla aaya!");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <h1 className='font-bold text-xl mb-5'>Update Job</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label>Title</label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>Description</label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>Requirements</label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>Salary</label>
                            <Input type="number" name="sellory" value={input.sellory} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>Location</label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>Job Type</label>
                            <Input type="text" name="jobtype" value={input.jobtype} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>Experience Level (Years)</label>
                            <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <label>No of Position</label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        
                        {
                            companies.length > 0 && (
                                <div className='col-span-2'>
                                    <label>Select Company</label>
                                    <select 
                                        name="companyId" 
                                        value={input.companyId} 
                                        onChange={changeEventHandler}
                                        className="w-full mt-1 border border-gray-200 rounded-md h-10 px-3 bg-white"
                                        required
                                    >
                                        <option value="" disabled>Select a Company</option>
                                        {companies.map((company) => (
                                            <option key={company._id} value={company._id}>{company.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    <Button type="submit" className="w-full my-4 bg-black text-white hover:bg-gray-800">Update Job</Button>
                </form>
            </div>
        </div>
    )
}

export default UpdateJob