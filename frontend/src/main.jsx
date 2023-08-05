import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import {QueryClient, QueryClientProvider} from 'react-query';

import App from "./App";
// import Home from "./components/home/Home";
import SignUp from "./components/authentication/SignUp";
import LogIn from "./components/authentication/LogIn";
import MainScreen from "./components/main_screen/MainScreen";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/main" element={<MainScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </QueryClientProvider>
  </React.StrictMode>
)