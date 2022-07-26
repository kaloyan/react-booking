// Network Requests Service

import axios from "axios";
import * as urls from "../config/apiUrls";

const request = async (url, options = { method: "get", data: null }) => {
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

// Account data

export const login = (data) => {
  return request(urls.loginURL, { method: "post", data });
};

export const getAccount = () => {
  return request(urls.accountURL);
};

export const doLogout = () => {
  return request(urls.logoutURL);
};

export const register = (data) => {
  return request(urls.registerURL, { method: "post", data });
};

export const updateAccount = (id, data) => {
  const url = urls.usersURL + id;
  return request(url, { method: "put", data });
};

export const getUserCounts = (userId) => {
  const url = urls.usersURL + userId + "/counts";
  return request(url);
};

//

export const getItem = (itemId) => {
  const url = urls.itemURL + itemId;
  return request(url);
};

export const countByCity = (cityArray) => {
  const url =
    urls.BASE_URL + "/api/v1/hotels/countByCity?cities=" + cityArray.join(",");
  return request(url);
};

export const featuredHotels = () => {
  const url = urls.BASE_URL + "/api/v1/hotels?featured=true&limit=3";
  return request(url);
};

export const getPropertyList = () => {
  const url = urls.BASE_URL + "/api/v1/hotels/countByType";
  return request(url);
};

// Destinations

export const createDestination = (data) => {
  return request(urls.destURL, { method: "post", data });
};

export const getAllDestinations = (data) => {
  return request(urls.destURL);
};

export const getDestination = (id) => {
  const url = urls.destURL + id;
  return request(url);
};

export const editDestination = (id, data) => {
  const url = urls.destURL + "edit/" + id;
  // console.log("edit", url);
  return request(url, { method: "put", data });
};

export const deleteDestination = (id) => {
  const url = urls.destURL + "del/" + id;
  return request(url, { method: "delete" });
};

// Hotels

export const createHotel = (data) => {
  const url = urls.itemURL;
  return request(url, { method: "post", data });
};

export const getOwnHotels = () => {
  const url = urls.itemURL + "own";
  return request(url);
};

export const delHotel = (hotelId) => {
  const url = urls.itemURL + hotelId;
  return request(url, { method: "delete" });
};

export const getOneHotel = (hitelId) => {
  const url = urls.itemURL + hitelId;
  return request(url);
};

export const updateHotel = (hotelId, data) => {
  const url = urls.itemURL + hotelId;
  return request(url, { method: "put", data });
};

// Rooms

export const getHotelRooms = (hotelId) => {
  const url = urls.roomsURL + hotelId;
  return request(url);
};

export const getOneRoom = (roomId) => {
  const url = urls.roomsURL + roomId;
  return request(url);
};

export const createRoom = (hotelId, roomData) => {
  const url = urls.roomsURL + hotelId;
  return request(url, { method: "post", data: roomData });
};

export const deleteRoom = (roomId) => {
  const url = urls.roomsURL + roomId;
  return request(url, { method: "delete" });
};

export const updateRoom = (roomId, roomData) => {
  const url = urls.roomsURL + roomId;
  return request(url, { method: "put", data: roomData });
};
