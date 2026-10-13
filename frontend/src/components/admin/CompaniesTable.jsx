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
        <div>
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
                                <TableCell colSpan={4} className="text-center">You haven't registered any company yet.</TableCell>
                            </TableRow>
                        ) : (
                            filtercompany.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt ? company.createdAt.split("T")[0] : "N/A"}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div
                                                    onClick={() => deleteCompanyHandler(company._id)}
                                                    className='flex items-center gap-2 w-fit cursor-pointer text-red-500 mt-3'
                                                >
                                                    <Trash2 className='w-4' />
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