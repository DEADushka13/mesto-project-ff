// Открытие и закрытие модального окна
const profile = document.querySelector(".profile");
const edit_popup = document.querySelector(".popup_type_edit");
profile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    edit_popup.classList.add("popup_is-opened");
    // alert("Ураа");
  }
});
