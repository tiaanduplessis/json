var e=require("fast-safe-stringify"),r=require("parse-json"),s=new Map,t={stringify:e,parse:function(e,t,n){var i="function"!=typeof t;return i&&s.has(e)?Promise.resolve(s.get(e)):new Promise(function(a,o){try{var f=r(e,t,n);i&&s.set(e,f),a(f)}catch(e){o(e)}})}};module.exports=t;
//# sourceMappingURL=json.js.map
