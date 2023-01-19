import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container">
          <div className="header-container d-flex align-items-center justify-content-between rounded">
            <div className="logo rounded-left"></div>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <Link to="/" className="nav-link scrollto">
                    Categories
                  </Link>
                </li>
                {/* {if user is logged in, show create listing, my account, and logout links */}
                {Auth.loggedIn() ? (
                  <>
                    <li>
                      <Link to="createProduct" className="nav-link scrollto">
                        Create Listing
                      </Link>
                    </li>
                    <li>
                      <Link to="myaccount" className="nav-link scrollto">
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link to="contact" className="nav-link scrollto">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="getstarted scrollto"
                        onClick={Auth.logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="signup" className="nav-link scrollto">
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link to="login" className="getstarted scrollto">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
