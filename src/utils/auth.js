// Specify the BASE_URL for the API.
export const BASE_URL = "https://api.nomoreparties.co";

// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
export const register = (name, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
