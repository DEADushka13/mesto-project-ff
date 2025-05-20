const popup = document.querySelectorAll(".popup");

// function close_listener() {
popup.forEach(function (el) {
  el.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      el.classList.remove("popup_is-opened");
      // alert(card_img.classList);
    }

    //закрытие, когда кликаешь не по контенту
    // if (!evt.target.classList.contains("popup__content")) {
    //   el.classList.remove("popup_is-opened");
    //   // alert(card_img.classList);
    // }
  });
});

export function close_withinclick(el) {
  const popup_content = el.querySelector(".popup__content");
  el.addEventListener("click", function (evt) {
    const withinBoundaries = evt.composedPath().includes(popup_content);
    if (!withinBoundaries) {
      el.classList.remove("popup_is-opened"); // скрываем элемент, так как клик был за его пределами
    }
  });
}

export function close_esc(el) {
  el.addEventListener("keydown", function (evt) {
    evt.preventDefault();
    if (evt.key === "Escape") {
      el.classList.remove("popup_is-opened");
    }
  });
}