import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router';



const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYmlidHNqdm53YnN3aGRhdnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mzk2MTMsImV4cCI6MjA1ODQxNTYxM30.gmHyKDImQdmJVUVxSCDnMam7WXldc6C-reGkt_4kMWE'
const supabase = createClient(
  'https://gqbibtsjvnwbswhdavwx.supabase.co',
  key
);
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    
    const signInWithEmail = async(e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            
        });

        if (error) {
            setError(error.message)
        } else {
            console.log('user signed In: ', data.user);
            navigate('/')
        }
    }
    return (
        <div>
            <div className='flex justify-between p-10 '>
                <div className='flex font-bold text-blue-700 text-3xl '>
                    <img src="/images/bookIcon.png" alt="book logo" className='w-9 h-9'/>
                    <span className='pl-2'>BokoIo</span>
                </div>    
            </div>
            <div className='grid grid-cols-2'>
                <div className='p-20'>
                    <div className='w-full h-full rounded-full overflow-hidden'>
                        <img src="/images/bookio_icon.jpg" alt=""  />
                    </div>
                </div>
                <div className=' bg-[#effafc]'>
                    <div className='flex flex-col p-20 w-full '>
                        <div className='pb-15'>
                            <h2 className='font-bold text-3xl'>Sign In</h2>
                        </div>
                        <div className='pl-20 pr-20 w-full flex flex-col'>
                            <form action="" onSubmit={signInWithEmail} className='w-full flex flex-col'>
                                <h4 className='p-3 font-bold'>Email</h4>
                                <input type="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)} 
                                    placeholder='enter your email...'
                                    className='border border-gray-300 rounded-lg p-2'
                                />
                                <h4 className='p-3 font-bold'>Password</h4>
                                <input type="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)} 
                                    name='password'
                                    placeholder='enter your password...'
                                    className='border border-gray-300 rounded-lg p-2'
                                />
                            <button 
                                type='submit'
                                className='border border-white-600 bg-blue-700 text-white font-bold rounded-md p-2 mt-5'>Sign In</button>
                            </form>
                            <button className='px-27 flex justify-between border border-white-900 bg-gray-400 text-white font-bold rounded-md p-2 mt-5'>
                                <div className='w-8 h-8 bg-white rounded-full'></div>
                                Sign In with Google
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;