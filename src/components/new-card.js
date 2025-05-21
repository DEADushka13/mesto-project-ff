import { deleteCard, likeCard } from "../scripts/index.js";
// Находим форму в DOM
const new_card_Element = document.querySelector(".popup_type_new-card"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const place_nameInput = document.querySelector(".popup__input_type_card-name"); // Воспользуйтесь инструментом .querySelector()
const pic_urlInput = document.querySelector(".popup__input_type_url"); // Воспользуйтесь инструментом .querySelector()
const cardTemplate = document.querySelector("#card-template").content;
const cardNew = document.querySelector(".places__list");
  
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent

  // клонируем

  //наполняем
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElem.querySelector(".card__image");
  const likeButton = cardElem.querySelector(".card__like-button");
  cardElem.querySelector(".card__title").textContent = place_nameInput.value;
  cardImg.src = pic_urlInput.value;
  cardImg.alt = place_nameInput.value;
  //кнопка удаления текущей карточки
  const deleteButton = cardElem.querySelector(".card__delete-button");
  //следим и удаляем
  deleteCard(cardElem, deleteButton);
  likeCard(likeButton);
  cardNew.prepend(cardElem);
  place_nameInput.value = "";
  pic_urlInput.value = "";
  new_card_Element.classList.remove("popup_is-opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
new_card_Element.addEventListener("submit", handleFormSubmit);
