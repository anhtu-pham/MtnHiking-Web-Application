import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import video from "../../assets/videos/mountain_3.mp4";
import styles from "../styles/VideoStyles";
// import { Button } from "@mui/material";
// import "./mainscreen.css";
// import Mountains from "../mountains/Mountains";

const MainScreen = () => {
  const location = useLocation();
  const username = location.state;

  return (
    <div>
      <NavigatorBar />
      <div className="video-background-holder" style={styles.videoHolder}>
        <div className="video-background-overlay" style={styles.videoOverlay}></div>
        <video
          playsInline="playsinline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
          style={styles.video}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="video-background-content container h-100" style={styles.videoContent}>
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="display-4">Hello {username}</h1>
              <p className="lead mb-0">HAVE A GREAT EXPERIENCE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavigatorBar = () => {

  return (
  <nav className="navbar bg-transparent fixed-top">
    <div className="container-fluid">
      <nav
        className="navbar navbar-expand"
        aria-label="Second navbar example"
      >
        <div className="container-fluid">
          <h2 className="navbar-brand text-white">MTNHIKING</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/mountains" className="nav-link text-white">
                  Mountains
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link text-white" href="#">
                  Link
                </a> */}
                <Link to="/profile" className="nav-link text-white">
                  Profile
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Other
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <button
        data-bs-theme="dark"
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="offcanvas offcanvas-end"
        data-bs-theme="dark"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-white"
            id="offcanvasNavbarLabel"
          >
            Offcanvas
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  )
};

export default MainScreen;
