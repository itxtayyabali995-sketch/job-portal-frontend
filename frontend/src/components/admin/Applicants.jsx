import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { applicants = [] } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                if (!id) {
                    console.log("Job ID is missing");
                    return;
                }

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${id}/applicants`,
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    if (res.data.job?.applications) {
                        dispatch(setAllApplicants(res.data.job.applications));
                    } else if (res.data.applications) {
                        dispatch(setAllApplicants(res.data.applications));
                    } else {
                        dispatch(setAllApplicants([]));
                    }
                }
            } catch (error) {
                console.log("Fetch Applicants Error:", error.response?.data || error.message);
                dispatch(setAllApplicants([]));
            }
        };

        fetchAllApplicants();

        return () => {
            dispatch(setAllApplicants([]));
        };
    }, [id, dispatch]);

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
                <h1 className="font-bold text-xl sm:text-2xl mb-5 text-gray-800">
                    Applicants ({applicants.length})
                </h1>

                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;