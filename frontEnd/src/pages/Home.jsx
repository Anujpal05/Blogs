import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Hero from '../Components/Hero';

function Home(props) {
    useEffect(() => {
        props.setProgress(100);
    }, [])

    return (
        <div className=' md:px-28 md:py-14 py-24 '>
            <Hero />
        </div>
    )
}

export default Home
