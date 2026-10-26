import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '@/components/utils/constant'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const dispatch = useDispatch()
    const { companies = [], searchCompanyByText } = useSelector(store => store.company);
    const [filtercompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    const deleteCompanyHandler = async (companyId) => {
        try {
            const res = await axios.delete(
                `${COMPANY_API_END_POINT}/delete/${companyId}`,
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                const updatedCompanies = companies.filter(
                    (company) => company._id !== companyId
                );

                dispatch({
                    type: "company/setCompanies",
                    payload: updatedCompanies
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Failed to delete company"
            );
        }
    };

    useEffect(() => {
        const filteredCompany = companies.filter(company => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className='overflow-x-auto w-full bg-white rounded-lg border border-gray-100 shadow-sm'>
            <Table>
                <TableCaption>A list of your recent registered companies.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filtercompany.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                    You haven't registered any company yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtercompany.map((company) => (
                                <TableRow key={company?._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company?.logo} alt="logo" />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{company?.name}</TableCell>
                                    <TableCell>{company?.createdAt ? company.createdAt.split("T")[0] : "N/A"}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button type="button" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 bg-white p-2 shadow-md border border-gray-200">
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${company?._id}`)} 
                                                    className='flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded text-sm text-gray-700'
                                                >
                                                    <Edit2 className='h-4 w-4 text-gray-500' />
                                                    <span>Edit</span>
                                                </div>
                                                <div
                                                    onClick={() => deleteCompanyHandler(company?._id)}
                                                    className='flex items-center gap-2 cursor-pointer p-2 hover:bg-red-50 rounded text-sm text-red-600 mt-1'
                                                >
                                                    <Trash2 className='h-4 w-4' />
                                                    <span>Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;