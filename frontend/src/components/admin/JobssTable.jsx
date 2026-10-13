import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover'

import {
    Edit2,
    Eye,
    MoreHorizontal,
    Trash2
} from 'lucide-react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

import UseGetAllAdminJobs from '@/hooks/UseGetAllAdminJobs'
import { JOB_API_END_POINT } from '@/components/utils/constant'

const JobssTable = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Get admin jobs
    UseGetAllAdminJobs()

    const {
        allJobss = [],
        searchJobByText = ""
    } = useSelector(store => store.job)



    const searchText = searchJobByText.trim().toLowerCase()

    const filterjobs = allJobss.filter((job) => {

        const companyName =
            job?.company?.name?.toLowerCase() || ""

        const jobTitle =
            job?.title?.toLowerCase() || ""

        if (!searchText) {
            return true
        }

        // Search company OR job title
        return (
            companyName.includes(searchText) ||
            jobTitle.includes(searchText)
        )
    })


    const deleteJobHandler = async (jobId) => {

        try {

            const res = await axios.delete(
                `${JOB_API_END_POINT}/delete/${jobId}`,
                {
                    withCredentials: true
                }
            )

            if (res.data.success) {

                toast.success(res.data.message)

                const updatedJobs = allJobss.filter(
                    (job) => job._id !== jobId
                )

                dispatch({
                    type: "job/setAllJobss",
                    payload: updatedJobs
                })
            }

        } catch (error) {

            console.log("Delete Job Error:", error)

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete job"
            )
        }
    }


    return (
        <div>

            <Table>

                <TableCaption>
                    A list of your recent posted jobs.
                </TableCaption>


                <TableHeader>

                    <TableRow>

                        <TableHead>
                            Company
                        </TableHead>

                        <TableHead>
                            Job Role
                        </TableHead>

                        <TableHead>
                            Date
                        </TableHead>

                        <TableHead className="text-right">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>


                <TableBody>

                    {
                        filterjobs.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={4}
                                    className="text-center"
                                >
                                    No jobs found.
                                </TableCell>

                            </TableRow>

                        ) : (

                            filterjobs.map((job) => (

                                <TableRow key={job._id}>

                                    {/* COMPANY */}
                                    <TableCell>
                                        {
                                            job?.company?.name ||
                                            "No Company"
                                        }
                                    </TableCell>


                                    {/* JOB ROLE */}
                                    <TableCell>
                                        {
                                            job?.title ||
                                            "N/A"
                                        }
                                    </TableCell>


                                    {/* DATE */}
                                    <TableCell>
                                        {
                                            job?.createdAt
                                                ? job.createdAt.split("T")[0]
                                                : "N/A"
                                        }
                                    </TableCell>


                                    {/* ACTION */}
                                    <TableCell className="text-right">

                                        <Popover>

                                            <PopoverTrigger asChild>

                                                <button
                                                    type="button"
                                                    className="cursor-pointer"
                                                >
                                                    <MoreHorizontal />
                                                </button>

                                            </PopoverTrigger>


                                            <PopoverContent className="w-32">

                                                {/* EDIT */}
                                                <div
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/jobs/${job._id}`
                                                        )
                                                    }
                                                    className="flex items-center gap-2 w-fit cursor-pointer"
                                                >

                                                    <Edit2 className="w-4" />

                                                    <span>
                                                        Edit
                                                    </span>

                                                </div>


                                                {/* APPLICANTS */}
                                                <div
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/jobs/${job._id}/applicants`
                                                        )
                                                    }
                                                    className="flex items-center gap-2 w-fit mt-2 cursor-pointer"
                                                >

                                                    <Eye className="w-4" />

                                                    <span>
                                                        Applicants
                                                    </span>

                                                </div>


                                                {/* DELETE */}
                                                <div
                                                    onClick={() =>
                                                        deleteJobHandler(
                                                            job._id
                                                        )
                                                    }
                                                    className="flex items-center gap-2 w-fit mt-2 cursor-pointer text-red-500"
                                                >

                                                    <Trash2 className="w-4" />

                                                    <span>
                                                        Delete
                                                    </span>

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

export default JobssTable