const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => checkResponse(res));
}

function postItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => checkResponse(res));
}

function deleteItem({ _id }) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => checkResponse(res));
}

export { getItems, postItem, deleteItem, checkResponse };
