let interpolate = require('./interpolate');

var str = `
<div>
  <h1 class="{{ color}}">{{ title('Albert',Einstein  ) }}</h1>
  <p>Born on {{birthDate(March, 14, '1879')}}</p>
  <p>Died in {{ 'death.location' }}, {{ death.date }}</p>
</div>`;

var data = {
  color:"red",
  death: {
    location: "Princeton",
    date: "April 18, 1955"
  },
  title(firstname, lastname) {
    return `Mr. ${firstname} ${lastname}`;
  },
  birthDate(month, day, year) {
    return `${month} ${day}, ${year}`;
  }
};

console.log("Interpolated template :", interpolate(str, data) );
