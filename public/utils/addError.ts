/**
 *
 * @param string текст ошибки
 * @param className название класса, куда вписывать текст ошибки
 */
export function returnError(string, className) {
  const errorElement = document.querySelector(`.${className}`);
  // @ts-ignore
  errorElement.classList.add('active');
  // @ts-ignore
  errorElement.textContent = string;
}
