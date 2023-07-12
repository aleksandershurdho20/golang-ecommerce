import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [authState, setAuthState] = useState("login");
  const [authFieldsData, setAuthFieldsData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [checkForEmptyInputs, setCheckForEmptyinputs] = useState();
  const navigate = useNavigate();
  const isLoginSelected = authState === "login";
  useEffect(() => {
    const areFieldsEmpty = isLoginSelected
      ? [authFieldsData.email, authFieldsData.password].some(
          (input) => input.length === 0,
        )
      : Object.values(authFieldsData).some((input) => input.length == 0);
    setCheckForEmptyinputs(areFieldsEmpty);
  }, [isLoginSelected, authFieldsData]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAuthFieldsData({
      ...authFieldsData,
      [name]: value,
    });
  };

  const resetState = () => {
    setAuthFieldsData({ username: "", email: "", password: "" });
  };
  const handleAuthSelection = () => {
    if (isLoginSelected) {
      setAuthState("register");
    } else {
      setAuthState("login");
    }
    resetState();
  };
  const handleSubmit = () => {
    const { username, ...rest } = authFieldsData;
    const body = isLoginSelected ? rest : { ...authFieldsData, role: "user" };

    api.post(authState, body).then((res) => {
      console.log(res);
      if (!isLoginSelected) {
        alert("Registered Succesfully!");
        resetState();
        setAuthState("login");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    });
  };
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card px-5 py-5" id="form1">
            <div className="form-data">
              <div className="form-group mb-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={authFieldsData.email}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              {!isLoginSelected && (
                <div className="form-group mb-2">
                  <label htmlFor="exampleInputPassword1">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={authFieldsData.username}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="form-group mb-5">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={authFieldsData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                {" "}
                <button
                  className="btn btn-dark w-100"
                  onClick={handleSubmit}
                  disabled={checkForEmptyInputs}
                >
                  {isLoginSelected ? "Login" : "Register"}
                </button>{" "}
              </div>
              <div className="mt-5">
                <span>
                  {isLoginSelected
                    ? "Dont have a account?"
                    : "Already have account?"}
                </span>
                <button className="btn btn-light" onClick={handleAuthSelection}>
                  {isLoginSelected ? "Register" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
