import React, { useState, useEffect } from "react";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loggedIn, restaurantUserID } from "../redux/actions";

//Importing Images
import logo from "../images/Logo.svg";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(false);

  axios.defaults.withCredentials = true;
  const setEmail = (e) => {
    setUser({ ...user, email: e.target.value });
    console.log(e.target.value);
  };
  const setPassword = (e) => {
    setUser({ ...user, password: e.target.value });
    console.log(e.target.value);
  };
  const userSubmit = (e) => {
    e.preventDefault();
    const displayUser = {
      email: user.email,
      password: user.password,
    };

    // console.log(displayUser);
    axios
      .post("http://localhost:5000/business-auth/login", displayUser)
      .then((res) => {
        if (!res.data.auth) {
          dispatch(loggedIn(false));

          // Display error message
          // setLoginStatus(res.data.message);
        } else {
          localStorage.setItem("token", res.data.token);
          dispatch(restaurantUserID(res.data.userID, res.data.restaurantname));
          dispatch(loggedIn(true));
          window.location = "/restaurant-dashboard";
        }
      });
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/business-auth/login").then((res) => {
      if (res.data.loggedIn == true) {
        // const result = res.data.user.user.email;
        setLoginStatus(true);
      } else {
        console.log("Not logged in");
      }
    });
  }, []);

  return (
    <>
      <div className="cust-login-section">
        <nav className="login-signup-nav">
          <div className="logo">
            <img src={logo} alt="" width="200px" />
            <h1>For Businesses</h1>
          </div>
          <div className="buttons">
            <Link to="/business-signup">
              <button className="button-style signup-btn">Sign Up</button>
            </Link>
          </div>
        </nav>
        <div className="login-form">
          <form onSubmit={userSubmit}>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input type="email" onChange={setEmail} />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input type="password" onChange={setPassword} />
            </div>
            <input type="submit" value="Login" />
          </form>
          {/* <div>{loginStatus && <button>Check if authenticated</button>}</div> */}
        </div>
        <div className="login-footer">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <h3>Login for Customers</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;