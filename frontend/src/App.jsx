import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./App.css";
import Home from "./components/home/Home";
// import SignUp from "./components/authentication/SignUp";
// import MountainList from "./components/mountains/MountainList";
// import TrailList from "./components/trails/TrailList";

const App = () => {
  return (
    // <Router>
    //   {/* <div>
    //     <Link to="/">Hello</Link>
    //     {/* <Link to="/signup">Hello</Link> */}
    //    {/* </div> */}
    //    <Switch>
    //      <Route path="/" component={Home} />
    //        {/* <Home /> */}
    //     {/* </Route> */}
    //    </Switch>
    // </Router>
    // <BrowserRouter basename="/app">
    // <Routes>
    // {/* <Route path="/" component={Home} /> */}
    // {/* <Route path="/signup" component={SignUp} /> */}
    // {/* <Route path="/login" component={LogIn} /> */}
    // {/* <div className="App"> */}
    <Home />
    // {/* <SignUp /> */}
    // {/* </div> */}
    // </Routes>
    // </BrowserRouter> */}
  );
};

export default App;