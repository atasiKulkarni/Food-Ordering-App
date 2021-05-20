import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Importing Images
import backArrow from "../images/Back Arrow.svg";

import { useSelector } from "react-redux";

const AddCategory = () => {
  const restaurantname = useSelector(
    (state) => state.restaurantUserID.restaurantname
  );
  const [cat, setCat] = useState({
    category: "",
  });
  const setCategory = (e) => {
    // setMenu({ ...menu, category: e.target.value });
    setCat({ category: e.target.value });
  };
  const categorySubmit = (e) => {
    e.preventDefault();
    const displayCategory = {
      restaurantname: restaurantname,
      // restaurantname: "ASD",
      category: cat.category,
    };

    console.log(displayCategory);
    // window.location = "/";
    axios
      .post("http://localhost:5000/category/add", displayCategory)
      .then((res) => console.log(res.data));
  };
  return (
    <>
      <div className="category-section">
        <Link to="/menu-list">
          <img src={backArrow} alt="" width="35px" />
        </Link>
        <h1>Add Category</h1>
        <form onSubmit={categorySubmit}>
          <label htmlFor="">Categories</label>
          <input
            id="category"
            type="text"
            VALUE={cat.category}
            onChange={setCategory}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
};

export default AddCategory;