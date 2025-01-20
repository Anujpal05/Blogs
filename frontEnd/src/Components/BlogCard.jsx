import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


const BlogCard = (props) => {
    const [formattedDateTime, setformattedDateTime] = useState("")

    const time = () => {
        const timestamp = props.time;

        // Convert timestamp to Date object
        const date = new Date(timestamp);

        // Define options for formatting
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };

        setformattedDateTime(date.toLocaleString('en-US', options))
    }

    useEffect(() => {
        time();
    }, [])



    return (
        <div className=' flex justify-center md:flex-none w-screen md:w-11/12 md:min-w-60 my-6'>
            <div className="card card-compact md:w-full w-96 text-white bg-slate-900 lg:m-3 md:m-1  shadow-md shadow-black ">
                <div className=' bg-slate-950  w-full flex items-center p-2 space-x-3'>
                    <div className=' md:h-14 md:w-14 h-8 w-8 text-2xl rounded-full flex justify-center items-center font-bold md:text-4xl bg-blue-400 text-black'>
                        {props.username ? props.username[0].toUpperCase() : "U"}</div>
                    <div className='flex justify-between w-full'>
                        <div>
                            <h1 className=' text-xl'>{props.username}</h1>
                            <p className=' text-sm'>{formattedDateTime}</p>
                        </div>
                        <NavLink to={`/blog/${props.blog_id}`} className=' border-2 border-gray-600 h-fit p-1 rounded-md mt-1 mr-2 '>View</NavLink>
                    </div>
                </div>
                <figure><img className=' grid md:max-h-72 w-full place-items-center overflow-x-scroll rounded-lg p-3 lg:overflow-visible' src={props.image} alt="blog" /></figure>
                <div className=" h-fit md:py-3 py-1 px-5 ">
                    <h2 className="card-title md:text-2xl"> Title : {props.title}</h2>
                    <p className=' md:text-xl '>Description : {props.description.slice(0, 100)}{props.description.length > 100 ? "....." : ""}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
