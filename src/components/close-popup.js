const popup = document.querySelectorAll(".popup");
// function close_listener() {
popup.forEach(function(el){
  el.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      el.classList.remove("popup_is-opened");
      // alert(card_img.classList);
    }
  });
});

// }


// array.forEach(callback(element, index, array), thisArg)