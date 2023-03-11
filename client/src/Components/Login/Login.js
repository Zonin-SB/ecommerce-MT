import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import jwt from 'jwt-decode';
import {loginSchema} from '../../validation/validation'
import {userLogin} from '../../axios/services/userServices'
import FormComponent from "../FormComponent/FormComponent";
import { useDispatch } from 'react-redux';
import {userLoginDetails} from '../../redux/userReducer'


const initialValues = {
  email: '',
  password: '',
};
function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, action) => {
    const response = await userLogin(values);

    if (response.user) {
      localStorage.setItem('userToken', response.user);
      dispatch(userLoginDetails(response.user));
      navigate('/');
    } else {
      setError('Incorrect email or password');
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <div>
      <FormComponent>
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <h2 className="text-center pb-2">Login</h2>
            </span>
          </div>
          {error ? (
                      <p style={{ color: 'red' }} className="text-center">
                        {error}
                      </p>
                    ) : (
                      ''
                    )}
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
                      <p style={{ color: 'red' }}>{errors.email}</p>
                    )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control item"
              id="password"
              placeholder="Password"
            />
              {errors.password && touched.password && (
                      <p style={{ color: 'red' }}>{errors.password}</p>
                    )}
          </div>

          <div className="form-group">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-block create-account">
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
