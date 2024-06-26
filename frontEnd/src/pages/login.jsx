import { useForm } from "react-hook-form"
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store";
import toast from 'react-hot-toast';

function Login(props) {

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
        await axios.post('/api/user/login', userInfo)
            .then((res) => {
                props.setProgress(40);
                if (res.data) {
                    props.setProgress(80);
                    localStorage.setItem("user", res.data.user.id);
                    dispatch(authActions.login())
                    props.setProgress(100);
                    localStorage.setItem("token", res.data.token);
                    toast.success(" Login successfully!");
                    navigate("/blogs");
                }
            }).catch((error) => {
                props.setProgress(100);
                toast.error(error.response.data.message)
            })
        props.setProgress(0);
    }

    useEffect(() => {
        props.setProgress(100);
    }, [])

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div id="" className="">
                    <div className="modal-box w-screen bg-slate-900 text-white shadow-lg shadow-black">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Link to={"/"} className=" absolute right-2 top-2">✕</Link>
                            <h3 className="font-bold text-lg mb-3">Login</h3>
                            <div className='flex flex-col space-y-2 my-3'>
                                <span>Email</span>
                                <input className='p-2 rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your email' name='email' type='email' {...register("email", { required: true })} />
                                {errors.email && <span className=' text-red-400 text-sm'>This field is required</span>}
                            </div>
                            <div className='flex flex-col space-y-2 my-3'>
                                <span>Password</span>
                                <input className='p-2 rounded-md outline-none border-2 bg-slate-800 text-white ' placeholder='Enter your Password' name='password' type='password' {...register("password", { required: true })} />
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
