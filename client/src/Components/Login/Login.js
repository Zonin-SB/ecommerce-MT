import React from "react";
import { Link } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";

function Login() {
  return (
    <div>
      <FormComponent>
        <form>
          <div>
            <span>
              <h2 className="text-center pb-2">Login</h2>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="button" className="btn btn-block create-account">
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account ?{" "}
              <Link to={"/signup"} className="link text-decoration-none">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </FormComponent>
    </div>
  );
}

export default Login;
