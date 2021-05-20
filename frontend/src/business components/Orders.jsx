import React, { useState, useEffect } from "react";

// Importing other packages
import axios from "axios";

import { useSelector } from "react-redux";

const Orders = ({ showBtn }) => {
  const [order, setOrder] = useState({ orders: [] });
  const restaurantname = useSelector(
    (state) => state.restaurantUserID.restaurantname
  );
  useEffect(() => {
    axios
      .get("http://localhost:5000/order")
      .then((response) => {
        setOrder({ orders: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const completeOrder = (id) => {
    axios.delete("http://localhost:5000/order/" + id);
    location.reload();
    // location = "/restaurant-dashboard";
  };
  const approveOrder = (id) => {
    axios
      .post("http://localhost:5000/order/update/" + id, { status: "Approved" })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // location = "/restaurant-dashboard";
    location.reload();
  };

  const rejectOrder = (id) => {
    axios
      .post("http://localhost:5000/order/update/" + id, { status: "Rejected" })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // location = "/restaurant-dashboard";
    location.reload();
  };

  return (
    <>
      <div className="orders-section">
        {order.orders.length == 0 ? (
          <h1>No orders</h1>
        ) : (
          <>
            {order.orders.map((ord) =>
              ord.restaurantname == restaurantname ? (
                <div className="order-card">
                  <div className="order-card-top">
                    <div className="order-card-id">
                      <h2>Order ID</h2>
                      <p>{ord._id}</p>
                    </div>
                    <div className="order-card-customer">
                      <h2>Placed by</h2>
                      <p>{ord.name}</p>
                    </div>
                  </div>
                  <div className="order-card-bottom">
                    {/* <p>{ord.tablereservation}</p> */}
                    <p>{ord.status}</p>
                    <h1>Items</h1>
                    {ord.order.products.map((ite) => (
                      <div className="order-card-bottom-column">
                        <div className="order-card-bottom-row">
                          <h2>Name</h2>
                          <p>{ite.item}</p>
                        </div>
                        <div className="order-card-bottom-row">
                          <h2>Quantity</h2>
                          <p>{ite.quantity}</p>
                        </div>
                      </div>
                    ))}
                    <h2>Total</h2>
                    <p className="total">{ord.order.total}</p>
                    {ord.status === "Approved" ? (
                      <div className="complete-action">
                        <button
                          className="complete-btn"
                          style={showBtn}
                          onClick={() => completeOrder(ord._id)}
                        >
                          Complete
                        </button>
                      </div>
                    ) : (
                      <div className="action-btns">
                        <button
                          className="approve-btn"
                          style={showBtn}
                          onClick={() => approveOrder(ord._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          style={showBtn}
                          onClick={() => rejectOrder(ord._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Orders;