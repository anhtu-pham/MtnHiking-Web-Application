import React from "react";
import { Form } from "react-router-dom";
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
      <div className="py-5">
        <h1 className="display-2 fw-bold">MTNHIKING</h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4 fw-bolder">
            Find mountain hiking trails that perfectly match your expectation,
            build profile with schedule of energetic hiking trips, and many
            more!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Form action="/signup" method="get">
              <button
                type="submit"
                // onclick={navigateToSignUp}
                className="btn btn-outline-dark btn-lg me-sm-3 fw-bold border-3 fs-4"
              >
                Sign up
              </button>
            </Form>
            <Form action="/login" method="get">
              <button
                type="submit"
                className="btn btn-outline-dark btn-lg px-4 me-sm-3 fw-bold border-3 fs-4"
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