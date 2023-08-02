import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Routes } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
// import './index.css';
import {QueryClient, QueryClientProvider} from 'react-query';
// import Home from "./components/home/Home";
import SignUp from "./components/authentication/SignUp";
import LogIn from "./components/authentication/LogIn";
// import { BrowserRouter, Switch } from "react-router-dom";

// import API_URL from './config';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route 
        path="/signup" 
        element={<SignUp />}
        action={async ({params, request}) => {
          const response = await fetch("/signup", {
            method: "POST",
            headers: {
              "Content-type": 'application/json'
            },
            body: JSON.stringify({
              username: request.username,
              email: request.email,
              password: request.password
            })
          });
          if (!response.ok) {
            throw new Error("Error");
          }
          // return response.json();
        }} 
      />
      <Route path="/login" element={<LogIn />} />
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