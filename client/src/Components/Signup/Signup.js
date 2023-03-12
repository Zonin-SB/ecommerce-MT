import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../../validation/validation";
import { userSignup } from "../../axios/services/userServices";
import FormComponent from "../FormComponent/FormComponent";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (values, action) => {
    const response = await userSignup(values);
    if (response.status === "error") {
      setError("This email already exists,try another one.");
    } else if (response.status === "success") {
      navigate("/login");
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit,
    });
  return (
    <div>
      <FormComponent>
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <h2 className="text-center pb-2">Create Account</h2>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
            />
            {errors.name && touched.name && (
              <p style={{ color: "red" }}>{errors.name}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control item"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <p style={{ color: "red" }}>{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </div>
          {error ? (
            <p style={{ color: "red" }} className="text-center">
              {error}
            </p>
          ) : (
            ""
          )}
          <div className="form-group">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-block create-account">
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
