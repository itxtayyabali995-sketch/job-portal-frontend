import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8'>
                
                <div>
                    <h2 className='text-2xl font-bold text-white mb-3'>
                        Job<span className='text-[#6A38C2]'>Portal</span>
                    </h2>
                    <p className='text-sm text-gray-400 leading-relaxed'>
                        Your ultimate platform to discover career opportunities, connect with top companies, and grow your professional journey effortlessly.
                    </p>
                </div>

                <div>
                    <h3 className='text-lg font-semibold text-white mb-3'>Quick Links</h3>
                    <ul className='space-y-2 text-sm'>
                        <li><a href='/' className='hover:text-[#6A38C2] transition-colors'>Home</a></li>
                        <li><a href='/jobs' className='hover:text-[#6A38C2] transition-colors'>Browse Jobs</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className='text-lg font-semibold text-white mb-3'>For Candidates</h3>
                    <ul className='space-y-2 text-sm'>
                        <li><a href='/profile' className='hover:text-[#6A38C2] transition-colors'>View Profile</a></li>
                        <li><a href='/browse' className='hover:text-[#6A38C2] transition-colors'>Categories</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className='text-lg font-semibold text-white mb-3'>Stay Updated</h3>
                    <p className='text-sm text-gray-400 mb-3'>Subscribe to get the latest job alerts directly in your inbox.</p>
                    <div className='flex items-center'>
                        <input 
                            type='email' 
                            placeholder='Enter your email' 
                            className='bg-gray-800 text-white px-3 py-2 text-sm rounded-l-md focus:outline-none w-full border border-gray-700' 
                        />
                        <button className='bg-[#6A38C2] hover:bg-[#582da1] text-white px-4 py-2 text-sm font-medium rounded-r-md transition-colors'>
                            Join
                        </button>
                    </div>
                </div>

            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500'>
                <p>&copy; 2026 JobPortal. All rights reserved. Built with MERN Stack by Tayyab.</p>
            </div>
        </footer>
    )
}

export default Footer