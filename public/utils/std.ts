export const removeActive = (html) => {
  html?.classList.remove('active');
  html?.classList.add('noactive');
};
export const addActive = (html) => {
  html?.classList.add('active');
  html?.classList.remove('noactive');
};
