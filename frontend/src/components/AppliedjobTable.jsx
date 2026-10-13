import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedjobTable = () => {
   const { allAppliedJobs = [] } = useSelector(store => store.job)
    return (
        <div>
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
            <TableCell colSpan={4} className="text-center">
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

                <TableCell>
                    {appliedJob?.job?.title || "N/A"}
                </TableCell>

                <TableCell>
                    {appliedJob?.job?.company?.name || "N/A"}
                </TableCell>

                <TableCell className="text-right">
                    <Badge className="bg-black text-white hover:bg-gray-800 rounded-full">
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