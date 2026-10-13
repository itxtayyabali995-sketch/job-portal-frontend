import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get`,
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
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.error(
                    'Get All Companies Error:',
                    error.response?.data || error.message
                );
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;