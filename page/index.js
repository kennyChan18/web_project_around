import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { renderLoading } from "../components/utils.js";

const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-ocupation");
const cardsContainer = document.querySelector(".cards__container");

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "cc96e8a5-3bc5-410b-b46e-f8007ecf5f27",
    "Content-Type": "application/json",
  },
});

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-ocupation",
  avatarSelector: ".profile__avatar",
});

const popupDeleteCard = new PopupWithConfirmation("#popup-delete-card");
popupDeleteCard.setEventListeners();

// Instancia de PopupWithImage
const popupImage = new PopupWithImage(".bigimage");
popupImage.setEventListeners();

let userId;

api
  .getUserInfo()
  .then(function (user) {
    userId = user._id;
    userInfo.setUserInfo({ name: user.name, about: user.about });
    userInfo.setUserAvatar(user.avatar);

    return api.getInitialCards();
  })

  .then((items) => {
    const cardSection = new Section(
      {
        items: items,
        renderer: (item) => {
          const card = new Card(
            {
              title: item.name,
              image: item.link,
              ownerId: item.owner._id,
              cardId: item._id,
              isLiked: item.isLiked,
            },
            popupImage,
            api,
            userId,
            (cardId, cardElement) => {
              popupDeleteCard.setSubmitAction(() => {
                api
                  .deleteCard(cardId)
                  .then(() => {
                    cardElement.remove();
                    popupDeleteCard.close();
                  })
                  .catch((err) => console.log(err));
              });
              popupDeleteCard.open();
            }
          );
          cardSection.addItem(card.generateCard());
        },
      },
      ".cards__container"
    );
    cardSection.renderItems();
  })

  .catch((err) => console.log(err));

// Instancia de Popup para editar perfil
const popupEditProfile = new PopupWithForm(
  "#edit-profile",
  (formData) => {
    const saveButton = popupEditProfile._submitButton;
    renderLoading(true, saveButton);

    api
      .updateUserInfo({ name: formData.first, about: formData.second })
      .then((res) => {
        profileName.textContent = res.name;
        profileAbout.textContent = res.about;
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, saveButton));
  },
  {
    title: "Editar Perfil",
    placeholders: ["Nombre", "Ocupación"],
    inputNames: ["first", "second"],
    buttonText: "Guardar",
  }
);

popupEditProfile.setEventListeners();

// Instancia de Popup para agregar card
const popupAddCard = new PopupWithForm(
  "#add-card",
  (formData) => {
    const saveButton = popupAddCard._submitButton;
    renderLoading(true, saveButton, "Agregando...");

    api
      .addCard({ name: formData.name, link: formData.link })
      .then((item) => {
        const newCard = new Card(
          {
            title: item.name,
            image: item.link,
            ownerId: item.owner._id,
            cardId: item._id,
            likes: item.likes,
          },
          popupImage,
          api,
          userId
        );
        cardsContainer.prepend(newCard.getHtmlCard());
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, saveButton, "Agregar"));
  },
  {
    title: "Nuevo Lugar",
    placeholders: ["Lugar", "Enlace a la imagen"],
    inputNames: ["name", "link"],
    buttonText: "Agregar",
  }
);
popupAddCard.setEventListeners();

// Instancia de Popup para cambiar avatar
const popupEditAvatar = new PopupWithForm(
  "#popup-change-avatar",
  (formData) => {
    const saveButton = popupEditAvatar._submitButton;
    renderLoading(true, saveButton);

    api
      .updateAvatar(formData.avatar)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, saveButton));
  },
  {
    title: "Cambiar foto de perfil",
    placeholders: ["Enlace nueva foto de perfil"],
    inputNames: ["avatar"],
    buttonText: "Guardar",
  }
);

popupEditAvatar.setEventListeners();

// Abrir los popup
document.querySelector("#edit-button").addEventListener("click", () => {
  popupEditProfile.open();
  validationConfigEdit.resetValidation();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupAddCard.open();
  validationConfigAdd.resetValidation();
});

document
  .querySelector(".profile__avatar-edit-icon")
  .addEventListener("click", () => {
    popupEditAvatar.open();
    validationConfigChangeAvatar.resetValidation();
  });

// Config de validación para editar perfil
const validationConfigEdit = new FormValidator("#popup-form-edit-profile", {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
});
validationConfigEdit.enableValidation();

// Config de validación para agregar card
const validationConfigAdd = new FormValidator("#popup-form-add-card", {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
});
validationConfigAdd.enableValidation();

// Config de validación para editar avatar
const validationConfigChangeAvatar = new FormValidator(
  "#popup-form-change-avatar",
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
  }
);
validationConfigChangeAvatar.enableValidation();
