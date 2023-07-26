import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
// import './index.css';
import {QueryClient, QueryClientProvider} from 'react-query';
// import Home from "./components/home/Home";
import SignUp from "./components/authentication/SignUp";
// import { BrowserRouter, Switch } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  // createRoutesFromElements(
  //   <Route path="/" element={<App />}>
  //     <Route path="signup" element={<SignUp />} />
  //   </Route>
  // )
  [
    { path: "/", element: <App /> },
    { path: "/signup", element: <SignUp /> }
  ]
)

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