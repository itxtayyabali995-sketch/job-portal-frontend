import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetcompanybyid from '@/hooks/useGetcompanybyid';

const CompanySetup = () => {
    const params = useParams();
    const navigate = useNavigate();

    useGetcompanybyid(params.id);

    const { singleCompany } = useSelector((store) => store.company);

    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || '',
                description: singleCompany.description || '',
                website: singleCompany.website || '',
                location: singleCompany.location || '',
                file: null,
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0] || null;
        setInput({
            ...input,
            file,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.name.trim()) {
            toast.error('Company name is required');
            return;
        }

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        ...(token && {
                            Authorization: `Bearer ${token}`,
                        }),
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(
                    res.data.message || 'Company information updated successfully'
                );
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error(
                'Update Company Error:',
                error.response?.data || error.message
            );

            if (error.response?.status === 401) {
                toast.error('Unauthorized. Please login again.');
            } else {
                toast.error(
                    error.response?.data?.message ||
                    error.response?.data?.messege ||
                    'Something went wrong'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />

            <div className="max-w-xl mx-4 sm:mx-auto my-10 bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm">
                <form onSubmit={submitHandler}>

                    <div className="flex items-center gap-5 mb-6">
                        <Button
                            type="button"
                            onClick={() => navigate('/admin/companies')}
                            variant="outline"
                            className="flex items-center gap-2 font-semibold text-gray-600"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>

                        <h1 className="font-bold text-xl sm:text-2xl text-gray-800">
                            Company Setup
                        </h1>
                    </div>

                    <div className="mb-4 space-y-1">
                        <Label className="font-medium text-gray-700">Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            placeholder="Enter company name"
                        />
                    </div>

                    <div className="mb-4 space-y-1">
                        <Label className="font-medium text-gray-700">Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            placeholder="Enter company description"
                        />
                    </div>

                    <div className="mb-4 space-y-1">
                        <Label className="font-medium text-gray-700">Website</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="mb-4 space-y-1">
                        <Label className="font-medium text-gray-700">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            placeholder="Enter company location"
                        />
                    </div>

                    {singleCompany?.logo && (
                        <div className="mb-4">
                            <Label className="font-medium text-gray-700">Current Logo</Label>
                            <div className="mt-2">
                                <img
                                    src={singleCompany.logo}
                                    alt="Company Logo"
                                    className="w-20 h-20 object-contain border rounded-md p-1 bg-gray-50"
                                />
                            </div>
                        </div>
                    )}

                    <div className="mb-6 space-y-1">
                        <Label className="font-medium text-gray-700">Logo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Leave empty if you don't want to change the logo.
                        </p>
                    </div>

                    {loading ? (
                        <Button
                            type="button"
                            className="w-full my-4 bg-black text-white"
                            disabled
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full my-4 bg-black text-white hover:bg-gray-800"
                        >
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;