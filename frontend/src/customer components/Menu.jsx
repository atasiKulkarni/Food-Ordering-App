import React, { useState, useEffect } from "react";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

// Importing Components
// import Nav from "../components/Nav";
import LoggedInNav from "./LoggedInNav";
import Cart from "./Cart";

// Importing Images
import backArrow from "../images/Back Arrow.svg";
import beeImage from "../images/bee.svg";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { itemAdded } from "../redux/actions";

const showCart = () => {
  var element = document.getElementById("cart");
  element.classList.remove("cart-hide");
  element.classList.add("cart");
};

const Menu = ({ key }) => {
  const [menu, setMenu] = useState({ menus: [] });
  const [cat, setCat] = useState({ categ: [] });
  const [cartItems, setCartItems] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        setMenu({ menus: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setCat({ categ: response.data });
        // console.log(cat);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dispatch = useDispatch();

  const restaurantname = useSelector(
    (state) => state.restaurantInfo.restaurantname
  );

  const showSnackBar = () => {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2000);
  };

  return (
    <>
      <LoggedInNav showCart={showCart} linkTo="/menu/cart" />

      <div className="menu-section">
        <div className="menu-title">
          <Link to="/food-order">
            <img src={backArrow} alt="" width="35px" />
          </Link>
          <h1>{restaurantname}</h1>
          <p>Select items from the menu</p>
        </div>
        <div className="menu">
          {cat.categ.map((categories) =>
            categories.restaurantname == restaurantname ? (
              <div className="menu-category">
                <h1>{categories.category}</h1>
                <div className="menu-items">
                  {menu.menus.map((menuItem) =>
                    categories.category == menuItem.category &&
                    menuItem.restaurantname == restaurantname ? (
                      <div className="menu-item">
                        <div className="menu-item-desc">
                          <h2>{menuItem.menuitem}</h2>
                          <p>PKR {menuItem.price}</p>
                        </div>
                        <div onClick={showSnackBar}>
                          <i
                            className="fa fa-plus-square"
                            onClick={() =>
                              dispatch(
                                itemAdded(menuItem.menuitem, menuItem.price)
                              )
                            }
                          ></i>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>

        <div id="snackbar">
          <img src={beeImage} alt="" width="30px" />
          Item added to cart
        </div>
      </div>
      <Cart linkTo="/menu" />
    </>
  );
};

export default Menu;