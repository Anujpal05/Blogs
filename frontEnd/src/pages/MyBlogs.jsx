import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard';
import { MagnifyingGlass } from 'react-loader-spinner'


function MyBlogs(props) {
    const [blogs, setblogs] = useState([]);
    const [username, setUsername] = useState("User");
    const [loader, setloader] = useState(true)
    const userBlogs = async () => {
        try {
            props.setProgress(30);
            const id = localStorage.getItem("user");
            const { data } = await axios.get(`http://localhost:3000/blog/user-blogs/${id}`);
            props.setProgress(50);
            if (data?.success) {
                props.setProgress(70);
                setblogs(data?.userBlog.blogs);
                setUsername(data?.userBlog.username);
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
                <div className=' pt-16'>
                    {!loader && blogs && blogs.map((blog) => (
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

            }

        </>
    )
}

export default MyBlogs
