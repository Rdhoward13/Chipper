import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <img className="rounded-circle" src="./images/Chirper_appicon.jpg" alt="full logo" height="100"> 
        </img>
        <Link className="text-light" to="/">
          <h1 className="m-0">Chirper</h1>
        </Link>
        <p className="m-0">Chirp Through Life's Connections.</p>
      
      <ul>
      {Auth.loggedIn() ? (
                              <>
                                  {/* <li>
                                      <Link to='myaccount' className='nav-link scrollto'>
                                          My Account
                                      </Link>
                                  </li> */}
                                  <li>
                                      <Link to='/' className='nav-link scrollto' onClick={Auth.logout}>
                                          Logout
                                      </Link>
                                  </li>
                              </>
                          ) : (
                              <>
                                  <li>
                                      <Link to='signup' className='nav-link scrollto'>
                                          Sign Up
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='login' className='nav-link scrollto'>
                                          Login
                                      </Link>
                                  </li>

                              </>
                          )}
      </ul>
      </div>
    </header>
  );
};

export default Header;