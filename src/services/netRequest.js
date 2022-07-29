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
  return request(urls.loginUrl, { method: "post", data });
};

export const getAccount = () => {
  return request(urls.accountUrl);
};

export const doLogout = () => {
  return request(urls.logoutUrl);
};

export const register = (data) => {
  return request(urls.registerUrl, { method: "post", data });
};

export const updateAccount = (id, data) => {
  const url = urls.usersUrl + id;
  return request(url, { method: "put", data });
};

export const getUserCounts = (userId) => {
  const url = urls.usersUrl + userId + "/counts";
  return request(url);
};

export const readMessage = (messageId) => {
  //todo
};

export const deleteMessage = (messageId) => {
  //todo
};

// Destinations

export const createDestination = (data) => {
  return request(urls.destinationsUrl, { method: "post", data });
};

export const getAllDestinations = (data) => {
  return request(urls.destinationsUrl);
};

export const getDestination = (id) => {
  const url = urls.destinationsUrl + id;
  return request(url);
};

export const editDestination = (id, data) => {
  const url = urls.destinationsUrl + "edit/" + id;
  return request(url, { method: "put", data });
};

export const deleteDestination = (id) => {
  const url = urls.destinationsUrl + "del/" + id;
  return request(url, { method: "delete" });
};

// Hotels

export const createHotel = (data) => {
  const url = urls.hotelsUrl;
  return request(url, { method: "post", data });
};

export const getOwnHotels = () => {
  const url = urls.hotelsUrl + "own";
  return request(url);
};

export const delHotel = (hotelId) => {
  const url = urls.hotelsUrl + hotelId;
  return request(url, { method: "delete" });
};

export const getOneHotel = (hitelId) => {
  const url = urls.hotelsUrl + hitelId;
  return request(url);
};

export const updateHotel = (hotelId, data) => {
  const url = urls.hotelsUrl + hotelId;
  return request(url, { method: "put", data });
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

// Rooms

export const getHotelRooms = (hotelId) => {
  const url = urls.roomsUrl + hotelId;
  return request(url);
};

export const getOneRoom = (roomId) => {
  const url = urls.roomsUrl + roomId;
  return request(url);
};

export const createRoom = (hotelId, roomData) => {
  const url = urls.roomsUrl + hotelId;
  return request(url, { method: "post", data: roomData });
};

export const deleteRoom = (roomId) => {
  const url = urls.roomsUrl + roomId;
  return request(url, { method: "delete" });
};

export const updateRoom = (roomId, roomData) => {
  const url = urls.roomsUrl + roomId;
  return request(url, { method: "put", data: roomData });
};

// Reservations

export const createReservation = (data) => {
  const url = urls.reserveUrl;
  return request(url, { method: "post", data });
};

export const getReservationsByHotelId = (hotelId) => {
  const url = urls.reserveUrl + "hotel/" + hotelId;
  return request(url);
};

export const getReservationsByUserId = (userId) => {
  const url = urls.reserveUrl + "user/" + userId;
  return request(url);
};

export const getReservationsByOwnerId = (ownerId) => {
  const url = urls.reserveUrl + "owner/" + ownerId;
  return request(url);
};

export const deleteReservation = (reservationId) => {
  const url = urls.reserveUrl + reservationId;
  return request(url), { method: "delete" };
};
