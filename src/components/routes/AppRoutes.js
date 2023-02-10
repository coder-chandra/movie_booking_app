import {  BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthPage from "../../pages/authentication/Auth";
import LandingPage from "../../pages/LandingPage/LangingPage"



const AppRoute=()=>{
    return(
    <Router>
        <Routes>
            <Route exact path="/" element={<LandingPage/>} />
            <Route exact path="/login" element={<AuthPage/>}  />
        </Routes>
    </Router>
    )
}

export default AppRoute;