import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const requestSignUp = async () => {
    try {
      await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      navigate("/main", {state: username});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-2 fw-bold lh-1 text-body-emphasis mb-3">
            SIGN UP
          </h1>
          {/* <!-- <p className="col-lg-10 fs-3">
            Register for new account
          </p> --> */}
        </div>
        <div className="col-md-10 mx-auto col-lg-4">
          <Form
            className="form-signup p-4 p-md-5 border rounded-3 bg-body-tertiary"
            // action="/signup"
            // method="post"
          >
            <div>{/* <p><small><%= err %></small></p> */}</div>
            <div className="form-floating mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={requestSignUp}>
              Sign up
            </button>
            <hr className="my-4" />
            {/* <small class="text-body-secondary">Form to sign up for a new account.</small> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
