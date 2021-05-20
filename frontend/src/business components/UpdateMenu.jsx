import React, { useState, useEffect } from "react";

// Importing Other Packages
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Importing Images
import backArrow from "../images/Back Arrow.svg";

const UpdateMenu = () => {
  const [menu, setMenu] = useState({
    menuitem: "",
    price: null,
  });
  const { id } = useParams();
  const setMenuItem = (e) => {
    setMenu({ ...menu, menuitem: e.target.value });
  };
  const setPrice = (e) => {
    setMenu({ ...menu, price: e.target.value });
  };

  const updateMenu = (e) => {
    e.preventDefault();
    const displayMenu = {
      ...menu,
      menuitem: menu.menuitem,
      price: menu.price,
    };
    // window.location = "/";
    axios
      .post("http://localhost:5000/menu/update/" + id, displayMenu)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="update-menu">
        <Link to="/menu-list">
          <img src={backArrow} alt="" width="35px" />
        </Link>
        <h1>Update Menu</h1>
        <form action="" onSubmit={updateMenu}>
          <label htmlFor="">Item</label>
          <input type="text" onChange={setMenuItem} />
          <label htmlFor="">Price</label>
          <input type="number" onChange={setPrice} />
          <input type="submit" value="Update" />
        </form>
      </div>
    </>
  );
};

export default UpdateMenu;