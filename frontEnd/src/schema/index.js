import * as Yup from "yup";

const trimmedString = Yup.string().trim();


export const userSchema = Yup.object().shape({
  name: trimmedString.
    required("Name is required"),
  email: trimmedString
    .email("Invalid email address")
    .required("Email is required"),
  password: trimmedString
    .required('password is required')
    .min(8, "password must be at leaset 8 characters")
    .matches(/[0-9]/, "atleast one number required")
    .matches(/[A-Z]/, "atleast one uppercase letter required")
    .matches(/[a-z]/, "atleast one lowercase letter required")
});

export const loginSchema = Yup.object().shape({
  email: trimmedString
    .email("Invalid email address")
    .required("Email is required"),
  password: trimmedString
    .required('password is required')
    .min(8, "password must be at leaset 8 characters")
    .matches(/[0-9]/, "atleast one number required")
    .matches(/[A-Z]/, "atleast one uppercase letter required")
    .matches(/[a-z]/, "atleast one lowercase letter required")
});

export const passwordSchema = Yup.object({
  newPassword: Yup.string()
    .required("password is required")
    .min(8, "password must be at leaset 8 characters")
    .matches(/[0-9]/, "atleast one number required")
    .matches(/[A-Z]/, "atleast one uppercase letter required")
    .matches(/[a-z]/, "atleast one lowercase letter required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Password must match."),
});