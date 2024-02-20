import Navbar from "../navbar/Navbar"
import LeftContainer from "../sidebar/Sidebar"

import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from 'react-icons/hi';

// const ResponsiveSidebarDrawer = () => {
//     const [width, setWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         const handleResize = () => {
//             setWidth(window.innerWidth);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const openDrawer = () => {
//         document.getElementById('my-drawer').checked = true;
//     };
const AuthGurad = ({component}) => {

    return(
        <div className="main-container">
            <>


            <Navbar/>
            <div className="flex main-bg-container">
                <LeftContainer/>
                <div style={{width:"80%"}}> {component}</div>
               
            </div>
            </>
        </div>
    )
}

export default AuthGurad