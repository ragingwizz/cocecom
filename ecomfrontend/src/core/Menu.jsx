import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { signout, isAuthenticated } from "../auth/helper";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// @ts-ignore
function withRouter<ComponentProps>(Component: React.FunctionComponent<ComponentProps>) {
    function ComponentWithRouterProp(props: ComponentProps) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}

const currentTab = (location, path) => {
  if (location === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history,location, path }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link
            style={currentTab(location, "/")}
            className="nav-link"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Signin
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
              className="nav-link text-warning"
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
