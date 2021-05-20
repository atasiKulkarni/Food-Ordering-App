import React, { useState, useEffect } from "react";

// Importing components
import Orders from "./Orders";

// Importing Images
import bookHallBg from "../images/Book Hall BG.svg";

// Importing other packages
import axios from "axios";

const RestaurantDashboardHome = () => {
  const [order, setOrder] = useState({ orders: [] });

  const getOrder = (e) => {
    axios
      .get("http://localhost:5000/order")
      .then((response) => {
        setOrder({ orders: response.data });
        console.log(order);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showBtn = {
    display: "block",
  };
  return (
    <>
      <div className="restaurant-dashboard-home">
        <div className="top-section">
          <div className="section">
            <img src={bookHallBg} alt="" width="180px" />
            <div className="section-content">
              <h3>242</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="section">
            <img src={bookHallBg} alt="" width="180px" />
            <div className="section-content">
              <h3>12</h3>
              <p>
                Pending <br /> Approval
              </p>
            </div>
          </div>
          <div className="section">
            <img src={bookHallBg} alt="" width="180px" />
            <div className="section-content">
              <h3>3</h3>
              <p>Ongoing</p>
            </div>
          </div>
          <div className="section">
            <img src={bookHallBg} alt="" width="180px" />
            <div className="section-content">
              <h3>100</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>
        '
        <Orders showBtn={showBtn} />
      </div>
    </>
  );
};

export default RestaurantDashboardHome;