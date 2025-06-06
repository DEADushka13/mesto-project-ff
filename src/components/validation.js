// // в файле validation.js описаны функции для валидации форм.
// // Из файла экспортируется только функция активации валидации
// // enableValidation и функция очистки ошибок валидации clearValidation;

const isValid = (
  formElement,
  inputElement,
  validationConfig,
  customValidation
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      validationConfig,
      inputElement.validationMessage
    );
  } else if (customValidation && customValidation(inputElement)) {
    showInputError(
      formElement,
      inputElement,
      validationConfig,
      customValidation(inputElement)
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const showInputError = (
  formElement,
  inputElement,
  validationConfig,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
};

const setEventListeners = (
  formElement,
  validationConfig,
  customValidations
) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  const checkFormState = () => {
    const submitButton = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    const isFormValid = inputList.every((inputElement) => {
      let customValidation = null;
      if (customValidations.has(inputElement)) {
        customValidation = customValidations.get(inputElement);
      }
      return (
        inputElement.validity.valid &&
        (!customValidation || customValidation(inputElement) === null)
      );
    });

    if (isFormValid) {
      disabledButton(submitButton, false, validationConfig);
      // submitButton.disabled = false;
      // submitButton.classList.remove(validationConfig.inactiveButtonClass);
    } else {
      disabledButton(submitButton, true, validationConfig);
      // submitButton.disabled = true;
      // submitButton.classList.add(validationConfig.inactiveButtonClass);
    }
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      let customValidation = null;
      if (customValidations.has(inputElement)) {
        customValidation = customValidations.get(inputElement);
      }
      isValid(formElement, inputElement, validationConfig, customValidation);
      checkFormState();
    });
  });
  checkFormState();
};

export const enableValidation = (
  validationConfig,
  customValidations = new Map()
) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig, customValidations);
  });
};

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  disabledButton(submitButton, true, validationConfig);
  // submitButton.disabled = true;
  // submitButton.classList.add(validationConfig.inactiveButtonClass);
}

function disabledButton(submitButton, isDisabled, validationConfig) {
  submitButton.disabled = isDisabled;
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

export function validateRegex(inputElement, regex, errorMessage) {
  if (regex.test(inputElement.value)) {
    return null;
  } else {
    return errorMessage;
  }
}

export function validateText(inputElement) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ \-]+$/;
  const errorMessage =
    "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
  return validateRegex(inputElement, regex, errorMessage);
}
