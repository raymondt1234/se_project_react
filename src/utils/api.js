import { baseUrl } from "./constants";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function likeItem(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
}

function dislikeItem(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
}

function editProfile(updatedProfile) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(updatedProfile),
  }).then(checkResponse);
}
// function editProfile({ name, avatar }) {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     },
//     body: JSON.stringify({ name, avatar }),
//   }).then(checkResponse);
// }

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((errData) => {
    return Promise.reject(errData.validation?.body?.message || errData.message);
  });
}

export {
  getItems,
  addItem,
  likeItem,
  dislikeItem,
  editProfile,
  deleteItem,
  checkResponse,
};
