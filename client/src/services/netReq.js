// Network Requests Service

import axios from "axios";
import * as urls from "../config/constants";

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

    return response?.data || response?.response?.data;
  } catch (err) {
    return err;
  }
};

export const login = (data) => {
  return netReq(urls.loginURL, { method: "post", data });
};

export const getAccount = () => {
  return netReq(urls.accountURL);
};

export const doLogout = () => {
  return netReq(urls.logoutURL);
};

export const register = (data) => {
  return netReq(urls.registerURL, { method: "post", data });
};

export const getItem = (itemId) => {
  const url = urls.itemURL + itemId;
  return netReq(url);
};
