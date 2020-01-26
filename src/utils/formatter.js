const pad = (number, width = 2, filling = "0") => {
  const numberStr = `${number}`;

  if (numberStr.length >= width) {
    return number;
  }

  const padding = new Array(width - numberStr.length + 1).join(filling);
  return `${padding}${numberStr}`;
};

const date = date => {
  const object = new Date(date);

  const day = object.getDate();
  const month = object.getMonth() + 1;
  const year = object.getFullYear();

  return `${pad(day)}/${pad(month)}/${year}`;
};

export { date };
