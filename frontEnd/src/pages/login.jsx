import { useForm } from "react-hook-form"
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password
        }

        await axios.post('http://localhost:3000/user/login', userInfo)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem("user", res.data.user.id);
                    dispatch(authActions.login())
                    alert("You are Login successfully!");
                    navigate("/blogs");
                }
            }).catch((error) => {
                console.log(error.response.data.message)
            })
    }
    return (
        <>
            <div className='flex justify-center h-[91vh]'>
                <div id="" className="">
                    <div className="modal-box w-screen mt-44  dark:bg-slate-900 dark:text-white dark:shadow-lg dark:shadow-black">
                        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                            {/* if there is a button in form, it will close the modal */}
                            <Link to={"/"} className=" absolute right-2 top-2">✕</Link>
                            <h3 className="font-bold text-lg mb-3">Login</h3>
                            <div className='flex flex-col space-y-2 my-3'>
                                <span>Email</span>
                                <input className='p-2 rounded-md outline-none border-2 dark:bg-slate-800 dark:text-white ' placeholder='Enter your email' name='email' type='email' {...register("email", { required: true })} />
                                {errors.email && <span className=' text-red-400 text-sm'>This field is required</span>}
                            </div>
                            <div className='flex flex-col space-y-2 my-3'>
                                <span>Password</span>
                                <input className='p-2 rounded-md outline-none border-2 dark:bg-slate-800 dark:text-white ' placeholder='Enter your Password' name='password' type='password' {...register("password", { required: true })} />
                                {errors.password && <span className=' text-red-400 text-sm'>This field is required</span>}
                            </div>
                            <div className='flex justify-between items-center'>
                                <button className=' bg-pink-600 text-white px-3 py-1 rounded-md m-4 hover:bg-pink-700 duration-300' >Login</button>
                                <div className='flex'>
                                    <p>Not account?{" "}
                                        <Link to="/register" className="underline text-blue-500 cursor-pointer" >SignUp</Link></p>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
