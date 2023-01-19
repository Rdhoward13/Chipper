import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link className="text-light" to="/">
          <h1 className="m-0">Chirper</h1>
        </Link>
        <p className="m-0">Chirp Through Life's Connections.</p>
      </div>
    </header>
  );
};

export default Header;
