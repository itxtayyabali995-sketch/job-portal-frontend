import React from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const shortlistingstatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const statusHandler = async (status, applicationId) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
                { status },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const { applicants = [] } = useSelector((store) => store.application);

    return (
        <div className='overflow-x-auto w-full bg-white rounded-lg border border-gray-100 shadow-sm'>
            <Table>
                <TableCaption>A list of your recent applied users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                    No Applicants Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            applicants.map((item) => (
                                <TableRow key={item?._id}>
                                    <TableCell className="font-medium">
                                        {item?.applicant?.fullname || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {item?.applicant?.email || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {item?.applicant?.phoneNumber || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {item?.applicant?.profile?.resume ? (
                                            <a
                                                href={item.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline truncate block max-w-[120px]"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item?.createdAt ? item.createdAt.split("T")[0] : "N/A"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button type="button" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32 bg-white p-2 shadow-md border border-gray-200">
                                                {
                                                    shortlistingstatus.map((status, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            className='cursor-pointer my-1 hover:bg-gray-100 p-2 rounded text-sm text-gray-700 transition-colors'
                                                        >
                                                            <span>{status}</span>
                                                        </div>  
                                                    ))
                                                }
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
    );
};

export default ApplicantsTable;