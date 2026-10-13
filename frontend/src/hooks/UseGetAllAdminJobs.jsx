import { JOB_API_END_POINT } from '@/components/utils/constant'
import { setAllJobss } from '@/redux/jobslice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UseGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllJobss = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminjobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobss(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobss();
    }, [dispatch]); 
}

export default UseGetAllAdminJobs;