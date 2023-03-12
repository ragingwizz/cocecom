import React, { Component } from 'react';
import {Route, Outlet, Navigate} from "react-router-dom"
import { isAuthenticated } from './index';

// const PrivateRoutes = ({children, ...rest}) => {
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           isAuthenticated() 
//           ? (
//             <Component {...props} />
//           ) 
//           : (
//             <Navigate
//               to= {{
//                 pathname: "/signin",
//                 state: { from: props.location },
//               }}
//             />
//           )}
//       />
//     );
// };

// const PrivateRoutes = ({ isAuthenticated(), children }) => {
//   return isAuthenticated() ? children : <Navigate to="/signin" />;
// };

// Working
const PrivateRoutes = () => {
  const auth = isAuthenticated(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;