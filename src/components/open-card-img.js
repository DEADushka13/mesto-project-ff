// Открытие и закрытие модального окна
const places = document.querySelector(".places");
const card_img = document.querySelector(".popup_type_image");
// const popup13 = document.querySelector(".popup_type_image");

places.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    card_img.classList.add("popup_is-opened");
    // console.log(card_img.classList);
    // alert("Ураа");
    // close_listener();
  }
});


