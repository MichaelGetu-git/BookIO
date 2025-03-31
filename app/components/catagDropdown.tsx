import React, { useState } from 'react';
import PdfThumbnail from './pdfthumbnail';

interface CatagDropdownProps {
    categories: any[]
    books: any[]
}

const CatagDropdown = ({categories,books}) => {

    const [isOpen, setIsOpen] = useState(null);


    const findbookCat = (url, bookCat, actCat)=> {
        if (bookCat == actCat) {
            return url
        } else {
            return ""
        }
    } 

    return (
        <div>
            {categories.map((catag)=> (
                <div key={catag.name}>
                    <div 
                        onClick={()=> setIsOpen(isOpen === catag.name ? null : catag.name)}
                        className='flex font-bold '
                    >
                        <div className='pt-2 pr-2'>
                            <img src={isOpen===catag.name ? "/images/downicon.png" : "/images/sideicon.png"} alt="" className='w-3 h-2'/>
                        </div>
                        <h2 className=''>{catag.name}</h2>
                    </div>
                    {isOpen === catag.name && (
                        <div className='flex overflow-x-scroll space-x-4 p-2'>
                            {books.map((book)=> (
                                <div key={book.id}>
                                    <PdfThumbnail pdfUrl = {findbookCat(book.file_url,catag.id, book.category_id)} bookName = {book.title}/>
                                </div>
                            ))}
                        </div>
                    )}       
                </div>
            ))}
        </div>
    );
};

export default CatagDropdown;