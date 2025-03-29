import React, { memo, useEffect, useState } from 'react';
import PdfThumbnail from '~/components/pdfthumbnail';
import Login from './login';
import { supabase } from './supabaseClient';
import CreatecatBook from '~/components/createcatBook';

const Homepage = memo(() => {
    const [books, setBooks] = useState<any[]>([])
    const [userId, setUserId]  = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null)
    
    const handleButtonClick=(index) => {

        setActiveButton(index == activeButton ? null : index);
    }

    useEffect(() => {
        async function fetchBooksAndUser() {
            try {
                // Fetch user
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    console.error("Error fetching user: ", userError);
                    return;
                }
    
                if (userData?.user) {
                    setUserId(userData.user.id);
                } else {
                    console.error("No user found.");
                    return;
                }
    
                // Fetch books after user is set
                const { data: booksData, error: booksError } = await supabase
                    .from("books")
                    .select("*");
    
                if (booksError) {
                    console.error("Error fetching books:", booksError);
                } else {
                    setBooks(booksData || []); // Ensure booksData is not null
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        }
    
        fetchBooksAndUser();
    }, []);
    
    console.log(books);
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
                            
                            <div>
                                <p>CG Assignment</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between border border-white w-full h-15 px-15 pt-5'>
                        <button 
                            className='flex '
                            onClick={()=> setIsOpen(true)}>
                            <img src="/images/plus.png" alt="" className='w-7 h-7'/>
                            <p className='text-large font-bold px-3 pb-3'>Add shelf</p>
                        </button>
                        {isOpen && <CreatecatBook onClose = {()=> setIsOpen(false) }/>}
                        <div className='space-x-4 pr-25'>
                            {
                                ["All","Favorites","Plan to Read","Completed"].map((btnText, index)=> (
                                    <button
                                        key={index}
                                        onClick={() => handleButtonClick(index)}
                                        className={` ${activeButton == index ? "pb-2 border-b-6 border-blue-700 overflow-hidden rounded-tl-lg rounded-tr-lg" :""}`}
                                    >
                                        {btnText}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex border border-white rounded-lg w-full text-black bg-white p-10 gap-8'>
                        {books.map((book)=> (
                            <div key={book.id}>
                                <PdfThumbnail pdfUrl={book.file_url}/>
                            </div>
                        ))}
                      
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Homepage;