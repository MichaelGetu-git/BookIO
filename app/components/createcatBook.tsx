import React, { useEffect, useState } from 'react';
import { createClient} from '@supabase/supabase-js'



const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlidHNqdm53YnN3aGRhdnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mzk2MTMsImV4cCI6MjA1ODQxNTYxM30.gmHyKDImQdmJVUVxSCDnMam7WXldc6C-reGkt_4kMWE'
const supabase = createClient(
  'https://gqbibtsjvnwbswhdavwx.supabase.co',
  key
);

const CreatecatBook = ({onClose}) => {

    const [userId, setUserId] = useState<string | null>(null)
    const [category, setCategory] = useState("")

    useEffect(()=> {
        async function fetchUser() {
            const { 
                data: { user },
            } = await supabase.auth.getUser();
            if (user) setUserId(user.id);
        }
        fetchUser()
    },[])

    const handleCatagChange = async(category) => {

        if(!category.trim()) {
            alert("shelf cant be empty!")
            return
        }
        if (!userId) return alert("please log in first!")
        
            const { error: dbError}  = await supabase.from("categories").insert([
                {
                    user_id: userId,
                    name: category,
                    created_at: new Date().toISOString(),
                },
            ]);

            if (dbError) {
                console.log("Database error:", dbError)
                alert("Failed to unsave file url to database")
            } else {
                alert("upload successful!")
            }
    }

    
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
                <h2 className='text-xl font-bold mb-4'>
                    Create Shelf
                </h2>
                <div className='grid grid-cols-9 p-6'>
                    <div className='col-span-2'>
                        <img src="/images/bookIcon.png" alt="" />
                    </div>
                    <div className='flex flex-col col-span-7 pt-5'>
                        <input type="text" placeholder='enter shelf name'
                            className='border border-gray-300 p-1 rounded-tl-full rounded-bl-full'
                            value={category}
                            onChange={(e)=> setCategory(e.target.value)}
                        />
                        <div className='flex justify-evenly pt-5'>
                            <button 
                                className='border border-white bg-blue-600  px-9 py-1 rounded-full text-white'
                                onClick={()=>handleCatagChange(category)}
                                >
                                    create
                            </button>
                            <button 
                            className='border border-blue-600 px-9 py-1 text-blue-600 rounded-full'
                            onClick={onClose}
                            >
                                cancel
                            </button>
                        </div>
                    </div>
                </div>
                

            </div>
            
        </div>
    );
};

export default CreatecatBook;