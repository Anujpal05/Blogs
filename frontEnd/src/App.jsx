import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Blogs from './pages/Blogs'
import Register from './pages/Register'
import Login from './pages/login'
import Home from './pages/Home'
import MyBlogs from './pages/MyBlogs'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdateBlog'
import { useSelector } from 'react-redux'
import Blog from './pages/Blog'
import { Toaster } from 'react-hot-toast';
import Footer from './Components/Footer'


function App() {
  let isLogin = useSelector((state) => state.isLogin || false);
  const [progress, setProgress] = useState(0);
  const isUser = localStorage.getItem("user");
  if (isLogin || isUser) {
    isLogin = true
  }

  console.log(import.meta.env.VITE_SERVER_URL);

  return (
    <div className=' min-h-screen'>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Toaster />
      <div className=' min-h-[92vh]'>
        <Routes>
          {!isLogin && <Route path='/' element={<Home setProgress={setProgress} />} />}
          {isLogin && <Route path='/' element={<Blogs setProgress={setProgress} />} />}
          <Route path='/blogs' element={<Blogs setProgress={setProgress} />} />
          <Route path='/blog/:id' element={<Blog setProgress={setProgress} />} />
          <Route path='/myblogs' element={<MyBlogs setProgress={setProgress} />} />
          <Route path='/register' element={<Register setProgress={setProgress} />} />
          <Route path='/login' element={<Login setProgress={setProgress} />} />
          <Route path="/createblog" element={<CreateBlog setProgress={setProgress} />} />
          <Route path="/update-blog/:id" element={<UpdateBlog setProgress={setProgress} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
