import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import ProductsForm from "../Components/Products/ProductsForm";

export default function ViewProduct() {
  const [productData, setProductData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/product/${id}`)
      .then((res) => setProductData(res.data.product))
      .catch((err) => err);
  }, []);
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setProductData({
      ...productData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleUpdate = () => {
    api
      .put(`update/product/${id}`, productData)
      .then((res) => alert("Product Updated Succesfully!"))
      .catch((err) => err);
  };
  const { image, ...rest } = productData;
  return (
    <div className="container">
      <ProductsForm
        data={rest}
        isInEditMode
        onChange={handleChange}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
