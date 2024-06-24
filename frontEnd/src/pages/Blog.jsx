import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MagnifyingGlass } from 'react-loader-spinner'
import Footer from '../Components/Footer';

function Blog(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setblog] = useState("");
    const [loader, setloader] = useState(true);
    const user_id = localStorage.getItem("user");
    let isUser = false;


    const viewblog = async () => {
        try {
            props.setProgress(30);
            const blog_Data = await axios.get(`http://localhost:3000/blog/get-blog/${id}`)
            props.setProgress(60);
            if (blog_Data) {
                props.setProgress(80);
                setblog(blog_Data?.data?.blog);
                setloader(false);
                props.setProgress(100);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editBlog = async () => {
        navigate(`/update-blog/${id}`);
    }

    const deleteBlog = async () => {
        const bool = confirm("Are you sure to delete this blog?");
        if (bool) {
            await axios.delete(`http://localhost:3000/blog/delete-blog/${id}`)
                .then((res) => {
                    if (res.data) {
                        toast.success('Your Blog is Deleted!');
                        navigate("/myblogs");
                    }
                }).catch((error) => {
                    console.log(error);
                })
        }
        props.setProgress(0)
    }

    useEffect(() => {
        viewblog();
    }, [id]);

    if (user_id === blog?.user?._id) {
        isUser = true;
    } else {
        isUser = false;
    }

    return (
        <>
            {
                loader && <div className=' h-[90vh] flex justify-center items-center'>
                    <MagnifyingGlass
                        visible={loader}
                        height="150"
                        width="150"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </div>
            }
            {
                !loader && <><div className='h-screen pt-16'>
                    <div className=' flex justify-center w-screen my-6'>
                        <div className="card card-compact w-96 text-white bg-slate-900 m-3 md:w-5/12 shadow-md shadow-black ">
                            <div className=' bg-slate-950  w-full flex items-center p-2 space-x-3'>
                                <div className=' md:h-14 md:w-14 h-8 w-8 text-2xl rounded-full flex justify-center items-center font-bold md:text-4xl bg-blue-400 text-black'>
                                    {blog?.user?.username ? blog?.user?.username[0].toUpperCase() : "U"}
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div>
                                        <h1 className=' text-xl'>{blog?.user?.username}</h1>
                                        <p className=' text-sm'>{blog?.time}</p>
                                    </div>
                                    {isUser && <div className='flex space-x-3 items-center'>
                                        <MdEdit className=' text-blue-500 md:text-3xl text-2xl' onClick={editBlog} />
                                        <MdDelete className='text-red-500 md:text-3xl text-2xl ' onClick={deleteBlog} />
                                    </div>}
                                </div>
                            </div>
                            <figure><img className=' grid md:max-h-72 w-full place-items-center overflow-x-scroll rounded-lg p-3 lg:overflow-visible' src={blog.image} alt="blog" /></figure>
                            <div className=" min-h-fit md:py-3 py-1 px-5 ">
                                <h2 className="card-title md:text-2xl"> Title : {blog.title}</h2>
                                <p className=' md:text-xl '>Description : {blog.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Blog
