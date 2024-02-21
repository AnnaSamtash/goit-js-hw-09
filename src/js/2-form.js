const form = document.querySelector('.feedback-form');
const messageOfInput = form.elements.message;
const emailOfInput = form.elements.email;
const localStorageKey = 'feedback-form-state';

const dataFromLocalStorage = localStorage.getItem(localStorageKey) ?? '';
if (dataFromLocalStorage) {
  const { email = '', message = '' } = JSON.parse(dataFromLocalStorage);
  if (message) {
    messageOfInput.value = message;
  }
  if (email) {
    emailOfInput.value = email;
  }
}

form.addEventListener('input', saveData);
form.addEventListener('submit', uploadData);

function saveData() {
  if (emailOfInput.value !== "" && messageOfInput.value !== "") {
    const dataOfInput = {
      email: emailOfInput.value,
      message: messageOfInput.value,
    };
    const trimedDataOfInput = trimValues(dataOfInput);
    localStorage.setItem(localStorageKey, JSON.stringify(trimedDataOfInput));
  }
}

function trimValues(obj) {
  for (let key in obj) {
    obj[key] = obj[key].trim();
  }
  return obj;
}

function uploadData(evt) {
  evt.preventDefault();
  if (emailOfInput.value === "" || messageOfInput.value === "") {
    alert("Download all input fields");
    return;
  }
  console.log({
    email: evt.target.elements.email.value,
    message: evt.target.elements.message.value,
  });
  localStorage.removeItem(localStorageKey);
  form.reset();
}

