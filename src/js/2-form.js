const form = document.querySelector(".feedback-form");
const message = form.elements.message;
const email = form.elements.email;
const localStorageKey = "feedback-form-state";

const dataFromLocalStorage = localStorage.getItem(localStorageKey) ?? "";
if (dataFromLocalStorage) {
  const dataParsed = JSON.parse(dataFromLocalStorage);
  message.value = dataParsed.message;
  email.value = dataParsed.email;
}

form.addEventListener("input", () => {
  const dataOfInput = { email: email.value, message: message.value };
  localStorage.setItem(localStorageKey, JSON.stringify(dataOfInput));
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log({ email: evt.target.elements.email.value, message: evt.target.elements.message.value });
  localStorage.removeItem(localStorageKey);
  form.reset();
});