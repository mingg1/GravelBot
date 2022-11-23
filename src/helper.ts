export const formatDate = (date: Date, time: Date) => {
  return `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}. ${date.toLocaleString('en-us', {
    weekday: 'short',
  })}. ${time.getHours() < 12 ? 'AM' : 'PM'} ${
    time.getHours() <= 12 ? time.getHours() : time.getHours() - 12
  }:${time.getMinutes()}`;
};
