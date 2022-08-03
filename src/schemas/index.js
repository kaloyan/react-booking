import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

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
    // .matches(passwordRules, { message: "Please enter stronger password" })
    .required("Required"),
  repass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

// Dashboard schemas
export const hotelSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "hotel name is too short")
    .required("hotel name is required"),
  country: yup
    .string()
    .min(3, "provide a valid country")
    .required("country is required"),
  city: yup
    .string()
    .min(2, "provide a valid city")
    .required("city is required"),
  address: yup
    .string()
    .min(8, "type a valid address")
    .required("address is required"),
  cheepestPrice: yup
    .number("pleace type a number")
    .min(1, "price must be at least 1 dollar")
    .max(10000, "price is to higth")
    .required("cheapest price is required"),
  description: yup
    .string()
    .min(70, "description must be at least 70 characters long")
    .required("description is required"),
  pictures: yup
    .mixed()
    .required("please select images")
    .test("fileSize", "please select picture files", (values) => {
      return (
        values && values.every((item) => item.size > 100 && item.size < 1000000)
      );
    }),
});

export const newRoomSchema = yup.object().shape({
  title: yup
    .string()
    .min(4, "title must be at least 4 characters long")
    .required("title is required"),
  description: yup.string().min(7).required("description is required"),
  price: yup.number().min(1).required("price is required"),
  maxpeople: yup.number().min(1).max(20).required("max people is required"),
  hotel: yup.string().min(10).required("hotel is required"),
  rooms: yup
    .string()
    .required("rooms is required")
    .test("string", "not valid", (str) => {
      if (!str) return false;

      const res = str
        .split(",")
        .map((x) => Number(x.trim()))
        .filter((x) => typeof x == "number" && x > 0 && x < 1000);

      if (res.length < 1) return false;
      return true;
    }),
});

export const profileSchema = yup.object().shape({
  username: yup.string().min(3).required("username is required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
  address: yup.string().test("address", () => true),
});

// ****** //
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
