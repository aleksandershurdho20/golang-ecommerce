import {
  Routes as RoutesComponents,
  Route,
} from "react-router-dom";
import Home from "../Pages/Home";
import Auth from "../Pages/Auth";
import Header from "../Components/Header";

export default function Routes() {

  return (
    <>

        <Header/>
      <RoutesComponents>
        <Route path="" element={<Home />} />
        <Route path="auth" element={<Auth />} />

      </RoutesComponents>
    </>
  );
}