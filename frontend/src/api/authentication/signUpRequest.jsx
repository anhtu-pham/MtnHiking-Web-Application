// import { Navigate } from "react-router-dom";

const signUpRequest = async (params, request) => {
    try {
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
      // if (response.ok) {
      //   <Navigate to="/main" />
      // } else {
      //   throw new Error("Error");
      // }
    }
    catch(error) {
      console.log(error);
    }
}

export default signUpRequest;