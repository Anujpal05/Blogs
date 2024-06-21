import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Blogs from './pages/Blogs'
import Register from './pages/Register'
import Login from './pages/login'
import Home from './pages/Home'
import MyBlogs from './pages/MyBlogs'
import CreateBlog from './pages/CreateBlog'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/myblogs' element={<MyBlogs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/createblog" element={<CreateBlog />} />
      </Routes>
    </>
  )
}

export default App
