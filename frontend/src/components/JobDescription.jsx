import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobslice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth);
    const [isApplied, setisApplied] = useState(false);

    const Params = useParams();
    const jobId = Params.id;
    const dispatch = useDispatch()

    useEffect(() => {
        if (singleJob?.applications && user?._id) {
            const applied = singleJob.applications.some(application => {
                const applicantId = application?.applicant?._id || application?.applicant || application;
                return applicantId?.toString() === user?._id?.toString();
            });
            setisApplied(applied);
        }
    }, [singleJob, user?._id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });

            if (res.data.success) {
                setisApplied(true); 
                const updatesingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatesingleJob)); 
                toast.success(res.data.message);

                const fetchUpdatedJob = async () => {
                    const resJob = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                    if (resJob.data.success) {
                        dispatch(setSingleJob(resJob.data.job));
                    }
                };
                fetchUpdatedJob();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <span className="text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs"> {singleJob?.position} Positions</span>
                        <span className="text-[#F83002] font-bold bg-red-50 px-3 py-1 rounded-full text-xs">{singleJob?.jobType}</span>
                        <span className="text-[#7209B7] font-bold bg-purple-50 px-3 py-1 rounded-full text-xs">{singleJob?.sellory} LPA</span>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={!singleJob || !user?._id || isApplied}
                    className={`rounded-lg text-white ${isApplied ? 'bg-gray-600 hover:bg-gray-600' : 'bg-[#7209B7] hover:bg-[#5f0798]'}`}
                >
                    {!singleJob || !user?._id ? 'Loading...' : (isApplied ? 'Already Applied' : 'Apply Now')}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4 '>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.sellory} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription