import React, { useState } from "react";

// Importing components
import CartItems from "./CartItems";
import LoggedInNav from "./LoggedInNav";
import Cart from "./Cart";

// Importing Images
import backArrow from "../images/Back Arrow.svg";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

const Checkout = ({ cartItems }) => {
  const restaurantname = useSelector(
    (state) => state.restaurantInfo.restaurantname
  );
  const showCart = () => {
    var element = document.getElementById("cart");
    element.classList.remove("cart-hide");
    element.classList.add("cart");
  };
  // var slider = document.getElementById("myRange");
  // var output = document.getElementById("demo");
  // // output.innerHTML = slider.value;

  // // Update the current slider value (each time you drag the slider handle)
  // slider.oninput = function () {
  //   output.innerHTML = this.value;
  // };
  const [order, setOrder] = useState();

  const cart = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.userID);

  const setDine = (e) => {
    console.log(e.target.value);
    if (e.target.value === "dine-in") {
      setOrder({ ...order, dinein: true });
    } else {
      setOrder({ ...order, dinein: false });
    }
  };
  const setPeople = (e) => {
    setOrder({ ...order, people: e.target.value });
  };
  const setTableReservation = (e) => {
    if (e.target.value === "reservation-yes") {
      setOrder({ ...order, tablereservation: true });
    } else {
      setOrder({ ...order, tablereservation: false });
    }
  };
  const orderSubmit = (e) => {
    e.preventDefault();
    const settingOrder = cart.map((ite) => ({
      item: ite.item,
      price: ite.price,
      quantity: ite.quantity,
    }));
    const displayOrder = {
      restaurantname: restaurantname,
      name: user.name,
      dinein: order.dinein,
      tablereservation: order.tablereservation,
      people: order.people,
      status: "Pending",
      order: {
        products: settingOrder,
        total: total,
      },
    };

    console.log(settingOrder);

    console.log(displayOrder);
    axios.post("http://localhost:5000/order/add", displayOrder).then((res) => {
      console.log("ORDER SENT");
    });
  };
  return (
    <>
      <LoggedInNav showCart={showCart} linkTo="/checkout/cart" />
      <Link to="/menu">
        <img className="checkout-back" src={backArrow} alt="" width="35px" />
      </Link>
      <div className="checkout-section">
        <div className="checkout-section-top">
          <div className="checkout-section-left">
            <h1>Checkout</h1>
            <form onSubmit={orderSubmit}>
              <p>Select a payment method</p>
              <div className="radio-item">
                <input
                  type="radio"
                  id="credit-debit-card"
                  name="payment"
                  value="card"
                />
                <label htmlFor="credit-debit-card">Credit/Debit Card</label>
              </div>
              <br />
              <div className="radio-item">
                <input type="radio" id="cash" name="payment" value="cash" />
                <label htmlFor="cash">Cash</label>
              </div>
              <p>Select order options</p>
              <div className="radio-item">
                <input
                  type="radio"
                  id="dine-in"
                  name="order-option"
                  value="dine-in"
                  onChange={setDine}
                />
                <label htmlFor="dine-in">Dine-in</label>
              </div>
              <br />
              <div className="radio-item">
                <input
                  type="radio"
                  id="takeaway"
                  name="order-option"
                  value="takeaway"
                  onChange={setDine}
                />
                <label htmlFor="takeaway">Takeaway</label>
              </div>
              <p>
                Since you opted for dine-in, <br /> would you like to reserve a
                table?
              </p>
              <div className="radio-item">
                <input
                  type="radio"
                  id="reservation-yes"
                  name="reservation"
                  value="reservation-yes"
                  onChange={setTableReservation}
                />
                <label htmlFor="reservation-yes">Yes</label>
                <div className="no-of-people">
                  <p>No. of people</p>
                  <input
                    type="number"
                    name=""
                    id=""
                    size="1"
                    onChange={setPeople}
                  />
                  {/* <div className="slidecontainer">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value="50"
                    className="slider"
                    id="myRange"
                  />
                  <div className="slider-display">
                    <p>
                      People: <span id="demo"></span>
                    </p>
                  </div>
                </div> */}
                </div>
              </div>
              <br />
              <div className="radio-item">
                <input
                  type="radio"
                  id="reservation-no"
                  name="reservation"
                  value="reservation-no"
                  onChange={setTableReservation}
                />
                <label htmlFor="reservation-no">No</label>
              </div>
              <div className="checkout-button">
                <button type="submit" className="button-style card-button">
                  Checkout
                </button>
              </div>
            </form>
          </div>
          <div className="checkout-section-right">
            <h1>Order Summary</h1>
            <CartItems cartItems={cartItems} />
          </div>
        </div>
      </div>
      <Cart linkTo="/checkout" cartItems={cartItems} />
    </>
  );
};

export default Checkout;