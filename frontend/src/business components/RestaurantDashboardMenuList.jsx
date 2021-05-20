import React, { useState, useEffect } from "react";

// Importing Other Packages
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

const RestaurantDashboardMenuList = () => {
  const restaurantname = useSelector(
    (state) => state.restaurantUserID.restaurantname
  );
  const [menu, setMenu] = useState({ menus: [] });
  const [cat, setCat] = useState({ categ: [] });

  const deleteMenu = (id) => {
    axios.delete("http://localhost:5000/menu/" + id);
    // window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        setMenu({ menus: response.data });
        // console.log(menu);
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
  return (
    <>
      <div className="menu-list">
        <div className="title">
          <h1>Your Menu</h1>
          <Link to="/add-menu">
            <button className="add-menu-btn">Add new item</button>
          </Link>
        </div>
        <div className="menus">
          <table>
            <tbody>
              <tr>
                <th>Category</th>
                <th>Menu Item</th>
                <th>Price</th>
              </tr>
              {menu.menus.map((menuItem) =>
                menuItem.restaurantname == restaurantname ? (
                  <tr>
                    <td>{menuItem.category}</td>
                    <td>{menuItem.menuitem}</td>
                    <td>{menuItem.price}</td>
                    <td>
                      <Link
                        to={`/update-menu/${menuItem._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <i class="fa fa-edit" aria-hidden="true"></i>{" "}
                      </Link>
                      <i
                        class="fa fa-trash"
                        onClick={() => deleteMenu(menuItem._id)}
                      ></i>{" "}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
          <Link to="/add-menu">
            <button className="add-menu-btn">Add new item</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboardMenuList;