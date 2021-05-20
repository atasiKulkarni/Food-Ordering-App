import React from "react";

// Importing Images
import logo from "../images/Logo.svg";

// Importing components
import restaurantDashboardHome from "./RestaurantDashboardHome";
import restaurantDashboardMenuList from "./RestaurantDashboardMenuList";
import RestaurantDashboardOrderList from "./RestaurantDashboardOrderList";
import Orders from "./Orders";
import AddMenu from "./AddMenu";
import UpdateMenu from "./UpdateMenu";

// Importing Other Packages
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Redux Stuff
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, restaurantUserID } from "../redux/actions";

const RestaurantDashboard = () => {
  const restaurant = useSelector((state) => state.restaurantUserID);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(loggedIn(false));
    dispatch(restaurantUserID(null, ""));
    window.location = "/business-login";
    // location.assign("http://localhost:3000");
    // browser.cookies.remove();
    var allCookies = document.cookie.split(";");

    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  };

  return (
    <>
      <Router>
        <div className="rest-dashboard">
          <div className="nav">
            <div className="logo">
              <img src={logo} alt="" width="150px" />
            </div>
            <div className="search-bar">
              <input type="text" name="" id="" />
              <input type="submit" value="Search" />
            </div>
            <div>
              <h1>{restaurant.restaurantname}</h1>
            </div>
            <div className="profile-btn">
              <a href="">
                <i class="fa fa-refresh"></i>
              </a>
              <a href="">
                <i class="fa fa-user"></i>
              </a>
              <button href="">
                <i class="fa fa-sign-out" onClick={logout}></i>
              </button>
            </div>
          </div>
          <div className="main-section">
            <div className="side-bar">
              <Link to="/restaurant-dashboard">
                <a href="">Dashboard</a>
              </Link>
              <Link to="/menu-list">
                <a href="">Menu List</a>
              </Link>
              <Link to="/order-list">
                <a href="">Order List</a>
              </Link>
              <a href="">Tables</a>
              <a href="">Earnings</a>
              <a href="">Users</a>
              <a href="">Logout</a>
            </div>
            <div className="analytics">
              <Switch>
                <Route
                  path="/restaurant-dashboard"
                  component={restaurantDashboardHome}
                />
                <Route
                  path="/menu-list"
                  component={restaurantDashboardMenuList}
                />
                <Route
                  path="/order-list"
                  component={RestaurantDashboardOrderList}
                />
                <Route path="/add-menu" component={AddMenu} />
                <Route path="/update-menu/:id" component={UpdateMenu} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default RestaurantDashboard;