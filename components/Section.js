export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos los elementos iniciales
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  // Agrega un nuevo elemento al inicio del contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
