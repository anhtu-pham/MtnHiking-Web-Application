import React from "react";
import { Form } from "react-router-dom";
import "./login.css";

const LogIn = () => {
    return (
    <div className="login col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-2 fw-bold lh-1 text-body-emphasis mb-3">LOG IN</h1>
          {/* <p className="col-lg-10 fs-3">
            Please type your email address and password in the boxes to go to
            your account.
          </p> */}
        </div>
        <div className="col-md-10 mx-auto col-lg-4">
          <Form
            className="form-signup p-4 p-md-5 border rounded-3 bg-body-tertiary"
            action="/login"
            method="post"
          >
            <div>
              {/* <p><small><%= err %></small></p> */}
            </div>
            <div className="form-floating mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Log in
            </button>
            <hr className="my-4" />
          </Form>
        </div>
      </div>
    </div>
    );
}

export default LogIn;