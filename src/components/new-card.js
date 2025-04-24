// Открытие и закрытие модального окна
const profile = document.querySelector(".profile");
const new_card_popup = document.querySelector(".popup_type_new-card");
profile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    new_card_popup.classList.add("popup_is-opened");
    // alert("Ураа");
  }
});