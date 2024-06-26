import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { authActions } from '../Redux/store';

function Navbar() {

    let isLogin = useSelector((state) => state.isLogin);

    const user = localStorage.getItem("user");

    if (isLogin || user) {
        isLogin = true
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div>
            <div className="navbar bg-slate-900 shadow-md shadow-black text-gray-300 fixed top-0 z-10">
                <div className="navbar-start">
                    {isLogin && <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-slate-900 shadow-black rounded-box w-52">
                            <li><NavLink to="/blogs">BLOGS</NavLink></li>
                            <li><NavLink to="/myblogs">MY BLOGS</NavLink></li>
                            <li><NavLink to='/createblog'>CREATE_BLOG</NavLink></li>
                        </ul>
                    </div>}
                    <NavLink to="/" className="btn btn-ghost text-xl md:px-6 p-0 ">BLOGPULSE</NavLink>
                </div>
                {isLogin && <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/blogs">BLOGS</NavLink></li>
                        <li><NavLink to="/myblogs">MY BLOGS</NavLink></li>
                        <li><NavLink to='/createblog'>CREATE_BLOG</NavLink></li>
                    </ul>
                </div>}
                <div className="navbar-end space-x-3">
                    {!isLogin && (<>
                        <NavLink to="/login" className="p-2 rounded-md border-2 border-slate-800 shadow-md shadow-black md:mr-10">LOGIN</NavLink></>)}
                    {isLogin && <button className="p-2 rounded-md border-2 border-slate-800 shadow-md shadow-black md:mr-10" onClick={handleLogout}>LOGOUT</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
