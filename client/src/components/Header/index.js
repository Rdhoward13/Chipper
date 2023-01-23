import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-warning text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-muted text-start" to="/">
            <img
              className="rounded-circle ml-5"
              src="./images/Chirper_appicon.jpg"
              alt="full logo"
              height="100"
            ></img>
            <h1 className="m-0 text-small">CHIRPER</h1>
          </Link>
        </div>
        <h2 className="m-0">Chirp Through Life's Connections.</h2>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-secondary m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-secondary m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-secondary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-secondary m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
