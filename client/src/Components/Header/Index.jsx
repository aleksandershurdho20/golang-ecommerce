import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Header() {
  const {cart} = useSelector((state) => state.Cart)
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#!">
              E commerce
            </a>
  
            <div className="d-flex ">
             <Link to ="auth" className="mt-2 ">
             SignIn or Register

                </Link>   
         
              <button className="btn btn-outline-dark" type="submit">
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
  