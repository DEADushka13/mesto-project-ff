// в файле api.js описаны функции для взаимодействия с сервером;
// Токен: 579f6f72-d3f4-4c7c-9a95-861c3605b176
// Идентификатор группы: wff-cohort-39

// return fetch('https://nomoreparties.co/v1/cohort-42/cards', {
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "579f6f72-d3f4-4c7c-9a95-861c3605b176",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

//GET PROFILE
export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
}

export function getGroupCard() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

export const patchUserInfo = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const postNewCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export const deleteCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const likeCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const unlikeCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const patchAvatar = (avatarUrl) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
};
