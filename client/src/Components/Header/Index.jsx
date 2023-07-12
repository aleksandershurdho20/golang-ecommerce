import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { cart } = useSelector((state) => state.Cart);
  const navigate = useNavigate("cart");
  const handleCartNavigation = () => navigate("cart");
  const user = JSON.parse(localStorage.getItem("user"));


  const handleLogout = () =>{
    localStorage.removeItem("user")
    navigate("/")
    window.location.reload()
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" onClick={() => navigate("")}>
            E commerce
          </a>

          <div className="d-flex ">
            {user ? (
              <>
                <Link to="dashboard" className="mt-2 ">
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link to="products" className="mt-2 ">
                    Products
                  </Link>
                )}
                <button className="btn btn-light" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="auth" className="mt-2 ">
                SignIn or Register
              </Link>
            )}

            <button
              className="btn btn-outline-dark"
              type="submit"
              onClick={handleCartNavigation}
            >
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
