// validate form elements that are passed into the form by the user
// input is run through loops and if errors are detected, an error message will appear
const userInputValidation = (formElements) => {
  for (let formElement of formElements) {
    if (!formElement.value) {
      formElement.classList.add("error");
      return false;
    } else {
      formElement.classList.remove("error");
      return true;
    }
  }
};

export { userInputValidation };
