import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LeftContainer = () => {
  const location = useLocation();


  const navigate = useNavigate()
  return (
    <div style={{ width: "18%" }} className=" hidden md:block  fixed top-[95px]">
      <div className="w-full bg-black shadow-xl h-screen pt-4 pb-4">
        <ul>
          <li>
          
              <button
                type="button"
                className={`sidebar-btn w-full   hover:bg-green-100  text-white hover:text-black  rounded-full `}
                style={{ height: "50px", fontSize: "18px" }}
              >
              <p className="text-xl font-bold"  onClick={()=>navigate('/dashboard')}>Dashboard </p> 
              </button>
         
          </li>
          <li>
           
              <button
                type="button"
                className={`sidebar-btn w-full  hover:bg-green-100  text-white hover:text-black  rounded-full`}
                style={{ height: "50px", fontSize: "18px" }}
              >
               <p className="text-xl font-bold"  onClick={()=>navigate('/employeinfo')}> Employees Info</p>
              </button>
           
          </li>
          <li>
            <button
              type="button"
              className="sidebar-btn w-full   hover:bg-green-100  text-white hover:text-black  rounded-full"
              style={{ height: "50px", fontSize: "18px" }}
            >
             <p className="text-xl font-bold"  onClick={()=>navigate('/employestatus')}>Employe Status</p>
            </button>
          </li>
          <li>
            
              <button
                type="button"
                className={`sidebar-btn w-full  hover:bg-green-100  text-white hover:text-black  rounded-full $`}
                style={{ height: "50px", fontSize: "18px" }}
              >
              <p className="text-xl font-bold" onClick={()=>navigate('/checkin')}>Checkin Page</p>  
              </button>
        
          </li>
          <Link to="/profiles">  <li className="">
            <button
              type="button"
              className="sidebar-btn w-full    hover:bg-green-100  text-white hover:text-black rounded-full"
              style={{ height: "50px", fontSize: "18px" }}
            >
             <p className="text-xl font-bold "> Profiles</p> 
            </button>
          </li></Link>
        </ul>
        <div className="place-content-center flex mt-16">
        <button className="bg-white h-12 w-28 rounded-xl hover:bg-green-100" onClick={()=>navigate('/createuser')}>
            Create User 
        </button>
      </div>
      </div>

     
    </div>
  );
};

export default LeftContainer;
