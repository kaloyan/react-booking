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
      case "put":
        response = await axios.put(url, options.data, {
          withCredentials: true,
        });
        break;
      case "delete":
        response = await axios.delete(url, { withCredentials: true });
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

export const countByCity = (cityArray) => {
  const url =
    urls.BASE_URL + "/api/v1/hotels/countByCity?cities=" + cityArray.join(",");
  return netReq(url);
};

export const featuredHotels = () => {
  const url = urls.BASE_URL + "/api/v1/hotels?featured=true&limit=3";
  return netReq(url);
};

export const getPropertyList = () => {
  const url = urls.BASE_URL + "/api/v1/hotels/countByType";
  return netReq(url);
};

export const createDestination = (data) => {
  return netReq(urls.destURL, { method: "post", data });
};

export const getAllDestinations = (data) => {
  return netReq(urls.destURL);
};

export const getDestination = (id) => {
  const url = urls.destURL + id;
  return netReq(url);
};

export const editDestination = (id, data) => {
  const url = urls.destURL + "edit/" + id;
  // console.log("edit", url);
  return netReq(url, { method: "put", data });
};

export const deleteDestination = (id) => {
  const url = urls.destURL + "del/" + id;
  return netReq(url, { method: "delete" });
};
