import { deleteCardApi, likeCardApi, unlikeCardApi } from "../api.js";

const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export const createCard = function (
  card,
  deleteCard,
  likeCard,
  onOpenImagePopup,
  myId
) {
  // клонируем
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  //наполняем
  const cardImageContainer = cardElem.querySelector(".card__image");
  const countLikesContainer = cardElem.querySelector(".card__likes");

  const countLikes = card.likes.length;
  countLikesContainer.textContent = countLikes;

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
  const owner = card.owner;
  const cardId = card._id;

  if (owner._id !== myId) {
    deleteButton.remove();
  } else {
    const cardToDelete = cardElem;
    deleteCard(cardId, deleteButton, cardToDelete);
  }

  //следим и лайкаем
  likeCard(likeButton, cardId, card.likes, myId);
  return cardElem;
};

//Функция-обработчик события удаления
export const deleteCard = function (cardId, deleteButton, cardElem) {
  deleteButton.addEventListener("click", function () {
    deleteCardApi(cardId)
      .then(() => {
        cardElem.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

//Функция-обработчик события лайка
export const likeCard = function (likeButton, cardId, likes, myId) {
  if (likes.some((like) => like._id === myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeButton.classList.remove("card__like-button_is-active");
      unlikeCardApi(cardId);
    } else {
      likeButton.classList.add("card__like-button_is-active");
      likeCardApi(cardId);
    }
  });
};
