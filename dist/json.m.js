var e=require("fast-safe-stringify"),r=require("parse-json"),s=new Map;export default{stringify:e,parse:function(e,t,a){return s.has(e)?Promise.resolve(s.get(e)):new Promise(function(i,n){try{var f=r(e,t,a);s.set(e,f),i(f)}catch(e){n(e)}})}};
//# sourceMappingURL=json.m.js.map
