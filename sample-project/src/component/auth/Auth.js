import Navbar from "../navbar/Navbar"
import LeftContainer from "../sidebar/Sidebar"


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