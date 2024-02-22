import Navbar from "../navbar/Navbar"
import LeftContainer from "../sidebar/Sidebar"

import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from 'react-icons/hi';
import { themeChange } from 'theme-change'
    


const AuthGurad = ({component}) => {

    useEffect(() => {
        // 👆 daisy UI themes initialization
        themeChange(false)
      }, [])

    return(
        <div className="main-container">
            <>


            <Navbar/>
            <div className="flex main-bg-container">
                <LeftContainer />
                <div style={{width:"80%"}}> {component}</div>
               
            </div>
            </>
        </div>
    )
}

export default AuthGurad