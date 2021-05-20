import React, { useState, useEffect } from "react";

import "../styles/FoodOrderPage.css";

// Importing Components
// import Nav from "../components/Nav";
import LoggedInNav from "./LoggedInNav";
import Cart from "./Cart";

// Importing Images
import kfcBg from "../images/KFC BG.svg";
import backArrow from "../images/Back Arrow.svg";
import hiveBackdrop from "../images/Hive Backdrop.svg";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";
import { businessAddresses, restaurantInfo } from "../redux/actions";

//Redux stuff
import { useSelector, useDispatch } from "react-redux";

const showCart = () => {
  var element = document.getElementById("cart");
  element.classList.remove("cart-hide");
  element.classList.add("cart");
};

var distance = require("google-distance-matrix");

const FoodOrderPage = () => {
  const dispatch = useDispatch();
  const userLoc = useSelector((state) => state.userLocation.coordinates);
  const destination = useSelector(
    (state) => state.businessAddresses.addresses.address
  );

  const [restaurant, setRestaurant] = useState({ restaurants: [] });
  const [businessUsers, setBusinessUsers] = useState({ results: [] });

  useEffect(() => {
    getUsers();
    getRestaurants();
  }, []);
  const getRestaurants = () => {
    axios
      .get("http://localhost:5000/business-auth")
      .then((response) => {
        setRestaurant({ restaurants: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    axios
      .get("http://localhost:5000/business-auth")
      .then((response) => {
        var addresses = {
          address: response.data.map((user) => {
            return user.address;
          }),
        };
        console.log(addresses);
        dispatch(businessAddresses(addresses));
      })
      .catch((error) => {
        console.log(error);
      });

    var origins = [userLoc];
    var destinations = destination;

    distance.key("");

    // distance.matrix(origins, destinations, function (err, distances) {
    //   if (!err) {
    //     // var result = { fala: distances.rows[0].elements };
    //     const result = distances.rows[0].elements;
    //     const destAddresses = distances.destination_addresses;
    //     console.log(destAddresses.length);
    //     setBusinessUsers({ results: result });
    //   } else console.log(err);
    // });
  };

  return (
    <>
      <LoggedInNav showCart={showCart} linkTo="/food-order/cart" />
      <div className="main-section">
        <img
          src={hiveBackdrop}
          className="hive-backdrop"
          alt=""
          width="450px"
        />
        <div className="title">
          <h1>Food Ordering</h1>
          <p>
            Here you can advance order food for dine-in <br /> or takeaway and
            also reserve tables
          </p>
        </div>
        <div className="search-section">
          <p>
            You can browse through restaurants near <br /> you or search
          </p>

          <form className="search-form" action="">
            <input type="text" placeholder="Search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="search-results">
          <div className="grid">
            {/* Cards Start */}
            {restaurant.restaurants.map((restaurant, restIndex) => (
              <div className="card">
                <div className="card-image">
                  <img src={kfcBg} alt="" width="100%" />
                  <h1>{restaurant.restaurantname}</h1>
                </div>
                <div className="card-info">
                  <div className="card-left">
                    {businessUsers.results.map((use, cardIndex) =>
                      cardIndex == restIndex ? (
                        <>
                          <div className="card-info-dist">
                            <i className="fa fa-road"></i>
                            <p>{use.distance.text}</p>
                          </div>
                          <div className="card-info-time">
                            <i className="fa fa-clock-o"></i>
                            <p>{use.duration.text}*</p>
                          </div>
                        </>
                      ) : null
                    )}
                  </div>
                  <div className="forward-arrow">
                    <Link to="/menu">
                      <img
                        src={backArrow}
                        alt=""
                        width="30px"
                        onClick={() =>
                          dispatch(
                            restaurantInfo(
                              restaurant._id,
                              restaurant.restaurantname
                            )
                          )
                        }
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* Cards End */}
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-text">
            <p>* Food preparation times can and may vary</p>
          </div>
        </div>
      </div>
      <Cart linkTo="/food-order" />
    </>
  );
};

export default FoodOrderPage;