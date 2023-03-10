import React from "react";
import "./FormComponent.css";

function FormComponent({ children }) {
  return (
    <body className="formComponent">
      <div className="registration-form">{children}</div>
    </body>
  );
}

export default FormComponent;
