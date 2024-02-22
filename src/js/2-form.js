const form = document.querySelector('.feedback-form');
const messageOfInput = form.elements.message;
const emailOfInput = form.elements.email;
const localStorageKey = 'feedback-form-state';

const dataFromLocalStorage = localStorage.getItem(localStorageKey);
if (dataFromLocalStorage) {
  try {
    const parsedData = JSON.parse(dataFromLocalStorage);
    if (parsedData && typeof parsedData === 'object') {
      messageOfInput.value = parsedData.message ?? '';
      emailOfInput.value = parsedData.email ?? '';
    }
  } catch (error) {
    console.error('Error parsing data from local storage:', error);
  }
}

form.addEventListener('input', saveData);
form.addEventListener('submit', uploadData);

function saveData() {
  const dataOfInput = {
    email: emailOfInput.value,
    message: messageOfInput.value,
  };
  const trimedDataOfInput = trimValues(dataOfInput);
  localStorage.setItem(localStorageKey, JSON.stringify(trimedDataOfInput));
}

function trimValues(obj) {
  const arrOfKeyVal = Object.entries(obj);
  let trimedObj = {};
  for (const [key, value] of arrOfKeyVal) {
    trimedObj[key] = value.toString().trim();
  }
  return trimedObj;
}

function uploadData(evt) {
  evt.preventDefault();
  if (emailOfInput.value === '' || messageOfInput.value === '') {
    alert('Download all input fields');
    return;
  }
  console.log({
    email: evt.target.elements.email.value,
    message: evt.target.elements.message.value,
  });
  localStorage.removeItem(localStorageKey);
  form.reset();
}
