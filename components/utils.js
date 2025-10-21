export function renderLoading(
  isLoading,
  buttonElement,
  defaultText = "Guardar"
) {
  if (isLoading) {
    buttonElement.textContent = "Guardando...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = defaultText;
    buttonElement.disabled = false;
  }
}
