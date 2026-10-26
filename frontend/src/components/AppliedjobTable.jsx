import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedjobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job)

    return (
        <div className='overflow-x-auto w-full max-w-full bg-white rounded-lg border border-gray-100 shadow-sm p-2 sm:p-4'>
            <Table>
                <TableCaption>A List of your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                    You haven't applied any job yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob?._id}>
                                    <TableCell>
                                        {appliedJob?.createdAt
                                            ? appliedJob.createdAt.split("T")[0]
                                            : "N/A"}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {appliedJob?.job?.title || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {appliedJob?.job?.company?.name || "N/A"}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Badge className={`rounded-full ${
                                            appliedJob?.status === 'rejected' ? 'bg-red-600 hover:bg-red-700' : 
                                            appliedJob?.status === 'accepted' ? 'bg-green-600 hover:bg-green-700' : 
                                            'bg-black text-white hover:bg-gray-800'
                                        }`}>
                                            {appliedJob?.status || "Pending"}
                                        </Badge>
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

export default AppliedjobTable