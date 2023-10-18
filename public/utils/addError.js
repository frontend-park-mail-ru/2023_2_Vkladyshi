/**
 *
 * @param string текст ошибки
 * @param className название класса, куда вписывать текст ошибки
 */
export function returnError(string, className) {
  const errorElement = document.querySelector(`.${className}`);
  errorElement.classList.add('active');
  errorElement.textContent = string;
}
