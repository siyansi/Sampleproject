import React, { useState } from "react";
import { Link, useNavigate,} from "react-router-dom";
import { themeChange } from 'theme-change'

const LeftContainer = ({ currentTheme }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard")

  const navigateTo = (section) => {
    setActiveSection(section);
    // You can perform additional actions here such as navigation if needed
  };
  return (
    <div style={{ width: "18%" }} className="hidden md:block fixed top-[95px] ">
      <div className={`w-full ${currentTheme === "dark" ? "text-white": "text-black "} bg-opacity-75 shadow-xl h-screen pt-6 pb-4 border-r  border-r-cyan-300  `}>
        <ul>
          <li className="mb-3">
            <button
              type="button"
              className={`sidebar-btn w-full  pl-3 text-start hover:border border-cyan-300 rounded-xl  hover:text-cyan-400  ${activeSection === "Dashboard" ? "active" : "text-cyan-500"} `}
              style={{ height: "50px", fontSize: "18px" }}
              onClick={() => { setActiveSection("Dashboard"); navigate("/dashboard"); }}
            >
              <p className="text-2xl  font-semibold " style={{fontFamily:"Poppins"}}>Dashboard</p>
            </button>
          </li>
          <li className="mb-3">
            <button
              type="button"
              className={`sidebar-btn w-full pl-3 text-start hover:border border-cyan-300 rounded-xl hover:text-cyan-400`}
              style={{ height: "50px", fontSize: "18px" }}
              onClick={() => navigate("/employeinfo")}
            >
              <p className="text-2xl font-semibold " style={{fontFamily:"Poppins"}}>Employees Info</p>
            </button>
          </li>
          <li className="mb-3">
            <button
              type="button"
              className={`sidebar-btn w-full pl-3 text-start hover:border border-cyan-300 rounded-xl hover:text-cyan-400`}
              style={{ height: "50px", fontSize: "18px" }}
              onClick={() => navigate("/employestatus")}
            >
              <p className="text-2xl font-semibold " style={{fontFamily:"Poppins"}}>Tasks</p>
            </button>
          </li>
          <li className="mb-3">
            <button
              type="button"
              className={`sidebar-btn w-full pl-3 text-start hover:border border-cyan-300 rounded-xl hover:text-cyan-400`}
              style={{ height: "50px", fontSize: "18px" }}
              onClick={() => navigate("/checkin")}
            >
              <p className="text-2xl font-semibold " style={{fontFamily:"Poppins"}}>Checkin Page</p>
            </button>
          </li>
          <Link to="/profiles">
            <li className="mb-3">
              <button
                type="button"
                className={`sidebar-btn w-full pl-3 text-start hover:border border-cyan-300 rounded-xl hover:text-cyan-400`}
                style={{ height: "50px", fontSize: "18px" }}
              >
                <p className="text-2xl font-semibold " style={{fontFamily:"Poppins"}}>Profiles</p>
              </button>
            </li>
          </Link>
        </ul>
        <div className="place-content-center flex mt-16">
          <button className="  h-12 w-28  italic rounded-xl border border-cyan-300 hover:w-32 hover:h-14" onClick={() => navigate("/createuser")}>
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;
