import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".bigimage-ils");
    this._titleElement = this._popup.querySelector(".bigimage-title");
    this._closeButton = this._popup.querySelector(".bigimage-close");
  }

  open(imageSrc, title) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = title;
    this._titleElement.textContent = title;
    this._popup.classList.add("popup__opened");
    super.open();
  }

  close() {
    this._popup.classList.remove("popup__opened");
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeButton.addEventListener("click", () => this.close());
  }
}
