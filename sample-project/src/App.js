import logo from './logo.svg';
import './App.css';
import Dashboard from './component/dashboard/Dashboard';
import Checkinpage from './component/checkinpage/Checkinpage';
import Loginpage from './component/loginpage/Loginpage';
import { BrowserRouter,Routes,Route, } from 'react-router-dom';
 
function App() {
return (
    
    
<BrowserRouter>
   <div>
    <Routes>
      <Route exact path='/'element={<Loginpage/>}/>
      <Route exact path='/dashboard'element={<Dashboard/>}/>
      <Route exact path='/check'element={<Checkinpage/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
