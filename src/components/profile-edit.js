//Редактирование профиля
const formElement = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//Берём значения со страницы в попап
export function currentProfile(edit_form) {
  edit_form.elements.name.value =
    document.querySelector(".profile__title").textContent;
  edit_form.elements.description.value = document.querySelector(
    ".profile__description"
  ).textContent;
}

//Обработчик нажатия submit
export function handleFormSubmit(evt) {
  evt.preventDefault(); 
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  formElement.classList.remove("popup_is-opened");
}
