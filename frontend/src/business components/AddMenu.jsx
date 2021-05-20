import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import AddCategory from "./AddCategory";

const AddMenu = () => {
  const restaurant = useSelector((state) => state.restaurantUserID);
  const [menu, setMenu] = useState({
    restaurantname: "",
    category: "",
    menuitem: "",
    price: null,
    categories: [],
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/category/")
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         setMenu({
  //           categories: response.data.map((categ) => categ.category),
  //           category: response.data[0].category,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/")
      .then((response) => {
        if (response.data.length > 0) {
          setMenu({
            ...menu,
            // categories: response.data.map((categ) => categ.categories),

            categories: response.data.map((categ) =>
              categ.restaurantname == restaurant.restaurantname
                ? categ.category
                : null
            ),
            // category: response.data[0].category,
          });
        }
      })
      .catch((error) => {
        console.log("Error is" + error);
      });
  }, []);

  const setCategory = (e) => {
    // setMenu({ ...menu, category: e.target.value });
    setMenu({ ...menu, category: e.target.value });
    console.log(e.target.value);
  };
  const setMenuItem = (e) => {
    setMenu({ ...menu, menuitem: e.target.value });
  };
  const setPrice = (e) => {
    setMenu({ ...menu, price: e.target.value });
  };

  const menuSubmit = (e) => {
    e.preventDefault();
    // console.log(restaurantname.restaurantname);
    const displayMenu = {
      ...menu,
      restaurantname: restaurant.restaurantname,
      category: menu.category,
      menuitem: menu.menuitem,
      price: menu.price,
    };

    console.log(displayMenu);
    // window.location = "/";
    axios
      .post("http://localhost:5000/menu/add", displayMenu)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="add-menu-section">
        <AddCategory />

        <div className="add-menu">
          <h1>Add Menu</h1>

          <form onSubmit={menuSubmit}>
            <label htmlFor="">Categories</label>
            <select VALUE={menu.category} onChange={setCategory}>
              {/* {menu.categories.map((singlecateg) =>
                singlecateg.restaurantname == restaurant.restaurantname ? (
                  <option key={singlecateg} VALUE={singlecateg}>
                    {singlecateg}
                  </option>
                ) : null
              )} */}
              {menu.categories.map((singlecateg) =>
                singlecateg !== null ? (
                  <option key={singlecateg} VALUE={singlecateg}>
                    {singlecateg}
                  </option>
                ) : null
              )}
            </select>
            {/* <input
            id="category"
            type="text"
            VALUE={menu.category}
            onChange={setCategory}
          /> */}
            <label htmlFor="">Item</label>
            <input type="text" VALUE={menu.menuitem} onChange={setMenuItem} />
            <label htmlFor="">Price</label>
            <input type="number" VALUE={menu.price} onChange={setPrice} />
            <input type="submit" value="Add" />
          </form>
          {/* <p>{menu.category}</p>
        <p>{menu.menuitem}</p>
        <p>{menu.price}</p>
        <p>{JSON.stringify(menu)}</p> */}
        </div>
      </div>
    </>
  );
};

export default AddMenu;