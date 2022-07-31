import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const formSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email("Please enter a valid email").required("Required"),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please enter stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Must me at least 3 characters")
    .required("Username is required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please enter stronger password" })
    .required("Required"),
  repass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});
