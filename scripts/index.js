let editButton = document.querySelector(".header__profile-button");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");
let popup = document.querySelector(".popup");

let nameInput = document.querySelector("#input-name");
let jobInput = document.querySelector("#input-tag");
let name = document.querySelector(".header__profile-name");
let job = document.querySelector(".header__profile-tag");
let form = document.querySelector(".popup__container");

function openpopup() {
  popup.classList.add("popup_opened");
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function closepopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openpopup);
closeButton.addEventListener("click", closepopup);

function submitForm(e) {
  e.preventDefault();
  job.textContent = jobInput.value;
  name.textContent = nameInput.value;
  closepopup();
}

form.addEventListener("submit", submitForm);
