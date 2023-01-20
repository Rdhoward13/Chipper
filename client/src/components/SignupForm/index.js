import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-secondary text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                {/* <Link to="/">back to the homepage.</Link> */}
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-warning"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;

// export default function Signup() {
//   const [userFormData, setUserFormData] = useState({
//     email: "",
//     password: "",
//     username: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await ADD_USER(userFormData);

//       if (!response.ok) {
//         throw new Error("something went wrong!");
//       }

//       const { token, user } = await response.json();
//       console.log(user);
//       Auth.login(token);
//     } catch (err) {
//       console.error(err);
//     }

//     setUserFormData({
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <div class="login-border display-inline-block">
//       <section id="login" className="login">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-4" data-aos="fade-right">
//               <div className="section-title">
//                 <h2 class="login-text">Login To Chipper!</h2>
//               </div>
//             </div>
//             <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
//               {/* eslint-disable-next-line */}
//               <form
//                 action="forms/contact.php"
//                 method="post"
//                 role="form"
//                 className="php-email-form mt-4"
//                 onSubmit={handleFormSubmit}
//               >
//                 <div className="row" class="input-space">
//                   <div className="col-md-6 form-group mt-3 mt-md-0">
//                     <input
//                       type="email"
//                       className="form-control"
//                       class="input-width"
//                       name="email"
//                       id="email"
//                       placeholder="Email"
//                       onChange={handleInputChange}
//                       value={userFormData.email}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 form-group mt-3 mt-md-0">
//                     <input
//                       type="password"
//                       className="form-control"
//                       class="input-width"
//                       name="password"
//                       id="password"
//                       placeholder="Password"
//                       onChange={handleInputChange}
//                       value={userFormData.password}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6 form-group mt-3 mt-md-0"></div>
//                 <div className="col-md-6 form-group mt-3 mt-md-0"></div>
//                 <div className="text-center">
//                   <button
//                     class="submit-button button-hover"
//                     disabled={!(userFormData.email && userFormData.password)}
//                     type="submit"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
