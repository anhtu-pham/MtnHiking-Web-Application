import React from "react";
import { Form } from "react-router-dom";
import video from "../../assets/videos/mountain_2.mp4";
import "./home.css";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  // const navigateToSignUp = () => {
  //   // console.log("Hello");
  //   navigate("/signup");
  // }

  return (
    <div className="home text-dark px-4 py-5 text-center">

      <div className="video-background-holder">
        <div className="video-background-overlay"></div>
        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
          <source src={video} type="video/mp4" />
        </video>
      </div>



  {/* <div class="d-flex h-100 text-center align-items-center">
            <div class="col-lg-6 mx-auto w-100 text-white">
              <h1 class="display-1">MTNHIKING</h1>
              <p class="lead mb-0">Find mountain hiking trails that perfectly match your expectation,
            build profile with schedule of energetic hiking trips, and many
            more!</p>
            </div>
          </div> */}

      <div className="d-flex h-100 py-5">
        {/* <h1 className="display-2 w-100 fw-bold text-white">MTNHIKING</h1> */}
        <div className="w-100 text-white col-lg-6 mx-auto">


          <h1 className="display-1">MTNHIKING</h1>
          <p className="lead mb-0">Find mountain hiking trails that perfectly match your expectation,
            build profile with schedule of energetic hiking trips, and many
            more!</p>
          {/* <p className="fs-5 mb-4 fw-bolder text-white">
            Find mountain hiking trails that perfectly match your expectation,
            build profile with schedule of energetic hiking trips, and many
            more!
          </p> */}
          <div className="mt-4" />
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Form action="/signup" method="get">
              <button
                type="submit"
                // onclick={navigateToSignUp}
                className="btn btn-outline-light btn-lg me-sm-3 fw-bold border-3 fs-4"
              >
                Sign up
              </button>
            </Form>
            <Form action="/login" method="get">
              <button
                type="submit"
                className="btn btn-outline-light btn-lg px-4 me-sm-3 fw-bold border-3 fs-4"
              >
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;