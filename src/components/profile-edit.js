// const edit_form = document.forms.edit_profile;
// edit_form.elements.name.value = pofile_name;
// edit_form.elements.description.value = profile_disc;
// console.log(document.forms.edit_profile);
// console.log(document.forms.edit_profile.elements);

//-------------------------------------------------------
// Берём значения в форму
const edit_form = document.forms.edit_profile;
edit_form.elements.name.value =
  document.querySelector(".profile__title").textContent;
edit_form.elements.description.value = document.querySelector(
  ".profile__description"
).textContent;
//-------------------------------------------------------

// const edit_input_name = document.forms.edit_profile.name;
// edit_input_name.addEventListener("keydown", function () {
//   console.log("Ураааа");
// });

// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  // Вставьте новые значения с помощью textContent
  console.log("Ураааа");
  formElement.classList.remove("popup_is-opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
