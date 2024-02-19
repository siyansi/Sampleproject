import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LeftContainer = () => {
  const location = useLocation();


  const navigate = useNavigate()
  return (
    <div style={{ width: "18%" }} className="">
      <div className="w-full bg-rose-100 shadow-xl h-screen pt-4 pb-4">
        <ul>
          <li>
          
              <button
                type="button"
                className={`sidebar-btn w-full border-b-2 border-b-rose-400 hover:bg-green-100  `}
                style={{ height: "50px", fontSize: "18px" }}
              >
              <p className="text-xl font-bold"  onClick={()=>navigate('/school')}> School Info</p> 
              </button>
         
          </li>
          <li>
           
              <button
                type="button"
                className={`sidebar-btn w-full border-b-2 hover:bg-green-100 border-b-rose-400 `}
                style={{ height: "50px", fontSize: "18px" }}
              >
               <p className="text-xl font-bold"  onClick={()=>navigate('/dashboard')}> Dashboard</p>
              </button>
           
          </li>
          <li>
            <button
              type="button"
              className="sidebar-btn w-full border-b-2 hover:bg-green-100 border-b-rose-400"
              style={{ height: "50px", fontSize: "18px" }}
            >
             <p className="text-xl font-bold"  onClick={()=>navigate('/student')}>Student List</p>
            </button>
          </li>
          <li>
            
              <button
                type="button"
                className={`sidebar-btn w-full border-b-2 hover:bg-green-100 border-b-rose-400 $`}
                style={{ height: "50px", fontSize: "18px" }}
              >
              <p className="text-xl font-bold" onClick={()=>navigate('/checkin')}>Checkin Page</p>  
              </button>
        
          </li>
          <Link to="/dashboard">  <li className="">
            <button
              type="button"
              className="sidebar-btn w-full border-b-2 hover:bg-green-100 border-b-rose-400"
              style={{ height: "50px", fontSize: "18px" }}
            >
             <p className="text-xl font-bold"> Profile</p> 
            </button>
          </li></Link>
        </ul>
        <div className="place-content-center flex mt-16">
        <button className="bg-rose-400 h-12 w-28 rounded-xl hover:bg-green-100" onClick={()=>navigate('/createuser')}>
            Create User 
        </button>
      </div>
      </div>

     
    </div>
  );
};

export default LeftContainer;
