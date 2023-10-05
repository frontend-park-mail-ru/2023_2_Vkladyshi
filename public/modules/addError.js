/**
 * Функция возвращения ошибки
 * @param {string} string - входная строка
 */
export function returnError(string) {
  removeErrorNodes();

  const errorElement = document.querySelector('.errorString');
  errorElement.style.display = 'block';
  errorElement.textContent = string;
}

/**
 * Функция удаления узлов
 */
function removeErrorNodes() {
  const errorElement = document.querySelector('.errorString');
  errorElement.textContent = '';
}
