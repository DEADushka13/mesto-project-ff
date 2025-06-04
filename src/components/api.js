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

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}

//GET PROFILE
export function getUserInfo() {
  return request("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    headers: {
      authorization: "579f6f72-d3f4-4c7c-9a95-861c3605b176",
    },
  });
}

export function getGroupCard() {
  return request("https://nomoreparties.co/v1/wff-cohort-39/cards", {
    headers: {
      authorization: "579f6f72-d3f4-4c7c-9a95-861c3605b176",
    },
  });
}

export const patchUserInfo = (name, about) => {
  return request("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    method: "PATCH",
    headers: {
      authorization: "579f6f72-d3f4-4c7c-9a95-861c3605b176",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};
