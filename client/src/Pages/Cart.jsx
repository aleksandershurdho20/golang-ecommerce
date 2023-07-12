import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { removeProductFromCart, emptyCartProducts } from "../redux/slices/Cart";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { useState } from "react";

export default function Cart() {
  const { cart } = useSelector((state) => state.Cart);
  const [personalData, setPersonalData] = useState({
    phone: 0,
    address: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart?.reduce((prevVal, currentVal) => {
    return prevVal + currentVal.price;
  }, 0);

  const handlePersonalData = (e) => {
    const { name, value } = e.target;
    setPersonalData({
      ...personalData,
      [name]: value,
    });
  };
  const removeProduct = (index) => {
    dispatch(removeProductFromCart({ index }));
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Please sign in!");
      return;
    }
    const body = {
      user_id: user._id,
      products: cart,
      total,
    };

    api
      .post("order", body)
      .then((res) => {
        alert("Order created succesfully!");
        dispatch(emptyCartProducts());
        setPersonalData({
          phone: 0,
          address: "",
        });
      })
      .catch((err) => alert("err"));
  };
  return (
    <>
      <div className="card container mt-5">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cart.length} items
                </div>
              </div>
            </div>
            {cart.length > 0
              ? cart.map((product) => (
                  <div
                    className="row border-top border-bottom"
                    key={product._id}
                  >
                    <div className="row main align-items-center">
                      <div className="col-2">
                        <img
                          className="img-fluid"
                          src="https://i.imgur.com/1GrakTl.jpg"
                        />
                      </div>
                      <div className="col">
                        <div className="row text-muted">{product.title}</div>
                        <div className="row">{product.description}</div>
                      </div>
                      <div className="col">
                        <a href="#" className="border">
                          1
                        </a>
                      </div>
                      <div className="col">
                        € {product.price}{" "}
                        <button
                          className="close"
                          onClick={() => removeProduct(product._id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : "Cart is empty"}

            <div className="back-to-shop">
              <button onClick={() => navigate("/")}>←</button>
              <span className="text-muted">Back to shop</span>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />

            <div className="row">
              <div className="form-group mb-2">
                <label>Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={personalData.phone}
                  onChange={handlePersonalData}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={personalData.address}
                  onChange={handlePersonalData}
                  className="form-control"
                />
              </div>
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">€ {total}</div>
            </div>
            <button
              className="checkout-btn"
              disabled={cart.length == 0}
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
