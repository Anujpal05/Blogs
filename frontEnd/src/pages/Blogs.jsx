import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard';

function Blogs() {
    const [blogs, setblogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/blog//all-blog");
            if (data?.success) {
                setblogs(data?.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllBlogs();
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
                        username={blog.user.username}
                        user_id={blog.user._id}
                        blog_id={blog._id}
                    />

                </div>
            ))}
        </div>
    )
}

export default Blogs
