// Network Requests Service

import axios from "axios";
import * as urls from "../config/apiUrls";
import * as firebase from "./firebaseSrv";

const request = async (url, options = { method: "GET", data: null }) => {
  let response = null;

  try {
    switch (options.method) {
      case "GET":
        response = await axios.get(url, { withCredentials: true });
        break;
      case "POST":
        response = await axios.post(url, options.data, {
          withCredentials: true,
        });
        break;
      case "PUT":
        response = await axios.put(url, options.data, {
          withCredentials: true,
        });
        break;
      case "DELETE":
        response = await axios.delete(url, { withCredentials: true });
        break;
    }

    return response?.data || response?.response?.data;
  } catch (err) {
    return err;
  }
};

// User
export const user = {
  login: (data) => {
    return request(urls.loginUrl, { method: "POST", data });
  },

  logout: () => {
    return request(urls.logoutUrl);
  },

  register: (data) => {
    return request(urls.registerUrl, { method: "POST", data });
  },

  get: () => {
    return request(urls.accountUrl);
  },

  getById: (userId) => {
    return request(urls.usersUrl + userId);
  },

  update: (id, data) => {
    const url = urls.usersUrl + id;
    return request(url, { method: "PUT", data });
  },

  counts: (userId) => {
    const url = urls.usersUrl + userId + "/counts";
    return request(url);
  },

  all: () => {
    return request(urls.usersUrl);
  },

  remove: (userId) => {
    return request(urls.usersUrl + userId, { method: "DELETE" });
  },

  readMsg: (messageId) => {
    //todo
  },

  deleteMsg: (messageId) => {
    const url = urls.usersUrl + "msg/" + messageId;
    return request(url, { method: "DELETE" });
  },
};

// Destinations
export const destinations = {
  create: (data) => {
    return request(urls.destinationsUrl, { method: "POST", data });
  },

  all: () => {
    return request(urls.destinationsUrl);
  },

  get: (id) => {
    const url = urls.destinationsUrl + id;
    return request(url);
  },

  featured: () => {
    const url = urls.destinationsUrl + "featured";
    return request(url);
  },

  update: (id, data) => {
    const url = urls.destinationsUrl + "edit/" + id;
    return request(url, { method: "PUT", data });
  },

  delete: (id) => {
    const url = urls.destinationsUrl + "del/" + id;
    return request(url, { method: "DELETE" });
  },
};

// Hotels
export const catalog = {
  create: (data) => {
    const url = urls.hotelsUrl;
    return request(url, { method: "POST", data });
  },

  get: (hitelId) => {
    const url = urls.hotelsUrl + hitelId;
    return request(url);
  },

  getOwn: () => {
    const url = urls.hotelsUrl + "own";
    return request(url);
  },

  update: (hotelId, data) => {
    const url = urls.hotelsUrl + hotelId;
    return request(url, { method: "PUT", data });
  },

  delete: (hotelId) => {
    const url = urls.hotelsUrl + hotelId;
    return request(url, { method: "DELETE" });
  },

  countByCity: (cityArray) => {
    const url = urls.hotelsUrl + "countByCity?cities=" + cityArray.join(",");
    return request(url);
  },

  featuredHotels: () => {
    const url = urls.hotelsUrl + "featured";
    return request(url);
  },

  getPropertyList: () => {
    const url = urls.hotelsUrl + "countByType";
    return request(url);
  },

  filter: (query) => {
    const url = urls.hotelsUrl + query;
    return request(url);
  },
};

// Rooms
export const rooms = {
  get: (roomId) => {
    const url = urls.roomsUrl + roomId;
    return request(url);
  },

  getByHotel: (hotelId) => {
    const url = urls.roomsUrl + hotelId;
    return request(url);
  },

  create: (hotelId, roomData) => {
    const url = urls.roomsUrl + hotelId;
    return request(url, { method: "POST", data: roomData });
  },

  delete: (roomId) => {
    const url = urls.roomsUrl + roomId;
    return request(url, { method: "DELETE" });
  },

  update: (roomId, roomData) => {
    const url = urls.roomsUrl + roomId;
    return request(url, { method: "PUT", data: roomData });
  },
};

// Reservations
export const reservations = {
  create: (data) => {
    const url = urls.reserveUrl;
    return request(url, { method: "POST", data });
  },

  getByHotel: (hotelId) => {
    const url = urls.reserveUrl + "hotel/" + hotelId;
    return request(url);
  },

  getByUser: (userId) => {
    const url = urls.reserveUrl + "user/" + userId;
    return request(url);
  },

  getByOwner: (ownerId) => {
    const url = urls.reserveUrl + "owner/" + ownerId;
    return request(url);
  },

  get: (reservationId) => {
    const url = urls.reserveUrl + reservationId;
    return request(url);
  },

  delete: (reservationId) => {
    const url = urls.reserveUrl + reservationId;
    return request(url, { method: "DELETE" });
  },
};

export const imageServices = {
  upload: async (imageList, hotelId) => {
    try {
      await Promise.all(
        imageList.map((image) => firebase.uploadHotelImg(image, hotelId))
      ).then(async (imgUrls) => {
        await catalog.update(hotelId, { pictures: imgUrls });

        return true;
      });
    } catch (err) {
      throw err;
    }
  },

  deleteHotelImages: async (hotelId) => {
    await firebase.delHotelImages(hotelId);
    return true;
  },
};
