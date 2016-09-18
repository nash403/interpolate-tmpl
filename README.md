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
In browser you can also use the `interpolate` function. For that you need to import in your browser the `get-safe` module file **before** the 'interpolate-tmpl' module (via the `interpolate.browser.js` file).

**Note:** ES6 features are used so pay attention to the browser compatibility or use a transpiler like Babel or Traceur.
