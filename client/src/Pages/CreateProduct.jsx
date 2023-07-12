import { useState } from "react";
import ProductsForm from "../Components/Products/ProductsForm";
import { api } from "../../utils/api";

export default function CreateProduct() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setProductData({
      ...productData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  const handleSubmit = () => {
    api.post("/product/create", productData).then((res) => {
      alert("Product created succesfully!");
      setProductData({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
      });
    });
  };
  return (
    <div className="container mt-5">
      <ProductsForm
        data={productData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
