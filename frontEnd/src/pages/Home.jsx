import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Home(props) {
    useEffect(() => {
        props.setProgress(100);
    }, [])

    return (
        <div className=' h-screen' style={{ backgroundImage: "url('https://i.pinimg.com/originals/d4/8b/26/d48b26ab7df1e628a0d18d5f0946714b.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className='w-full h-full flex justify-center pt-32'>
                <div className=' md:h-fit md:w-2/4 w-72 h-fit space-y-8 p-10 rounded-md shadow-lg shadow-black backdrop-blur-sm'>
                    <p className=' md:text-6xl text-4xl font-bold text-center drop-shadow-lg shadow-black text-white'  >Create Your Own <span className='  drop-shadow-sm shadow-black text-orange-600 '>Beautiful Blog</span></p>
                    <div className='flex justify-center'>
                        <NavLink to="/login" className=' w-fit text-center text-xl bg-blue-500 p-2 rounded-full font-bold text-black' >Start Now</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
