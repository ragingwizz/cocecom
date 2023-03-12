import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin";
import Cart from "./core/Cart";
// // import PrivateRoutes from "./auth/helper/PrivateRoutes";
// // import UserDashboard from "./user/UserDashboard";
// import Cart from "./core/Cart";

const AppRoutes = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home />}/> 
                    <Route path="/signup" exact element={<Signup />}/> 
                    <Route path="/signin" exact element={<Signin />}/> 
                    <Route path="/cart" exact element={<Cart />}/> 

                    {/* <Route path="/" exact element={<PrivateRoutes />}>
                        <Route path="/user/dashboard" exact element ={<UserDashboard />} />
                    </Route>  */}
                    <Route path="/user/dashboard" exact element={<PrivateRoutes><UserDashboard /></PrivateRoutes>}/>
                    {/* <Route path="/cart" exact element={<PrivateRoutes><Cart /></PrivateRoutes>}/> */}
                    
                    {/* <PrivateRoutes path="/user/dashboard" exact element ={<UserDashboard />} /> */}
                    {/* <Route path="/signup" exact element={<Signup />} />
                    <Route path="/signin" exact component={<Signin />} />
                    <Route path="/cart" exact component={<Cart />} /> */}
                </Routes>
            </BrowserRouter>
        </div> 
    )
}

export default AppRoutes;
