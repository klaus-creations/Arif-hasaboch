import * as yup from "yup";

export const signUpValidation = yup.object({
  name: yup
    .string()
    .required("Name is required field")
    .min(4, "The name must be atleast 4 charcters")
    .max(20, "name must be at most 20 characters"),
  email: yup
    .string()
    .email("please enter the valid email address")
    .required("email field is required"),

  password: yup
    .string()
    .required("password is required field")
    .min(6, "the password must be atleast 6 characters")
    .max(24, "the password must be atmost 24 characters"),

  confirmPassword: yup
    .string()
    .required("enter the confirm password")
    .oneOf([yup.ref("password")], "passwords must match"),
});

export const signinValidation = yup.object({
  email: yup
    .string()
    .email("please enter the valid email address")
    .required("email field is required"),

  password: yup
    .string()
    .required("password is required field")
    .min(6, "the password must be atleast 6 characters")
    .max(24, "the password must be atmost 24 characters"),
});
