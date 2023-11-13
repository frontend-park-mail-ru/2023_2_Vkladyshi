export const getCollection = (response) => {
  const haveFilms = checkFilms(Object.keys(response['body'].films));
  return Object.assign({}, response['body'], {
    haveFilms
  });
};

/**
 * Проверка на наличие фильмов
 * @param {list} films список фильмов
 * @return {boolean} результат наличия фильмов в списке
 */
export const checkFilms = (films) => {
  return films.length > 0;
};
