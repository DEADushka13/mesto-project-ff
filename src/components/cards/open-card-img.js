const card_img = document.querySelector(".popup_type_image");

//Открыть карточку
export const openImg = function (cardImg) {
  cardImg.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__image")) {
      const popImg = card_img.querySelector(".popup__image");
      const popCaption = card_img.querySelector(".popup__caption");
      popImg.src = cardImg.src;
      popCaption.textContent = cardImg.alt;
    }
  });
};
