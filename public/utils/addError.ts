/**
 *
 * @param string текст ошибки
 * @param className название класса, куда вписывать текст ошибки
 */
export const returnError = (string, className) => {
  const errorElement = document.querySelector(`.${className}`);
  if (errorElement) {
    // errorElement.classList.add('active');
    errorElement.textContent = string;
  }
};

export const insertText = (elements, text) => {
  if (Array.isArray(text)) {
    elements.forEach((element, index) => {
      element.textContent = text[index];
    });
  } else if (Array.isArray(elements)) {
    elements.forEach((element) => {
      element.textContent = text;
    });
  } else if (elements instanceof HTMLElement) {
    elements.textContent = text;
  } else {
    Object.entries(elements).forEach(([key, value]) => {
      elements[key].textContent = text;
    });
  }
};

export const insertInInput = (sourceDictionary, targetDictionary) => {
  for (const key in sourceDictionary) {
    if (targetDictionary.hasOwnProperty(key)) {
      sourceDictionary[key].value = targetDictionary[key];
    }
  }
};

export const removeErrors = (elements) => {
  Object.entries(elements).forEach(([key, value]) => {
    // @ts-ignore
    value.textContent = '';
  });
};

export const addErrorsActive = (elements) => {
  if (Array.isArray(elements)) {
    elements.forEach((element) => {
      element.classList.add('active');
    });
  } else if (elements instanceof HTMLElement) {
    elements.classList.add('active');
  } else {
    Object.keys(elements).forEach((key) => {
      const element = elements[key];
      element.classList.add('active');
    });
  }
};

export const removeErrorsActive = (elements) => {
  if (Array.isArray(elements)) {
    elements.forEach((element) => {
      element.classList.remove('active');
    });
  } else if (typeof elements === 'object') {
    Object.keys(elements).forEach((key) => {
      const element = elements[key];
      element.classList.remove('active');
    });
  } else {
    elements.classList.remove('active');
  }
};
