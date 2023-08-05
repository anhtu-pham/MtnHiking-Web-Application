import React, { useState } from "react";
import { Form, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";

import video from "../../assets/videos/mountain_2.mp4";
import "./signup.css";

// const API_URL = "http://localhost:5000";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const requestSignUp = () => {

    // e.preventDefault();

    // try {
    // let response = await fetch("/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     email: email,
    //     password: password,
    //   }),
    // });
    // if(response.ok) {
    //   console.log("FETCH COMPLETED");
    //   navigate("/main", {state: username});
    // }
    // else {
    //   navigate("/");
    // }

    // try {

    // let response = await axios.post(API_URL + "/signup", {
    //   username: username,
    //   email: email,
    //   password: password
    // });
    // let receivedUsername = response.data.username;
    // let receivedMessage = response.data.message;
    // if(receivedMessage != "") {
    //   navigate("/signup", { state: receivedMessage });
    // }
    // else {
    //   navigate("/main", { state: receivedUsername });
    // }

    axios.post(API_URL + "/signup", {
      username: username,
      email: email,
      password: password
    })
      .then((response) => {
        let receivedUsername = response.data.username;
        let receivedMessage = response.data.message;
        if (receivedMessage != "") {
          navigate("/signup", { state: receivedMessage });
        }
        else {
          navigate("/main", { state: receivedUsername });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // }
    // catch (error) {
    //   navigate("/signup");
    // }

    // .then(() => {
    //   navigate("/main", {state: username});
    // })
    // .catch(() => {
    //   navigate("/");
    // });
    // } catch (error) {
    //   console.log(error);
    //   navigate("/signup");
    // }

  };

  return (
    <div className="signup col-xl-12 col-xxl-8 px-4 py-5">

      <div class="video-background-holder">
        <div class="video-background-overlay"></div>
        <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
          <source src={video} type="video/mp4" />
        </video>
      </div>



      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-6 text-center text-lg-start">
          {/* <h1 className="display-2 fw-bold lh-1 text-body-emphasis mb-3">
            SIGN UP
          </h1> */}
          {/* <!-- <p className="col-lg-10 fs-3">
            Register for new account
          </p> --> */}
          <div class="d-flex h-100 text-center align-items-center">
            <div class="w-100 text-white">
              <h1 class="display-4">SIGN UP</h1>
              <p class="lead mb-0">Create your new account</p>
            </div>
          </div>


        </div>
        <div className="col-md-10 mx-auto col-lg-4">
          <Form
            className="form-signup p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={requestSignUp}
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
            <button className="w-100 btn btn-lg btn-dark" type="submit">
              Signup
            </button>
            <hr className="my-4" />
            <small class="text-body-secondary">{message}</small>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
