import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard';
import { MagnifyingGlass } from 'react-loader-spinner'


function MyBlogs(props) {
    const [blogs, setblogs] = useState([]);
    const [username, setUsername] = useState("User");
    const [loader, setloader] = useState(true);
    const [isLength, setisLength] = useState(false);
    const userBlogs = async () => {
        try {
            props.setProgress(30);
            const id = localStorage.getItem("user");
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blog/user-blogs/${id}`, {
                headers: {
                    Authorization: `bearer ${(localStorage.getItem('token'))}`
                }
            });
            props.setProgress(50);
            if (data.length === 0) {
                setloader(false);
                setisLength(false);
                props.setProgress(100);
            }

            if (data?.success) {
                props.setProgress(70);
                setblogs(data?.userBlog.blogs);
                setUsername(data?.userBlog.username);
                setisLength(true);
                setloader(false);
                props.setProgress(100);
            }



        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userBlogs();
    }, [])
    return (
        <>
            {
                loader && <div className='py-60 flex justify-center items-center'>
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
            {!loader && (<>{!loader && isLength ? (<>
                <div className=' pt-16 min-h-[94vh] md:grid md:grid-cols-3 md:mx-10'>
                    {blogs && blogs.map((blog) => (
                        <div key={blog._id}>
                            <BlogCard
                                title={blog.title}
                                description={blog.description}
                                image={blog.image}
                                time={blog.createdAt}
                                username={username}
                                user_id={blog?.user}
                                blog_id={blog._id}
                            />
                        </div>
                    ))}
                </div>
            </>) : (<><p className=' text-xl md:text-3xl text-white py-20 px-5' >You have not created any blogs!</p></>)
            }</>)}

        </>
    )
}

export default MyBlogs
