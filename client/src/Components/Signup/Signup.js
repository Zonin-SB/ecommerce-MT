import React from "react";
import { Link } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";

function Signup() {
  return (
    <div>
      <FormComponent>
        <form>
          <div>
            <span>
              <h2 className="text-center pb-2">Create Account</h2>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="username"
              placeholder="Username"
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
            <input
              type="text"
              className="form-control item"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="phone-number"
              placeholder="Phone Number"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="birth-date"
              placeholder="Birth Date"
            />
          </div>
          <div className="form-group">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="button" className="btn btn-block create-account">
                Signup
              </button>
            </div>
            <p className="text-center">
              Already have an account ?{" "}
              <Link to={"/login"} className="link text-decoration-none">
                <span>Login</span>
              </Link>
            </p>
          </div>
        </form>
      </FormComponent>
    </div>
  );
}

export default Signup;
