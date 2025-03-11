import React, { memo } from 'react';

const Book = memo(() => {
    return (
        <div className='w-48 h-92 border border-red-400 rounded-md'>
            <div className='w-48 h-64 '>
                <img src="/images/calmdown.jpg" alt="calm down book image" className='h-64 w-48'/>
            </div>
            <div className='text-white item-left'>
                <p className='font-light text-gray-400 px-[30%] py-2'>pdfdrive</p>
                <p className='font-extralight text-2xl p-3 py-0'>Calm the F*ck down</p>
                
            </div>
        </div>
    );
});

export default Book;