const formatedNumber = (number) => String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

var prependZeros = (str, len=4, seperator) => {
  if (typeof str === 'number' || Number(str)) {
      str = str.toString();
      return (len - str.length > 0) ? new Array(len + 1 - str.length).join('0') + str : str;
  }
  else {
      var spl = str.split(seperator || ' ')
      for (var i = 0 ; i < spl.length; i++) {
          if (Number(spl[i]) && spl[i].length < len) {
              spl[i] = prependZeros(spl[i], len)
          }
      }
      return spl.join(seperator || ' ');
  }
};

const formatedDates = (number, keys) => {
  switch (keys) {
    case "id":
      ("# " + prependZeros(number));
      break;
    case "sum":
      (formatedNumber(number) + " рублей");
      break;
    case "contribution":
      (formatedNumber(number) + " рублей");
      break;
    case "term":
      (number + " лет");
      break;
    default:
      number;
  }
}

export {formatedNumber, prependZeros}
