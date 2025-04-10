// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardNew = document.querySelector(".places__list");

// @todo: Функция создания карточки
const addCard = function (card, deleteCard) {
  // клонируем
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  //наполняем
  cardElem.querySelector(".card__title").textContent = card.name;
  cardElem.querySelector(".card__image").src = card.link;
  cardElem.querySelector(".card__image").alt = card.name;
  //отображаем
  cardNew.append(cardElem);
  //кнопка удаления текущей карточки
  const deleteButton = cardElem.querySelector(".card__delete-button");
  //следим и удаляем
  deleteCard(cardElem, deleteButton);
};

// @todo: Функция удаления карточки
const deleteCard = function (cardElem, deleteButton) {
  deleteButton.addEventListener("click", function () {
    cardElem.remove();
  });
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  addCard(item, deleteCard);
});
