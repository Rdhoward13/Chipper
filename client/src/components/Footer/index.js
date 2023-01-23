import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-warning p-4">
      <div className="container text-center mb-5">
        {/* {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )} */}
        <img
          className="ml-5"
          src="./images/Chirper_logo.jpg"
          alt="full logo"
          height="175"
        ></img>
        {location.pathname !== "/" && (
          <button
            className="btn btn-dark mb-3 d-block mx-auto mt-2"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
