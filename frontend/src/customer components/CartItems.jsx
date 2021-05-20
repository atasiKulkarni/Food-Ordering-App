import React from "react";

// React Redux
import { useSelector, useDispatch } from "react-redux";
import { itemAdded, itemRemoved } from "../redux/actions";

const CartItems = () => {
  const cart = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-items">
        {cart.length == 0 ? (
          <h3 style={{ marginTop: "20px" }}>Cart is empty</h3>
        ) : (
          <>
            {cart.map((ite) => (
              <div className="cart-card">
                <div className="cart-card-details">
                  <h2>{ite.item}</h2>
                  <p>{ite.total}</p>
                </div>
                <div className="counter">
                  <i
                    className="fa fa-trash"
                    onClick={() => dispatch(itemRemoved(ite.item))}
                  ></i>
                  <p>{ite.quantity}</p>
                  <i
                    className="fa fa-plus-square"
                    onClick={() => dispatch(itemAdded(ite.item, ite.price))}
                  ></i>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="cart-total">
        <div className="cart-total-card">
          <h2>Subtotal</h2>
          <p>PKR {total}</p>
        </div>
      </div>
    </>
  );
};

export default CartItems;