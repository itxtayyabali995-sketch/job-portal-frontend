import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/components/utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner' 
import { Loader2 } from 'lucide-react'

const PostJob = () => {
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

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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
            toast.error(error.response?.data?.message || "Something went wrong"); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />
            <div className='flex items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
                <form onSubmit={submitHandler} className='p-6 sm:p-8 w-full border border-gray-200 shadow-sm rounded-xl bg-white'>
                    <h1 className='font-bold text-xl sm:text-2xl text-gray-800 mb-6'>Post a New Job</h1>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Title</label>
                            <Input 
                                type="text" 
                                name="title" 
                                value={input.title} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. Frontend Developer"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Description</label>
                            <Input 
                                type="text" 
                                name="description" 
                                value={input.description} 
                                onChange={changeEventHandler} 
                                placeholder="Job description"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Requirements</label>
                            <Input 
                                type="text" 
                                name="requirements" 
                                value={input.requirements} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. React, Node.js, MongoDB"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Salary (LPA)</label>
                            <Input 
                                type="number" 
                                name="sellory" 
                                value={input.sellory} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. 12"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Location</label>
                            <Input 
                                type="text" 
                                name="location" 
                                value={input.location} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. Lahore"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Job Type</label>
                            <Input 
                                type="text" 
                                name="jobtype" 
                                value={input.jobtype} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. Full-time"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>Experience Level (Years)</label>
                            <Input 
                                type="number" 
                                name="experience" 
                                value={input.experience} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. 2"
                                className="w-full"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='font-medium text-gray-700 text-sm'>No of Positions</label>
                            <Input 
                                type="number" 
                                name="position" 
                                value={input.position} 
                                onChange={changeEventHandler} 
                                placeholder="e.g. 3"
                                className="w-full"
                            />
                        </div>
                        
                        {
                            companies.length > 0 && (
                                <div className='col-span-1 sm:col-span-2 space-y-1'>
                                    <label className='font-medium text-gray-700 text-sm'>Select Company</label>
                                    <select 
                                        name="companyId" 
                                        value={input.companyId} 
                                        onChange={changeEventHandler}
                                        className="w-full mt-1 border border-input rounded-md h-10 px-3 bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-ring"
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

                    {
                        companies.length === 0 && (
                            <p className='text-red-600 text-xs font-semibold my-3'>
                                *Please register a company first, before posting a job
                            </p>
                        )
                    }

                    {
                        loading ? (
                            <Button type="button" className="w-full my-6 bg-black text-white" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-6 bg-black text-white hover:bg-gray-800">
                                Post New Job
                            </Button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob