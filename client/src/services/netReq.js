// Network Requests Service

import axios from "axios";
import { loginURL, accountURL, logoutURL } from "../config/constants";

const netReq = async (url, options = { method: "get", data: null }) => {
  let response = null;

  try {
    switch (options.method) {
      case "get":
        response = await axios.get(url, { withCredentials: true });
        break;
      case "post":
        response = await axios.post(url, options.data, {
          withCredentials: true,
        });
        break;
    }
    // console.log(response);

    return response?.data || response?.response?.data;
  } catch (err) {
    return err;
  }
};

export const login = (data) => {
  return netReq(loginURL, { method: "post", data });
};

export const getAccount = () => {
  return netReq(accountURL);
};

export const doLogout = () => {
  return netReq(logoutURL);
};
