import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard';
import { MagnifyingGlass } from 'react-loader-spinner'
import Footer from '../Components/Footer';

function Blogs(props) {
    const [blogs, setblogs] = useState([]);
    const [loader, setloader] = useState(true);

    const getAllBlogs = async () => {
        try {
            props.setProgress(30);
            const { data } = await axios.get("http://localhost:3000/blog//all-blog");
            props.setProgress(60)
            if (data?.success) {
                props.setProgress(80);
                setblogs(data?.blogs);
                setloader(false);
                props.setProgress(100)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])

    return (
        <div className=' '>
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
            {!loader && <div className=' pt-16 min-h-[94vh]'>
                {blogs && blogs.map((blog) => (
                    <div key={blog._id}>
                        <BlogCard
                            title={blog?.title}
                            description={blog?.description}
                            image={blog?.image}
                            time={blog?.createdAt}
                            username={blog?.user?.username}
                            user_id={blog?.user?._id}
                            blog_id={blog._id}
                        />
                    </div>
                ))}
                <Footer />
            </div>}
        </div>
    )
}

export default Blogs
