import React, { useState } from "react";
import { loginUser } from "../../utils/API";
import Auth from "../../utils/auth";

export default function Login() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error("Oh No! Something went sideways...");
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

    return (
        <div class="login-border display-inline-block">
            <section id="login" className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4" data-aos="fade-right">
                            <div className="section-title">
                                <h2 class="login-text">Login To Chipper!</h2>
                            </div>
                        </div>
                        <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                            <form action="forms/contact.php" method="post" role="form" className="php-email-form mt-4" onSubmit={handleFormSubmit}>
                                <div className="row" class="input-space">
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="email" className="form-control" class="input-width"name="email" id="email" placeholder="Email" onChange={handleInputChange} value={userFormData.email} required />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="password" className="form-control" class="input-width" name="password" id="password" placeholder="Password" onChange={handleInputChange} value={userFormData.password} required />
                                    </div>
                                </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                    </div>
                                <div className="text-center"><button class="submit-button button-hover"disabled={!(userFormData.email && userFormData.password)} type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};