var e=require("fast-safe-stringify"),r=require("parse-json"),t=new Map,s={stringify:e,parse:function(e,s,a){var n="function"!=typeof s;return n&&t.has(e)?Promise.resolve(t.get(e)):new Promise(function(i,f){try{var o=r(e,s,a);n&&t.set(e,o),i(o)}catch(e){f(e)}})}};export{s as default};
//# sourceMappingURL=json.m.js.map
