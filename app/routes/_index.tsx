import React, { memo, useEffect } from 'react';
import PdfThumbnail from '~/components/pdfthumbnail';
import Login from './login';

const Homepage = memo(() => {
    const pdfUrls = [
        "/CGAssignment.pdf",
        "/CGAssignment.pdf",
        "/CGAssignment.pdf",
        
    ]

    useEffect
    return (
        <div className='bg-[#F4F0F0]'>
            <div className='grid grid-cols-12'>
                <div className='col-span-2 h-200 '>
                    <div className='flex-col justify-center border border-white rounded-br-full bg-white h-160 '>
                        <div className='flex justify-center pt-20'>
                            <div className='flex justify-center flex-col pl-[10%]  border border-blue-600 h-28 w-38 rounded-md'>
                                <p>Reading time</p>
                                <p className='pl-4 font-bold'>1H 20M</p>
                            </div>
                        </div>
                        <div className='p-15'>
                            <p className='p-2'>reading <span></span> </p>
                            <p className='p-2'>started</p>
                            <p className='p-2'>plan to read</p>
                            <p className='p-2'>store</p>
                            <p className='p-2'>highlights</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-10 p-20 flex flex-col'>
                    <div className='flex border border-white w-fit bg-white rounded-lg p-5 mb-5'>
                        <PdfThumbnail pdfUrl="/CGAssignment.pdf" />
                       <div className='flex justify-center p-25'>
                            
                            <p>CG Assignment</p>
                        </div>
                    </div>
                    <div className='flex justify-around border border-white w-full h-15'>
                        <p>add shelf</p>
                        <p>all</p>
                        <p>favorites</p>
                        <p>plan to read</p>
                        <p>completed</p>
                    </div>
                    <div className='flex border border-white rounded-lg w-full bg-white p-10 gap-8'>
                        {pdfUrls.map((pdfUrl,index)=> (
                            <div key={index}>
                                <PdfThumbnail  pdfUrl={pdfUrl} />
                            </div>
                        ))}
                      
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Homepage;