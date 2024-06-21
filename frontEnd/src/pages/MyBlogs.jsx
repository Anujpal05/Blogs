import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard';

function MyBlogs() {
    const [blogs, setblogs] = useState([]);
    const [username, setUsername] = useState("User");
    const userBlogs = async () => {
        try {
            const id = localStorage.getItem("user");
            const { data } = await axios.get(`http://localhost:3000/blog/user-blogs/${id}`);
            if (data?.success) {
                setblogs(data?.userBlog.blogs);
                setUsername(data?.userBlog.username);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userBlogs();
    }, [])
    return (
        <div>
            {blogs && blogs.map((blog) => (
                <div key={blog._id}>
                    <BlogCard
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        time={blog.createdAt}
                        username={username}
                        user_id={blog.user._id}
                        blog_id={blog._id}

                    />

                </div>
            ))}

        </div>
    )
}

export default MyBlogs
