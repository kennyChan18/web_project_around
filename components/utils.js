import { add, usInfo } from "../page/index.js";

export const edClass = ".form-edit";
export const addClass = ".form-add";
export const butEdit = document.querySelector(".main__button_edit");
export const butAdd = document.querySelector(".main__button_add");
export const butClose = document.querySelector(".popup__button_close");
export const popup = document.querySelector(".popup");
export const formEd = document.querySelector(edClass);
export const formAdd = document.querySelector(addClass);
export const popimg = document.querySelector(".popup__images");
export const paragName = document.querySelector(".main__paragraph_name");
export const paragAbout = document.querySelector(".main__paragraph_about");
export const inpName = document.querySelector(".popup__input_name");
export const inpAbout = document.querySelector(".popup__input_about");
export const inpTitle = document.querySelector(".popup__input_title");
export const inpUrl = document.querySelector(".popup__input_url");
export const popimag = popimg.querySelector(".popup__image");
export const poptxt = popimg.querySelector(".popup__paragraph");
export const gallery = ".main__gallery";
export const initialCards = [
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

export const openEditAdd = (e, openPop) => {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    openPop.open();
    formAdd.classList.toggle("popup__item-hidden");
    popimg.classList.toggle("popup__item-hidden");
    const userData = usInfo.getUserInfo();
    inpName.value = userData.name;
    inpAbout.value = userData.job;
    formValidators.forEach((validator) => {
      if (validator._formElement === formEd) {
        validator.resetValidation();
      }
    });
  } else if (butClass.contains("main__button_add")) {
    openPop.open();
    formEd.classList.toggle("popup__item-hidden");
    popimg.classList.toggle("popup__item-hidden");
  }
};

export const closePop = () => {
  popup.classList.remove("popup_opened");
  popimg.classList.remove("popup__item-hidden");
  formAdd.classList.remove("popup__item-hidden");
  formEd.classList.remove("popup__item-hidden");
  resetFormAndValidation(popup);
};

export const saveChangeEdit = () => {
  usInfo.setUserInfo({ name: inpName.value, job: inpAbout.value });
  closePop();
};

export const saveCard = () => {
  add(inpTitle.value, inpUrl.value, "#main__template");
  closePop();
};
