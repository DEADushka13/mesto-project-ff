const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export const createCard = function (
  card,
  deleteCard,
  likeCard,
  onOpenImagePopup
) {
  // клонируем
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  //наполняем
  const cardImageContainer = cardElem.querySelector(".card__image");
  cardElem.querySelector(".card__title").textContent = card.name;
  cardImageContainer.src = card.link;
  cardImageContainer.alt = card.name;
  //открываем, если нажали
  cardImageContainer.addEventListener("click", () => {
    onOpenImagePopup(cardImageContainer);
  });
  //кнопка удаления текущей карточки
  const deleteButton = cardElem.querySelector(".card__delete-button");
  //кнопка лайка текущей карточки
  const likeButton = cardElem.querySelector(".card__like-button");
  //следим и удаляем
  deleteCard(cardElem, deleteButton);
  //следим и лайкаем
  likeCard(likeButton);
  return cardElem;
};

//Удаление карточки
export const deleteCard = function (cardElem, deleteButton) {
  deleteButton.addEventListener("click", function () {
    cardElem.remove();
  });
};

//лайкнуть карточку
export const likeCard = function (likeButton) {
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
};

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
