import React, { useState } from "react";
import { Form, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";

import video from "../../assets/videos/mountain_2.mp4";
import "./login.css";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const requestLogIn = () => {
    axios.post(API_URL + "/login", {
      username: username,
      password: password
    })
      .then((response) => {
        let receivedUsername = response.data.username;
        let receivedMessage = response.data.message;
        if (receivedMessage != "") {
          navigate("/login", { state: receivedMessage });
        }
        else {
          navigate("/main", { state: receivedUsername });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login col-xl-12 col-xxl-8 px-4 py-5">

      <div className="video-background-holder">
        <div className="video-background-overlay"></div>
        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-6 text-center text-lg-start">
          {/* <h1 className="display-2 fw-bold lh-1 text-body-emphasis mb-3">LOG IN</h1> */}
          {/* <p className="col-lg-10 fs-3">
            Please type your email address and password in the boxes to go to
            your account.
          </p> */}

          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="display-4">LOG IN</h1>
              <p className="lead mb-0">Log in your account</p>
            </div>
          </div>

        </div>
        <div className="col-md-10 mx-auto col-lg-4">
          <Form
            className="form-signup p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={requestLogIn}
          >
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
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">
              Login
            </button>
            <hr className="my-4" />
            <small className="text-body-secondary">{message}</small>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;