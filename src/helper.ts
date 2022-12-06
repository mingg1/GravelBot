export const formatDate = (date: Date, time: Date) => {
  return `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}. ${date.toLocaleString('en-us', {
    weekday: 'short',
  })}. ${time.getHours() < 12 ? 'AM' : 'PM'} ${
    time.getHours() <= 12 ? time.getHours() : time.getHours() - 12
  }:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
};

export const parseDate = (dateString: string) => {
  const dateParams = dateString.replace('Z', '').split(/[\s-:]/);
  dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
  //@ts-ignore
  return new Date(Date.UTC(...dateParams));
};

export const formatArea = (area: number) => {
  const isKilo = area >= 1000;
  return `${isKilo ? (area / 1000).toFixed(2) : area.toFixed(2)}${
    isKilo ? ' km²' : ' m²'
  }`;
};
