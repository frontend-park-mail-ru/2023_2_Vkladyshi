export const dateConverter = (date) => {
  const dateTime = new Date(date);

  const year = dateTime.getFullYear();
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const day = ('0' + dateTime.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};
