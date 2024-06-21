import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from 'axios';


const BlogCard = (props) => {
    const deleteBlog = () => {
        console.log("deleting..")
    }

    const editBlog = async () => {
        // await axios.put(`http://localhost:3000/blog/update-blog/${props.blog_id}`);

    }
    return (
        <div className=' flex justify-center w-screen my-6'>
            <div className="card card-compact w-96 text-white bg-slate-900 m-3 md:w-5/12 shadow-md shadow-black ">
                <div className=' bg-slate-950  w-full flex items-center p-2 space-x-3'>
                    <div className=' md:h-14 md:w-14 h-8 w-8 text-2xl rounded-full flex justify-center items-center font-bold md:text-4xl bg-blue-400 text-black'>
                        {props.username ? props.username[0].toUpperCase() : "User"}</div>
                    <div className='flex justify-between w-full'>
                        <div>
                            <h1 className=' text-xl'>{props.username}</h1>
                            <p className=' text-sm'>{props.time}</p>
                        </div>
                        <div className='flex space-x-3 items-center'>
                            <MdEdit className=' text-blue-500 md:text-3xl text-2xl' />
                            <MdDelete className='text-red-500 md:text-3xl text-2xl ' onClick={deleteBlog} />

                        </div>
                    </div>
                </div>
                <figure><img className=' grid md:max-h-72 w-full place-items-center overflow-x-scroll rounded-lg p-3 lg:overflow-visible' src={props.image} alt="blog" /></figure>
                <div className=" h-fit md:py-3 py-1 px-5 ">
                    <h2 className="card-title md:text-2xl"> Title : {props.title}</h2>
                    <p className=' md:text-xl '>Description : {props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
