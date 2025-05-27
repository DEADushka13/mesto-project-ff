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

//Функция-обработчик события удаления
export const deleteCard = function (cardElem, deleteButton) {
  deleteButton.addEventListener("click", function () {
    cardElem.remove();
  });
};

//Функция-обработчик события лайка
export const likeCard = function (likeButton) {
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
};
