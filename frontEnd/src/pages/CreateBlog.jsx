import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';


function CreateBlog(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = localStorage.getItem("user");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        props.setProgress(30);
        const userInfo = {
            title: data.title,
            description: data.description,
            image: data.image,
            user: id,
        }


        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/blog/create-blog`, userInfo, {
            headers: {
                Authorization: `bearer ${(localStorage.getItem('token'))}`
            }
        })
            .then((res) => {
                props.setProgress(60);
                if (userInfo) {
                    props.setProgress(100);
                    toast.success("Your Blog created successfully!");
                    navigate("/myblogs")
                }
            }).catch((error) => {
                toast.error("Error! Try again.")
                console.log(error.response.data.message)
            })
    }
    useEffect(() => {
        props.setProgress(100);
    }, [])

    return (
        <div className='flex md:justify-center h-screen'>
            <div id="" className="">
                <div className="modal-box w-screen md:mt-36 mt-24 bg-slate-900 text-white shadow-lg shadow-black">
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <Link to={"/myblogs"} className=" absolute right-2 top-2">✕</Link>
                        <h3 className="font-bold text-2xl text-center mb-3 ">CREATE BLOG</h3>
                        <div className='flex flex-col space-y-2 my-3'>
                            <span>Title</span>
                            <input className='p-2 rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your Title' name='title' type='text' {...register("title", { required: true })} />
                            {errors.title && <span className=' text-red-400 text-sm'>This field is required</span>}
                        </div>
                        <div className='flex flex-col space-y-2 my-3'>
                            <span>Description</span>
                            <textarea className='p-2  rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your description' name='description' type='text' {...register("description", { required: true })} rows={4} />
                            {errors.description && <span className=' text-red-400 text-sm'>This field is required</span>}
                        </div>
                        <div className='flex flex-col space-y-2 my-3'>
                            <span>Image URL</span>
                            <input className='p-2 rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your Image URL' name='image' type='text' {...register("image", { required: true })} />
                            {errors.image && <span className=' text-red-400 text-sm'>This field is required</span>}
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className=' bg-pink-600 text-white px-3 py-1 rounded-md m-4 hover:bg-pink-700 duration-300 outline-none' >Upload</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreateBlog
