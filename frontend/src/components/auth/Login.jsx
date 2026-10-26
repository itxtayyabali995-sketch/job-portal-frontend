import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { USER_API_END_POINT } from '../utils/constant'

const Login = () => {
    const [input, setInput] = React.useState({
        email: "",
        password: "",
        role: ""
    })

    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) {
            toast.error("No Internet Connection! Please check your network.");
            return;
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                    timeout: 15000 
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log("Login Error:", error);

            if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
                toast.error("Network Error! Request timed out. Check your internet.");
            } else {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            }

        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className='overflow-x-hidden min-h-screen bg-white'>
            <Navbar />

            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-6'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-sm bg-white'
                >
                    <h1 className='font-bold text-xl sm:text-2xl mb-5 text-gray-800'>
                        Login
                    </h1>

                    <div className='my-3'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="tayyabali995@gmail.com"
                            className="mt-1"
                        />
                    </div>

                    <div className='my-3'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="******"
                            className="mt-1"
                        />
                    </div>

                    <div className='my-4 flex items-center justify-between'>
                        <div className='flex items-center gap-6'>
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    id="r1"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="w-4 h-4 cursor-pointer accent-black"
                                />
                                <Label htmlFor="r1" className="cursor-pointer">
                                    Student
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    id="r2"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="w-4 h-4 cursor-pointer accent-black"
                                />
                                <Label htmlFor="r2" className="cursor-pointer">
                                    Recruiter
                                </Label>
                            </div>
                        </div>
                    </div>
    
                    {
                        loading ? (
                            <Button
                                type="button"
                                className='w-full my-4'
                                disabled
                            >
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full my-4 bg-black text-white hover:bg-gray-800"
                            >
                                Login
                            </Button>
                        )
                    }

                    <span className='text-sm text-gray-600 block text-center sm:text-left'>
                        Don't have an Account?{" "}
                        <Link
                            to="/signup"
                            className='text-blue-600 hover:underline'
                        >
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login