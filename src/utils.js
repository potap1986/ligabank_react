const formatedNumber = (number) => String(Math.round(number)).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

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
}

const pluralize = (n, words = ['год', 'года', 'лет']) => {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return words[2]; }
    if (n1 > 1 && n1 < 5) { return words[1]; }
    if (n1 === 1) { return words[0]; }
    return words[2];
}


export {formatedNumber, prependZeros, pluralize}
