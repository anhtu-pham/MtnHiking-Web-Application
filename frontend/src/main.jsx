import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

import {QueryClient, QueryClientProvider} from 'react-query';
// import { Navigate } from "react-router-dom";

// import Home from "./components/home/Home";
import SignUp from "./components/authentication/SignUp";
import LogIn from "./components/authentication/LogIn";
import MainScreen from "./components/main_screen/MainScreen";

// import signUpRequest from "./api/authentication/signUpRequest"

// import API_URL from './config';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route 
        path="/signup" 
        element={<SignUp />}
        // action={async ({params, request}) => {
        //   await signUpRequest(params, request);
        //   return <Navigate to="/main" />;
        // }} 
      />
      <Route path="/login" element={<LogIn />} />
      <Route path="/main" element={<MainScreen />} />
    </Route>
  )
  // [
  //   { path: "/", element: <App /> },
  //   { path: "/signup", element: <SignUp /> },
  //   { path: "/login", element: <LogIn />}
  // ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </QueryClientProvider>
  </React.StrictMode>
  // </BrowserRouter>
)