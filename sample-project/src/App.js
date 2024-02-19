import logo from './logo.svg';
import './App.css';
import Dashboard from './component/dashboard/Dashboard';
//import Checkinpage from './component/checkinpage/Checkinpage';
import Loginpage from './component/loginpage/Loginpage';
import { BrowserRouter,Routes,Route, } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import AuthGurad from './component/auth/Auth';
import Createuser from './component/createuser/Createuser';
import Checkinpage from './component/checkinpage/Checkinpage';
 
function App() {
return (
    
    
<BrowserRouter>
   <div>
    <Routes>
    <Route exact path="/" element={<Loginpage />} />
        <Route exact path="/dashboard" element={<AuthGurad component={< Dashboard/>} />} />
        <Route exact path="/createuser" element={<AuthGurad component={<Createuser/>} />} />
        <Route exact path="/checkin" element={<AuthGurad component={<Checkinpage/>} />} />
        <Route exact path="/home" element={<AuthGurad component={<Dashboard/>} />} />
    </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;
