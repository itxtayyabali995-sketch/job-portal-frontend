import { APPLICATION_API_END_POINT } from "@/components/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobslice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseGetAllAppliedJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchAppliedJobs = async () => {

            try {

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`,
                    {
                        withCredentials: true
                    }
                );


                if (res.data.success) {
                    dispatch(
                        setAllAppliedJobs(res.data.appliedJobs)
                    );
                }

            } catch (error) {

                console.log(
                    "Get Applied Jobs Error:",
                    error
                );

            }
        };

        fetchAppliedJobs();

    }, [dispatch]);

};

export default UseGetAllAppliedJobs;