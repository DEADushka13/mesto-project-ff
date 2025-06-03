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

async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

export function getUserInfo(profileTitle, profileDescription, profileImage) {
  request("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    headers: {
      authorization: "579f6f72-d3f4-4c7c-9a95-861c3605b176",
    },
  }).then((res) =>
    updateInfo(res, profileTitle, profileDescription, profileImage)
  );
}

function updateInfo(res, profileTitle, profileDescription, profileImage) {
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  //   profileImage.style.backgroundImage = res.avatar;
  profileImage.style.backgroundImage = `url('${res.avatar}')`;
}
