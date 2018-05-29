var e=require("fast-safe-stringify"),r=require("parse-json"),s=new Map;module.exports={stringify:e,parse:function(e,t,i){return s.has(e)?Promise.resolve(s.get(e)):new Promise(function(n,a){try{var o=r(e,t,i);s.set(e,o),n(o)}catch(e){a(e)}})}};
//# sourceMappingURL=json.js.map
