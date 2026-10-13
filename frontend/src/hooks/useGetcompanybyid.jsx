import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const useGetcompanybyid = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get/${companyId}`,
                    {
                        headers: token
                            ? {
                                Authorization: `Bearer ${token}`,
                            }
                            : {},
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error(
                    'Get Single Company Error:',
                    error.response?.data || error.message
                );
            }
        };

        if (companyId) {
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);
};

export default useGetcompanybyid;