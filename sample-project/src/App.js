// import logo from './logo.svg';


import React, { lazy, useEffect } from 'react'
import './App.css';
import Dashboard from './component/dashboard/Dashboard';
//import Checkinpage from './component/checkinpage/Checkinpage';
import Loginpage from './component/loginpage/Loginpage';
import { BrowserRouter,Routes,Route, } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import AuthGurad from './component/auth/Auth';
import Createuser from './component/createuser/Createuser';
import Checkinpage from './component/checkinpage/Checkinpage';
import Profiles from './component/Profiles/Profiles';
//import EmployeStatus from './component/employestatus/EmployeStatus';
import EmployeInfo from './component/employeinfo/EmployeInfo';
// import FirebaseTable from './component/employeinfo/EmployeInfo';
import { themeChange } from 'theme-change'
import Taskpage from './component/employestatus/Taskpage';
function App() {

  
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

return (
    
    
<BrowserRouter>
   <div>
    <Routes>
    <Route exact path="/" element={<Loginpage />} />
        <Route exact path="/dashboard" element={<AuthGurad component={< Dashboard/>} />} />
        <Route exact path="/createuser" element={<AuthGurad component={<Createuser/>} />} />
        <Route exact path="/checkin" element={<AuthGurad component={<Checkinpage/>} />} />
        <Route exact path="/home" element={<AuthGurad component={<Dashboard/>} />} />
        <Route exact path="/employeinfo" element={<AuthGurad component={<EmployeInfo/>} />} />
        <Route exact path="/employestatus" element={<AuthGurad component={<Taskpage/>} />} />
        <Route exact path="/profiles" element={<AuthGurad component={<Profiles/>} />} />
    </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;
