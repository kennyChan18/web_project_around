import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, config) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formTitle = this._popup.querySelector(".popup__form-title");
    this._submitButton = this._popup.querySelector(".popup__button");
    this._config = config;
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  getTitle() {
    return this._formTitle ? this._formTitle.textContent : "";
  }

  get submitButton() {
    return this._submitButton;
  }

  _setFormConfig() {
    const { title, placeholders, inputNames, buttonText } = this._config;

    if (this._formTitle) {
      this._formTitle.textContent = title;
    }

    this._submitButton.textContent = buttonText;

    this._inputList.forEach((input, index) => {
      input.placeholder = placeholders[index];
      input.name = inputNames[index];

      if (input.name === "avatar" || input.name === "link") {
        input.type = "url";
      } else {
        input.type = "text";
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
    });
  }

  open() {
    super.open();
    this._setFormConfig();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
