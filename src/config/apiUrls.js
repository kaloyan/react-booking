// Backend API URL constants

// Set variable in .env file to point to your backend server
export const BASE_URL = process.env.REACT_APP_BASE_URL;

// auth urls
export const loginUrl = `${BASE_URL}/auth/login`;
export const accountUrl = `${BASE_URL}/auth/account`;
export const logoutUrl = `${BASE_URL}/auth/logout`;
export const registerUrl = `${BASE_URL}/auth/register`;

// user api urls
export const usersUrl = `${BASE_URL}/api/v1/users/`;

// hotels api urls
export const hotelsUrl = `${BASE_URL}/api/v1/hotels/`;

// destinations
export const destinationsUrl = `${BASE_URL}/api/v1/destinations/`;

// rooms api urls
export const roomsUrl = `${BASE_URL}/api/v1/rooms/`;

// reservations api urls
export const reserveUrl = `${BASE_URL}/api/v1/reservate/`;

// reviews api urls
export const reviewUrl = `${BASE_URL}/api/v1/review/`;
