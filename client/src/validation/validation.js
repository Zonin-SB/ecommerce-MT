import * as Yup from "yup";

//password validation
const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be atleast 2 characters")
    .max(15)
    .required("This field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("This field is required"),
  password: Yup.string()
    .min(5)
    .max(16)
    .matches(
      passwordRule,
      "Please enter a stronger password(Try adding symbols *#$)"
    )
    .required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must be same")
    .required("This field is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

export const addProductSchema = Yup.object({
  name: Yup.string()
    .min(2, "Enter a valid name.")
    .max(40)
    .required("This field is required"),
  price: Yup.number().positive().integer().required("This field is required"),
  stock: Yup.number().positive().integer().required("This field is required"),
});
