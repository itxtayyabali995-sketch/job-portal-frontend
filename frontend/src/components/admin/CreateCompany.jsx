import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />
            <div className='max-w-4xl mx-4 sm:mx-auto my-10 bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm'>
                <div className='my-5'>
                    <h1 className='font-bold text-xl sm:text-2xl text-gray-800'>Your Company Name</h1>
                    <p className='text-gray-500 text-sm sm:text-base mt-1'>What would you like to name your company? You can change this later.</p>
                </div>

                <div className='space-y-2 my-6'>
                    <Label className="font-medium text-gray-700">
                        Company Name
                    </Label>
                    <Input
                        type="text"
                        className="w-full"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className='flex items-center gap-4 my-8'>
                    <Button 
                        variant='outline' 
                        onClick={() => navigate("/admin/companies")}
                        className="w-1/2 sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={registerNewCompany} 
                        className="text-white bg-black hover:bg-gray-800 w-1/2 sm:w-auto"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany