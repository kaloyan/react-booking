// Backend API URL constants

// Change this URL to point your backend server
export const BASE_URL = "http://localhost:3000";

// auth urls
export const loginURL = `${BASE_URL}/auth/login`;
export const accountURL = `${BASE_URL}/auth/account`;
export const logoutURL = `${BASE_URL}/auth/logout`;
export const registerURL = `${BASE_URL}/auth/register`;

// user api urls
export const usersURL = `${BASE_URL}/api/v1/users/`;

// hotels api urls
export const itemURL = `${BASE_URL}/api/v1/hotels/`;

// destinations
export const destURL = `${BASE_URL}/api/v1/destinations/`;

// rooms api urls
export const roomsURL = `${BASE_URL}/api/v1/rooms/`;