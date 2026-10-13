import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className='bg-white border-b'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-5'>
                    <ul className='flex font-medium items-center gap-5 cursor-pointer'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#36186e]">SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger className="cursor-pointer border-none bg-transparent focus:outline-none">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.ProfilePhoto}
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white z-50 p-4 border rounded-md shadow-md" align="end" sideOffset={10}>
                                    <div className='flex gap-3 items-center border-b pb-3'>
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.ProfilePhoto}
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-base'>{user?.fullname}</h4>
                                            <p className='text-xs text-muted-foreground'>
                                                {user?.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col text-gray-700 mt-3 space-y-3'>

                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex items-center gap-3 cursor-pointer hover:text-black'>
                                                    <User2 className='w-4 h-4' />
                                                    <Link to="/profile" className='text-sm font-medium w-full text-left'>View Profile</Link>
                                                </div>
                                            )
                                        }

                                        <div className='flex items-center gap-3 cursor-pointer hover:text-black'>
                                            <LogOut className='w-4 h-4' />
                                            <span onClick={logoutHandler} className='text-sm font-medium w-full text-left'>Logout</span>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar