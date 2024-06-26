import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { MagnifyingGlass } from 'react-loader-spinner'

function UpdateBlog(props) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        title: "",
        description: "",
        image: ""
    })
    const [loader, setloader] = useState(true);
    const { id } = useParams();
    const user_id = localStorage.getItem("user");

    const blogData = async () => {
        props.setProgress(30);
        const blog_data = await axios.get(`/api/blog/get-blog/${id}`, {
            headers: {
                Authorization: `bearer ${(localStorage.getItem('token'))}`
            }
        });
        props.setProgress(60);
        setUserData({
            title: blog_data?.data?.blog?.title || '',
            description: blog_data?.data?.blog?.description || '',
            image: blog_data?.data?.blog?.image || ''
        })
        setloader(false);
        props.setProgress(100);
    }

    useEffect(() => {
        blogData();
    }, []);

    const handleChange = (event) => {
        setUserData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setProgress(20);
        const userInfo = {
            title: userData.title,
            description: userData.description,
            image: userData.image,
            user: user_id,
        }
        props.setProgress(30);
        await axios.put(`/api/blog/update-blog/${id}`, userInfo, {
            headers: {
                Authorization: `bearer ${(localStorage.getItem('token'))}`
            }
        })
            .then((res) => {
                props.setProgress(60)
                if (res.data) {
                    props.setProgress(100);
                    navigate(`/blog/${id}`);
                    toast.success("Your Blog updated successfully!");
                }
            }).catch((error) => {
                toast.error("Error! Try again.")
                console.log(error);
            })
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
                !loader && <div className='flex md:justify-center h-[93vh] md:[91vh]'>
                    <div id="" className="">
                        <div className="modal-box w-screen md:h-[70vh] md:[60vh] md:mt-20 mt-10 bg-slate-900 text-white shadow-lg shadow-black">
                            <form className=' space-y-5 ' onSubmit={handleSubmit} >
                                <Link to={`/blog/${id}`} className=" absolute right-2 top-2">✕</Link>
                                <h3 className="font-bold md:text-2xl text-3xl text-center mb-3 ">UPDATE BLOG</h3>
                                <div className='flex flex-col space-y-2 my-3 '>
                                    <span className=' text-xl'>Title</span>
                                    <input className='md:p-2 px-2 py-3 text-xl rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your Title' name='title' type='text' value={userData.title} onChange={handleChange} required />
                                </div>
                                <div className='flex flex-col space-y-2 my-3'>
                                    <span className='text-xl'>Description</span>
                                    <input className='md:p-2 px-2 py-3 text-xl rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your description' name='description' value={userData.description} onChange={handleChange} type='text' required />
                                </div>
                                <div className='flex flex-col space-y-2 my-3'>
                                    <span className='text-xl'>Image URL</span>
                                    <input className='md:p-2 px-2 py-3 text-xl rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your Image URL' name='image' type='text' value={userData.image} onChange={handleChange} required />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button type="submit" className=' bg-pink-600  text-white text-2xl px-3 py-1 rounded-md m-4 hover:bg-pink-700 duration-300' >Update</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default UpdateBlog;
