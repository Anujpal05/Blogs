import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store";

function CreateBlog() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = localStorage.getItem("user");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const userInfo = {
            title: data.title,
            description: data.description,
            image: data.image,
            user: id
        }

        await axios.post('http://localhost:3000/blog/create-blog', userInfo)
            .then((res) => {
                if (res.data) {
                    alert("Your Blog created successfully!");
                }
            }).catch((error) => {
                console.log(error.response.data.message)
            })


    }
    return (
        <div className='flex md:justify-center h-[91vh]'>
            <div id="" className="">
                <div className="modal-box w-screen md:mt-44 mt-20 dark:bg-slate-900 dark:text-white dark:shadow-lg dark:shadow-black">
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <Link to={"/"} className=" absolute right-2 top-2">✕</Link>
                        <h3 className="font-bold text-2xl text-center mb-3 ">CREATE BLOG</h3>
                        <div className='flex flex-col space-y-2 my-3'>
                            <span>Title</span>
                            <input className='p-2 rounded-md outline-none border-2 dark:bg-slate-800 dark:text-white ' placeholder='Enter your Title' name='title' type='text' {...register("title", { required: true })} />
                            {errors.title && <span className=' text-red-400 text-sm'>This field is required</span>}
                        </div>
                        <div className='flex flex-col space-y-2 my-3'>
                            <span>Description</span>
                            <input className='p-2  rounded-md outline-none border-2 dark:bg-slate-800 dark:text-white ' placeholder='Enter your description' name='description' type='text' {...register("description", { required: true })} />
                            {errors.description && <span className=' text-red-400 text-sm'>This field is required</span>}
                        </div>
                        <div className='flex flex-col space-y-2 my-3'>
                            <span>Image URL</span>
                            <input className='p-2 rounded-md outline-none border-2 dark:bg-slate-800 dark:text-white ' placeholder='Enter your Image URL' name='image' type='text' {...register("image", { required: true })} />
                            {errors.image && <span className=' text-red-400 text-sm'>This field is required</span>}
                        </div>
                        <div className='flex justify-between items-center'>
                            <button className=' bg-pink-600 text-white px-3 py-1 rounded-md m-4 hover:bg-pink-700 duration-300' >Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreateBlog
