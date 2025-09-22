// Specify the BASE_URL for the API.
import { checkResponse } from "./api";
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.what2wear.jumpingcrab.com"
    : "http://localhost:3001";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then((res) => checkResponse(res));
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};
