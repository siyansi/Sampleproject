import React, { useEffect, useState } from "react"
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { themeChange } from 'theme-change'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'


//import emptyImg from "../../asset/undraw_empty_re_opql.svg"
//import logo from "../../asset/vecteezy_apex-lengends-logo-png-apex-lengends-icon-transparent-png_27127464.png"

const Navbar = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
    useEffect(() => {
        themeChange(false)
        if(currentTheme === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
                setCurrentTheme("dark")
            }else{
                setCurrentTheme("light")
            }
        }
        // 👆 false parameter is required for react project
      }, [])


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const navigate = useNavigate()

    return (
       <div className="fixed top-0 w-screen ">
        <nav className=" h-24  bg-opacity-75 flex justify-between items-center px-6 border-b border-cyan-300 ">
            <div className="flex items-center">
                {/* <img className=" h-16 w-16" src ={"https://img.freepik.com/free-vector/hand-drawn-high-school-logo-design_23-2149613319.jpg?size=626&ext=jpg&ga=GA1.1.1726861027.1704513461&semt=ais"} alt="logo" height={50} width={50} /> */}
                <h1 className="font-poppins font-semibold text-white text-5xl ml-8 flex">digis <p className="text-green-500">Ai</p>lor</h1>
            </div>
            {width > 768 ?
                <div className="flex items-center gap-6">
                    <div className="relative">
                    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
                    </div>
                    <label className="swap ">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current text-cyan-200 w-10 h-10 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current text-cyan-200 w-10 h-10 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label>
                    <button className="inbox-btn" onClick={() => document.getElementById('my_modal_5').showModal()}>
                        <IoIosNotifications className="h-10 w-10 text-cyan-200" />
                        <span className="msg-count"></span>
                    </button>
                    <button className="button">
                        <p className="text-cyan-100 font-semibold" onClick={()=>navigate('/')}> Logout</p>
                    </button>
                </div> :
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content text-end flex place-content-end">
                        <label htmlFor="my-drawer" className="menu-bar"><HiMenuAlt2 className="text-end text-white h-10 w-10" /></label>
                    </div>
                    <div className="drawer-side z-10">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        
                        <ul className="menu p-4 w-80 min-h-full text-base-content">
                            <li>
                            <div>
                        <label className="swap  ">
                <input type="checkbox" className="text-white"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current text-white w-8 h-8 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current  text-white w-8 h-8 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label>
                        </div>
                            </li>
                        <li>
          
          <button
            type="button"
            className={`sidebar-btn w-full border-b-zinc-400 hover:bg-green-100  text-white hover:text-black  rounded-full `}
            style={{ height: "50px", fontSize: "18px" }}
          >
          <p className="text-xl font-bold"  onClick={()=>navigate('/dashboard')}>Dashboard </p> 
          </button>
     
      </li>
      <li>
       
          <button
            type="button"
            className={`sidebar-btn w-full border-b-zinc-400 hover:bg-green-100  text-white hover:text-black  rounded-full`}
            style={{ height: "50px", fontSize: "18px" }}
          >
           <p className="text-xl font-bold"  onClick={()=>navigate('/employeinfo')}> Employees Info</p>
          </button>
       
      </li>
      <li>
        <button
          type="button"
          className="sidebar-btn w-full border-b-2 border-b-zinc-400 hover:bg-green-100  text-white hover:text-black  rounded-full"
          style={{ height: "50px", fontSize: "18px" }}
        >
         <p className="text-xl font-bold"  onClick={()=>navigate('/employestatus')}>Employe Status</p>
        </button>
      </li>
      <li>
        
          <button
            type="button"
            className={`sidebar-btn w-full border-b-2 border-b-zinc-400 hover:bg-green-100  text-white hover:text-black  rounded-full $`}
            style={{ height: "50px", fontSize: "18px" }}
          >
          <p className="text-xl font-bold" onClick={()=>navigate('/checkin')}>Checkin Page</p>  
          </button>
    
      </li>
      <Link to="/profiles">  <li className="">
        <button
          type="button"
          className="sidebar-btn w-full border-b-2 border-b-zinc-400 hover:bg-green-100  text-white hover:text-black rounded-full"
          style={{ height: "50px", fontSize: "18px" }}
        >
         <p className="text-xl font-bold"> Profiles</p> 
        </button>
      </li></Link>
    
    <li className="place-content-center flex mt-16">
    <button className="bg-green-300 h-12 w-28 rounded-xl hover:bg-green-100" onClick={()=>navigate('/createuser')}>
        Create User 
    </button>
  </li>
  </ul>            
                    </div>
                </div>
                }
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">No Notification yet</p>
                    <img src={"https://img.freepik.com/free-photo/rag-doll-with-magnifying-glass_1156-145.jpg?size=626&ext=jpg&ga=GA1.1.1726861027.1704513461&semt=ais"} alt="empty" width={300} height={300} />
                    <div className="modal-action self-end">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </nav>
        </div>
    )
}

export default Navbar
