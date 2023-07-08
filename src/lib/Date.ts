const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];

export const readableDate = (date: Date) => {
  return `${date.getDate()}, ${months[date.getMonth()]} ${date.getUTCFullYear()}`;
};
