export const dateConverter = (date) => {
  const dateTime = new Date(date);

  const year = dateTime.getFullYear();
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const day = ('0' + dateTime.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

export const decoreDate = (date: string, sep: string = ' ', decoreMonth = true) => {
  if (!date) {
    return 'нет данных';
  }

  const newFormatDate = date.split(' ')[0].split('.').reverse();
  if (decoreMonth) {
    newFormatDate[1] = getMonthName(+newFormatDate[1]);
  }
  return newFormatDate.join(sep);
};

export const getMonthName = (numberMonth: number) => {
  if (!numberMonth || !isFinite(numberMonth) || numberMonth > 12 || numberMonth === 0) {
    return 'января';
  }

  switch (numberMonth) {
    case 1:
      return 'января';
    case 2:
      return 'февраля';
    case 3:
      return 'марта';
    case 4:
      return 'апреля';
    case 5:
      return 'мая';
    case 6:
      return 'июня';
    case 7:
      return 'июля';
    case 8:
      return 'августа';
    case 9:
      return 'сентября';
    case 10:
      return 'октября';
    case 11:
      return 'ноября';
    case 12:
      return 'декабря';
    default:
      return 'января';
  }
};