//Редактирование профиля
const editPopup = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

//Берём значения со страницы в попап
export function currentProfile(edit_form) {
  const profileTitle = document.querySelector(".profile__title").textContent;
  const profileDesc = document.querySelector(
    ".profile__description"
  ).textContent;
  edit_form.elements.name.value = profileTitle;
  edit_form.elements.description.value = profileDesc;
}

//Обработчик нажатия submit
export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  editPopup.classList.remove("popup_is-opened");
}
