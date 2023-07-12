import React, { useState, useEffect } from "react";
import ListProducts from "../Components/Products/ListProducts";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => err);
  }, []);

  const handleNavigate = () => {
    navigate("/products/create");
  };

  const handleViewProduct = (id) => [navigate(`/products/${id}`)];
  const handleDeleteProduct = (id) => {
    api
      .delete(`/product/${id}`)
      .then((res) => {
        const tempArr = [...products].filter((product) => product._id !== id);
        setProducts(tempArr);
      })
      .catch((err) => err);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-5 mt-5">
        <h2>Products</h2>
        <button className="btn btn-dark" onClick={handleNavigate}>
          Create Product
        </button>
      </div>
      <ListProducts
        data={products}
        handleDeleteProduct={handleDeleteProduct}
        handleViewProduct={handleViewProduct}
      />
    </div>
  );
}
