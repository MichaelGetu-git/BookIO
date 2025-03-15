import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className='grid grid-cols-5 p-8'>
            <div className='flex font-bold text-blue-700 text-3xl '>
                <img src="/images/bookIcon.png" alt="book logo" className='w-9 h-9'/>
                <span className='pl-2'>BokoIo</span>
            </div>
            <div className='flex justify-evenly pt-2 font-semibold pr-[40%]'>
                <Link to={'/'} className='pr-7'>BookShelf</Link>
                <Link to={'/store'}> Store</Link>
                
            </div>
            <div className='col-span-2'>
                <div className=' flex justify-between border border-gray-400 rounded-tl-full rounded-bl-full p-1 pl-5 w-[100%]'>
                    <input type="text" 
                        placeholder='looking for a book?'
                        className='focus:outline-none'
                    />
                    <div className=''>
                        <img src="/images/searchIcon.png" alt="search icon" className='h-8 pr-1'/>
                    </div>
                </div>
                
            </div>
            <div className='flex justify-end'>
                <button className=' border bg-blue-500 text-white rounded-full px-3 text-center'>Upload</button>
                <Link to={'/'} className=' rounded-full bg-blue-600 w-10 h-10 mx-[5%]'>
                    <img src="" alt="" className=''/>
                </Link>

            </div>
        </div>
    );
};

export default Navbar;