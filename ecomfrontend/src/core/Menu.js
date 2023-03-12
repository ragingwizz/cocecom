import React, {Fragment} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {signout, isAuthenticated} from "../auth/helper"
const currentTab = (location, path) =>{
    if (location.pathname===path){
        return {color: "#2ecc72"}
    }else{
        return {color: "#FFFFFF"}
    }
}

const Menu =({path}) =>{
    const location = useLocation();
    const navigate = useNavigate();

    // console.log("\r\nlocation: ",location, "\r\npath: ",path, "\r\nnavigate: ")
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className='nav-link' to="/" style={currentTab(location,"/")}>Home</Link>
                </li>
                {isAuthenticated() && (
                    <li className="nav-item">
                        <Link className='nav-link' to="/cart" style={currentTab(location,"/cart")}>Cart</Link>
                    </li>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <Link className='nav-link' to="/user/dashboard" style={currentTab(location,"/user/dashboard")}>Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className='nav-link' to="/signup" style={currentTab(location,"/signup")}>SignUp</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/signin" style={currentTab(location,"/signin")}>SignIn</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span onClick={()=>{
                            signout(() =>{
                                navigate("/")
                            });
                        }} className="nav-link text-warning"> Signout</span>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Menu;