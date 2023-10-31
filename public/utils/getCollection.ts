export const getCollection = (response) => {
  const haveFilms = checkFilms(Object.keys(response['body'].films))
  return Object.assign({}, response['body'], {
    haveFilms
  })
}

export const getActorDescrition = () => {
  return {
    isHeader: true,
    header: 'Сильвестр Сталлоне',
    subHeader: 'Sylvester Stallone',
    row: [
      {
        rowName: 'Карьера:',
        rowText: 'Актер, Сценарист, Продюсер, Режиссер'
      },
      {
        rowName: 'Рост:',
        rowText: '1,77 м'
      },
      {
        rowName: 'Дата рождения:',
        rowText: '6 июля 1946 - 77 лет'
      },
      {
        rowName: 'Место рождения:',
        rowText: 'Нью-Йорк, США'
      },
      {
        rowName: 'Жанры:',
        rowText: 'боевик, драма, триллер'
      }
    ]
  }
}

/**
 * Проверка на наличие фильмов
 * @param {list} films список фильмов
 * @returns {boolean} результат наличия фильмов в списке
 */
export const checkFilms = (films) => {
  return films.length > 0
}
