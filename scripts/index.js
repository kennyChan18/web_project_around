// popup editar perfil
const popupEdit = document.querySelector(".popup");
const openPopupButton = document.querySelector(".profile__info-button");
const closePopupButton = document.querySelector(".popup__button-close");

const form = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-name");
const occupationInput = document.querySelector(".popup__form-occupation");

const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");

openPopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileDescription.textContent;

  popupEdit.classList.add("popup_opened");
});

closePopupButton.addEventListener("click", () => {
  popupEdit.classList.remove("popup_opened");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = occupationInput.value;

  popupEdit.classList.remove("popup_opened");
});

// popup agregar nuevo lugar
const popupAdd = document.querySelector(".popup-add");
const openAddButton = document.querySelector(".profile__info-button-add");
const closeAddButton = document.querySelector(".popup-add__button-close");

const addForm = document.querySelector(".popup-add__form");
const placeInput = document.querySelector(".popup-add__form-place");
const urlInput = document.querySelector(".popup-add__form-url");

const cardsContainer = document.querySelector(".elements");

openAddButton.addEventListener("click", () => {
  placeInput.value = "";
  urlInput.value = "";
  popupAdd.classList.add("popup-add_opened");
});

closeAddButton.addEventListener("click", () => {
  popupAdd.classList.remove("popup-add_opened");
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = placeInput.value;
  const imageUrl = urlInput.value;

  const newCard = createCard(title, imageUrl);
  cardsContainer.prepend(newCard);

  popupAdd.classList.remove("popup-add_opened");
});

// crear nueva tarjeta
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function createCard(title, imageUrl) {
  const template = document.getElementById("card__template");
  const card = template.content
    .cloneNode(true)
    .querySelector(".elements__card");

  const cardImage = card.querySelector(".elements__card-image");
  const cardName = card.querySelector(".elements__card-name");
  const cardDeleteButton = card.querySelector(".elements__card-delete");
  const cardLikeButton = card.querySelector(".elements__card-like");

  cardImage.src = imageUrl;
  cardImage.alt = title;
  cardName.textContent = title;

  cardDeleteButton.addEventListener("click", () => {
    card.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__card-like_active");
  });

  return card;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData.name, cardData.link);
  cardsContainer.append(cardElement);
});

function initializeCardEvents(card) {
  const deleteButton = card.querySelector(".elements__card-delete");
  const likeButton = card.querySelector(".elements__card-like");

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      card.remove();
    });
  }

  if (likeButton) {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__card-like_active");
    });
  }
}

// popup imagen
const popupImage = document.querySelector(".elements__popup");
const popupImg = popupImage.querySelector(".elements__popup-img");
const popupText = popupImage.querySelector(".elements__popup-text");
const popupCloseBtn = popupImage.querySelector(".elements__popup-button-close");

function openImagePopup(imageSrc, altText) {
  popupImg.src = imageSrc;
  popupImg.alt = altText;
  popupText.textContent = altText;
  popupImage.classList.add("popup_opened");
}

popupCloseBtn.addEventListener("click", () => {
  popupImage.classList.remove("popup_opened");
});

cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("elements__card-image")) {
    const img = event.target;
    openImagePopup(img.src, img.alt);
  }
});

//cerrar popups
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.classList.remove("popup-add_opened");
}

function setPopupEventListeners(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(
      ".popup_opened, .popup-add_opened, .elements__popup.popup_opened"
    );
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

setPopupEventListeners(document.querySelector(".popup"));
setPopupEventListeners(document.querySelector(".popup-add"));
setPopupEventListeners(document.querySelector(".elements__popup"));

enableValidation({
  formSelector: ".popup__form, .popup-add__form",
  inputSelector: "input",
  submitButtonSelector: "button[type='submit'], .popup-add__form-button-create",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
});
