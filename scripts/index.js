import { Card, FormCard } from "./card.js";
import { FormValidator } from "./FormValidator.js";

const gallery = document.querySelector(".main__gallery");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const formElements = document.querySelectorAll(validationConfig.formSelector);
const formValidators = [];

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

initialCards.forEach((item) => {
  const card = new Card(item, "#main__template");
  const cardElement = card.getCreateCard();

  gallery.append(cardElement);
});

const cardsAdd = (titleValue, linkValue, cardSelector) => {
  const formCard = new FormCard(cardSelector);
  formCard.handleCreateCard(titleValue, linkValue);
  const userCard = formCard.getCreateCard();
  gallery.prepend(userCard);
};

export { cardsAdd as add, validationConfig as config };
