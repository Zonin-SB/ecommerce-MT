import React, { useState } from "react";
import { addProductSchema } from "../../validation/validation";
import { addProduct } from "../../axios/services/userServices";
import { useFormik } from "formik";
import FormComponent from "../FormComponent/FormComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const initialValues = {
  name: "",
  price: "",
  stock: "",
};
function AddProduct() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = async (values, { resetForm }) => {
    try {
      let value = {};
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "care4pets");

      const up = await axios.post(
        "https://api.cloudinary.com/v1_1/dtfvivsz5/image/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const imagedata = up.data.url;
      value.name = values.name;
      value.price = values.price;
      value.stock = values.stock;
      value.imageUrl = imagedata;
      const response = await addProduct(value);
      if (response.status === "error") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setError("Action Failed,Please try again after some time.");
      } else if (response.status === "ok") {
        resetForm();
        setSelectedFile(null);
        Swal.fire({
          icon: "success",
          title: "New product has been added",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/addProduct");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: addProductSchema,
      onSubmit,
    });
  return (
    <div>
      <FormComponent>
        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <h2 className="text-center pb-2">Add Product</h2>
            </span>
          </div>
          {error ? (
            <p style={{ color: "red" }} className="text-center">
              {error}
            </p>
          ) : (
            ""
          )}
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Product name"
            />
            {errors.name && touched.name && (
              <p style={{ color: "red" }}>{errors.name}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control item"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Price"
            />
            {errors.price && touched.price && (
              <p style={{ color: "red" }}>{errors.price}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="num"
              className="form-control item"
              id="stock"
              name="stock"
              value={values.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Stock"
            />
            {errors.stock && touched.stock && (
              <p style={{ color: "red" }}>{errors.stock}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="file"
              onChange={onFileChange}
              className="form-control item"
              id="image"
              required
            />
          </div>

          <div className="form-group">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-block create-account">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </FormComponent>
    </div>
  );
}

export default AddProduct;
