import React, { useState } from "react";
import { Form, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";

import styles from "../styles/VideoStyles";

import video from "../../assets/videos/mountain_2.mp4";
// import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const requestSignUp = () => {

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

  };

  return (
    <div className="signup col-xl-12 col-xxl-8 px-4 py-5">

      <div className="video-background-holder" style={styles.videoHolder}>
        <div className="video-background-overlay" style={styles.videoOverlay}></div>
        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" style={styles.video}>
          <source src={video} type="video/mp4" />
        </video>
      </div>



      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-6 text-center text-lg-start">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="display-4">SIGN UP</h1>
              <p className="lead mb-0">Create your new account</p>
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
              <label htmlFor="floatingInput">Username</label>
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
              <label htmlFor="floatingInput">Email</label>
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
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">
              Signup
            </button>
            <hr className="my-4" />
            <small className="text-body-secondary">{message}</small>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
