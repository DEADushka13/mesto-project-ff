// Закрытие модальных окон
const popup = document.querySelectorAll(".popup");

//Кнопка закрытия
popup.forEach(function (el) {
  el.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      el.classList.remove("popup_is-opened");
    }
  });
});

//Закрытие кликом на оверлей
export function close_withinclick(el) {
  const popup_content = el.querySelector(".popup__content");
  el.addEventListener("click", function (evt) {
    const withinBoundaries = evt.composedPath().includes(popup_content);
    if (!withinBoundaries) {
      el.classList.remove("popup_is-opened");
    }
  });
}

//Закрытие нажатием на Esc
export function close_esc(el) {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      el.classList.remove("popup_is-opened");
    }
  });
}
