import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../redux/slices/Cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    api
      .get("products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (data) =>{
    dispatch(addProductToCart(data))
  }
  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.length > 0
              ? products.map((product) => (
                  <div className="col mb-5" key={product._id}>
                    <div className="card h-100">
                      <img
                        className="card-img-top"
                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                        alt="product"
                      />
                      <div className="card-body p-4">
                        <div className="text-center">
                          <h5 className="fw-bolder">{product.title}t</h5>
                          {product.price}
                        </div>
                      </div>
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <button className="btn btn-outline-dark mt-auto" onClick={() => handleAddToCart(product)} >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "No products"}
          </div>
        </div>
      </section>
    </>
  );
}
