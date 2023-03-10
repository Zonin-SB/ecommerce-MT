import React from "react";
import FormComponent from "../FormComponent/FormComponent";

function AddProduct() {
  return (
    <div>
      <FormComponent>
        <form>
          <div>
            <span>
              <h2 className="text-center pb-2">Add Product</h2>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="username"
              placeholder="Product name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
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
