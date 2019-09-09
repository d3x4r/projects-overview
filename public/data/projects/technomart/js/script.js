var writeUsLink = document.querySelector(".button-contacts");
      var writeUsModal = document.querySelector(".write-us");

      var isStorageSupport = true;
      var storage = "";

      try {
    storage = localStorage.getItem("name");
}

catch (err) {
    isStorageSupport = false;
}

if (writeUsModal) {
    var close = writeUsModal.querySelector(".close-modal");
        var writeUsForm = writeUsModal.querySelector(".write-us-form");
        var yourName = writeUsModal.querySelector(".write-us-name");
        var yourEmail = writeUsModal.querySelector(".write-us-email");
        var yourText = writeUsModal.querySelector(".write-us-letter");

        writeUsLink.addEventListener("click", function(evt) {
          evt.preventDefault();
          writeUsModal.classList.add("modal-show");

          if (storage) {
            yourName.value = storage;
            yourEmail.focus();
}

else {
    yourName.focus();
}
        });

close.addEventListener("click", function(evt) {
    evt.preventDefault();
          writeUsModal.classList.remove("modal-show");
          writeUsModal.classList.remove("write-us-error");
});

writeUsForm.addEventListener("submit", function(evt) {
    if (!yourName.value || !yourEmail.value || !yourText.value) {
            evt.preventDefault();
            writeUsModal.classList.remove("write-us-error");
            writeUsModal.offsetWidth = writeUsModal.offsetWidth;
            writeUsModal.classList.add("write-us-error");
}

else {
    if (isStorageSupport) {
              localStorage.setItem("name", yourName.value);
}
          }
        });
      }

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
          evt.preventDefault();
          if (writeUsModal.classList.contains("modal-show")) {
            writeUsModal.classList.remove("modal-show");
            writeUsModal.classList.remove("write-us-error");
}
        }
      });

var mapLink = document.querySelector(".map-link");
      var mapModal = document.querySelector(".map");

      if (mapLink) {
    mapLink.addEventListener("click", function(evt) {
          evt.preventDefault();
          mapModal.classList.add("modal-show");
});
      }

if (mapModal) {
    var mapClose = mapModal.querySelector(".close-modal");

        mapClose.addEventListener("click", function(evt) {
          evt.preventDefault();
          mapModal.classList.remove("modal-show");
});
      }

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
          evt.preventDefault();
          if (mapModal.classList.contains("modal-show")) {
            mapModal.classList.remove("modal-show");
}
        }
      });

var purchase = document.querySelectorAll(".button-green"),
        index, button;

      var modalCart = document.querySelector(".modal-cart");

      for (index = 0; index < purchase.length; index++) {
    button = purchase[index];
        button.addEventListener('click', function(event) {
          modalCart.classList.add("modal-show");
          event.preventDefault();
});
      }

if (modalCart) {
    var cartClose = modalCart.querySelector(".close-modal");

        cartClose.addEventListener("click", function(evt) {
          evt.preventDefault();
          modalCart.classList.remove("modal-show");
});
      }

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
          evt.preventDefault();
          if (modalCart.classList.contains("modal-show")) {
            modalCart.classList.remove("modal-show");
}
        }
      });
