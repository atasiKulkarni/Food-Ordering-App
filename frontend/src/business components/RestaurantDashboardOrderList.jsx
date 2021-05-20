import React from "react";

// Importing components
import Orders from "./Orders";

const RestaurantDashboardOrderList = () => {
  return (
    <>
      <div className="order-list-section">
        <h1>Orders</h1>
        <Orders />
      </div>
    </>
  );
};

export default RestaurantDashboardOrderList;    