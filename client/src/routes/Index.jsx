import {
  Routes as RoutesComponents,
  Route,
} from "react-router-dom";
import Home from "../Pages/Home";
import Auth from "../Pages/Auth";
import Header from "../Components/Header";
import Cart from "../Pages/Cart";
import Dashboard from "../Pages/Dashboard";
import Products from "../Pages/Products";
import CreateProduct from "../Pages/CreateProduct";
import ViewProduct from "../Pages/ViewProduct";

export default function Routes() {

  return (
    <>

        <Header/>
        <RoutesComponents>
            <Route path="" element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="cart" element={<Cart />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:id" element={<ViewProduct />} />

        </RoutesComponents>
    </>
  );
}