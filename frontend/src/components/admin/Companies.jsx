import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import UseGetAllCompanies from '@/hooks/UseGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    UseGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setsearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />

            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6'>
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 my-5'>
                    <Input
                        className="w-full sm:w-fit sm:min-w-[300px]"
                        placeholder='Filter by name'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        onClick={() => navigate("/admin/companies/create")} 
                        className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                    >
                        New Company
                    </Button>
                </div>

                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies