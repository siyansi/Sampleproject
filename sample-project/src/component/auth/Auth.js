import Navbar from "../navbar/Navbar";
import LeftContainer from "../sidebar/Sidebar";

import React, { useState, useEffect } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { themeChange } from "theme-change";

const AuthGurad = ({ component }) => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
    useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  return (
    <div className="main-container">

      <>
      <div className="flex main-bg-container">
        <Navbar currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
       
          <LeftContainer currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}/>
          <div style={{ width: "80%" }}> {component}</div>
        </div>
      </>
    </div>
  );
};

export default AuthGurad;
