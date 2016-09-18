let _ = require('get-safe');

function getRe(delimiter) {
  switch (delimiter) {
    case "<%%>":
      return /<%\s*([^<>%]*[^\s])\s*%>/g;
    case "<$$>":
      return /<\$\s*([^<>$]*[^\s])\s*\$>/g;
    case "<##>":
    return /<#\s*([^<>#]*[^\s])\s*#>/g;
    case "{{}}":
      return /\{\{\s*([^{}]*[^\s])\s*\}\}/g;
    case "[[]]":
      return /\[\[\s*([^\[\]]*[^\s])\s*\]\]/g;
    case "{}":
      return /\{\s*([^{}]*[^\s])\s*\}/g;
    case "[]":
      return /\[\s*([^\[\]]*[^\s])\s*\]/g;
    default:
      return /\{\{\s*([^{}]*[^\s])\s*\}\}/g;
  }
};

function normFnCall(call) {
  let call_cpy = call.slice();
  call_cpy = call_cpy.startsWith('"') || call_cpy.startsWith("'") ? call_cpy.slice(1,-1) : call_cpy;
  let re = /\(([^)]+)\)/g;
  let args = re.exec(call_cpy);
  return args ?
    { val: call_cpy.replace(re,'()'), args: args[1].split(',').map(v => { v = v.trim(); return parseInt(v) || (v.startsWith("\"")||v.startsWith("'")?v.slice(1,-1):v) ; }) }
    :
    { val: call_cpy, args: [] };
};

module.exports = (tmpl, data, delimiter) => {
  let re = delimiter ? getRe(delimiter) : /\{\{\s*([^{}]*[^\s])\s*\}\}/g;
  return tmpl.slice().replace(re, (match, key) => {
    let normKey = normFnCall(key);
    return _(normKey.val,data,...normKey.args) || match;
  });
};
