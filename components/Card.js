const cardTemplate = document.querySelector("#card-template").content;

export default class Card {
  constructor(
    { title, image, ownerId, cardId, isLiked },
    popupImage,
    api,
    userId,
    handleDeleteClick
  ) {
    this._title = title;
    this._image = image;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._isLiked = isLiked;
    this._popupImage = popupImage;
    this._api = api;
    this._userId = userId;
    this._handleDeleteClick = handleDeleteClick;
  }

  _cloneTemplate() {
    return cardTemplate.querySelector(".cards__item").cloneNode(true);
  }

  _setProperties() {
    this.cardImage = this.card.querySelector(".cards__item-img");
    this.cardTitle = this.card.querySelector(".cards__item-name");
    this.likeButton = this.card.querySelector(".cards__item-like");
    this.deleteButton = this.card.querySelector(".cards__item-delete");

    this.cardImage.src = this._image;
    this.cardImage.alt = this._title;
    this.cardTitle.textContent = this._title;

    this._updateLikeState();
  }

  generateCard() {
    this.card = this._cloneTemplate();
    this._setProperties();
    this._setEventListeners();
    return this.card;
  }

  _setEventListeners() {
    // Evento de like
    this.likeButton.addEventListener("click", () => {
      const isLiked = this.likeButton.classList.contains(
        "cards__item-like_active"
      );

      if (isLiked) {
        this._api
          .removeLike(this._cardId)
          .then((res) => {
            this._isLiked = res.isLiked;
            this._updateLikeState();
          })
          .catch((err) => console.log(err));
      } else {
        this._api
          .addLike(this._cardId)
          .then((res) => {
            this._isLiked = res.isLiked;
            this._updateLikeState();
          })
          .catch((err) => console.log(err));
      }
    });

    // Evento de eliminación
    this.deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId, this.card);
    });

    // Evento de click en la imagen
    this.cardImage.addEventListener("click", () => {
      this._popupImage.open(this._image, this._title);
    });
  }

  // Método que actualiza el estado del like
  _updateLikeState() {
    this.likeButton.classList.toggle("cards__item-like_active", this._isLiked);
  }

  getHtmlCard() {
    return this.generateCard();
  }
}
