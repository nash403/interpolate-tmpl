# interpolate-tmpl
#### Simple string interpolation.

Simple interpolation utility based on the JavaScript `RegExp`, `String#replace` and the npm module [`get-safe`](https://www.npmjs.com/package/get-safe "npm module get-safe") for safe access to nested properties.
***
#### Install:
`npm install interpolate-tmpl --save`

#### How to use
 ```JavaScript

let interpolate = require('interpolate-tmpl');

let str = `
<div>
 <h1 class="{{ color}}">{{ title('Albert',Einstein  ) }}</h1>
 <p>Born on {{birthDate(March, 14, '1879')}}</p>
 <p>Died in {{'death.location' }}, {{ death.date }}</p>
</div>`;

let data = {
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

console.log(interpolate(str, data, "{{}}") ); // Logs interpolated string
```

You can call functions with simple arguments (strings & integers only, no variable) and change the delimiter. Just pass the delimiter as a string to the interpolate function as the last parameter (default is `{{}}`).

**Supported delimiters are:** `{{}}`, `{}`, `[[]]`, `[]`, `<$$>`, `<##>`, `<%%>`.

***
The browser version adds a `interpolate` function to the window object.
