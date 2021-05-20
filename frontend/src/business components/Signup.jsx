import React, { useState } from "react";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

//Importing Images
import logo from "../images/Logo.svg";

import { useDispatch } from "react-redux";
import { loggedIn, restaurantUserID } from "../redux/actions";

const Signup = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    restaurantname: "",
    phone: null,
    address: "",
    city: "",
    cnic: null,
  });

  const setEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };
  const setPassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };
  const setFullName = (e) => {
    setUser({ ...user, fullname: e.target.value });
  };
  const setRestaurantName = (e) => {
    setUser({ ...user, restaurantname: e.target.value });
  };
  const setPhone = (e) => {
    setUser({ ...user, phone: e.target.value });
  };
  const setCnic = (e) => {
    setUser({ ...user, cnic: e.target.value });
  };
  const setCity = (e) => {
    setUser({ ...user, city: e.target.value });
  };
  const setAddress = (e) => {
    setUser({ ...user, address: e.target.value });
  };
  const userSubmit = (e) => {
    e.preventDefault();
    const displayUser = {
      email: user.email,
      password: user.password,
      fullname: user.fullname,
      restaurantname: user.restaurantname,
      phone: user.phone,
      address: user.address,
      city: user.city,
      cnic: user.cnic,
    };
    console.log(displayUser);

    axios
      .post("http://localhost:5000/business-auth/register", displayUser)
      .then((res) => {
        dispatch(restaurantUserID(null, user.restaurantname));
        window.location = "/restaurant-dashboard";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="cust-signup-section">
        <nav className="login-signup-nav">
          <div className="logo">
            <img src={logo} alt="" width="200px" />
            <h1>For Businesses</h1>
          </div>
          <div className="buttons">
            <Link to="/business-login">
              <button className="button-style signup-btn">Login</button>
            </Link>
          </div>
        </nav>
        <div className="signup-form">
          <form onSubmit={userSubmit}>
            <div className="col-1">
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input type="email" VALUE={user.email} onChange={setEmail} />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    VALUE={user.password}
                    onChange={setPassword}
                  />
                </div>
              </div>
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    VALUE={user.fullName}
                    onChange={setFullName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Restaurant Name</label>
                  <input
                    type="text"
                    VALUE={user.restaurantname}
                    onChange={setRestaurantName}
                  />
                </div>
              </div>
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Mobile No.</label>
                  <input type="number" VALUE={user.phone} onChange={setPhone} />
                </div>
                <div className="form-group">
                  <label htmlFor="">Address</label>
                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="5"
                    VALUE={user.address}
                    onChange={setAddress}
                  ></textarea>
                </div>
              </div>
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">City</label>
                  <input type="text" VALUE={user.city} onChange={setCity} />
                </div>
                <div className="form-group">
                  <label htmlFor="">CNIC</label>
                  <input type="number" VALUE={user.cnic} onChange={setCnic} />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="">Upload Documents</label>
                  <input type="file" />
                </div> */}
              </div>
            </div>
            <input type="submit" value="Signup" />
          </form>
        </div>
        <div className="signup-footer">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <h3>Signup for Customers</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;