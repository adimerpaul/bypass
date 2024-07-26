import{u as P}from"./index.2a7f6c5f.js";import{P as $}from"./index.aa4d44c1.js";var I={},Rt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},pt={},A={};let at;const $t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];A.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};A.getSymbolTotalCodewords=function(t){return $t[t]};A.getBCHDigit=function(r){let t=0;for(;r!==0;)t++,r>>>=1;return t};A.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');at=t};A.isKanjiModeEnabled=function(){return typeof at!="undefined"};A.toSJIS=function(t){return at(t)};var j={};(function(r){r.L={bit:1},r.M={bit:0},r.Q={bit:3},r.H={bit:2};function t(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"l":case"low":return r.L;case"m":case"medium":return r.M;case"q":case"quartile":return r.Q;case"h":case"high":return r.H;default:throw new Error("Unknown EC Level: "+o)}}r.isValid=function(i){return i&&typeof i.bit!="undefined"&&i.bit>=0&&i.bit<4},r.from=function(i,e){if(r.isValid(i))return i;try{return t(i)}catch{return e}}})(j);function yt(){this.buffer=[],this.length=0}yt.prototype={get:function(r){const t=Math.floor(r/8);return(this.buffer[t]>>>7-r%8&1)===1},put:function(r,t){for(let o=0;o<t;o++)this.putBit((r>>>t-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(r){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),r&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Pt=yt;function H(r){if(!r||r<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=r,this.data=new Uint8Array(r*r),this.reservedBit=new Uint8Array(r*r)}H.prototype.set=function(r,t,o,i){const e=r*this.size+t;this.data[e]=o,i&&(this.reservedBit[e]=!0)};H.prototype.get=function(r,t){return this.data[r*this.size+t]};H.prototype.xor=function(r,t,o){this.data[r*this.size+t]^=o};H.prototype.isReserved=function(r,t){return this.reservedBit[r*this.size+t]};var Dt=H,Et={};(function(r){const t=A.getSymbolSize;r.getRowColCoords=function(i){if(i===1)return[];const e=Math.floor(i/7)+2,n=t(i),s=n===145?26:Math.ceil((n-13)/(2*e-2))*2,a=[n-7];for(let l=1;l<e-1;l++)a[l]=a[l-1]-s;return a.push(6),a.reverse()},r.getPositions=function(i){const e=[],n=r.getRowColCoords(i),s=n.length;for(let a=0;a<s;a++)for(let l=0;l<s;l++)a===0&&l===0||a===0&&l===s-1||a===s-1&&l===0||e.push([n[a],n[l]]);return e}})(Et);var wt={};const xt=A.getSymbolSize,ft=7;wt.getPositions=function(t){const o=xt(t);return[[0,0],[o-ft,0],[0,o-ft]]};var vt={};(function(r){r.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};r.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7},r.from=function(e){return r.isValid(e)?parseInt(e,10):void 0},r.getPenaltyN1=function(e){const n=e.size;let s=0,a=0,l=0,d=null,c=null;for(let y=0;y<n;y++){a=l=0,d=c=null;for(let u=0;u<n;u++){let h=e.get(y,u);h===d?a++:(a>=5&&(s+=t.N1+(a-5)),d=h,a=1),h=e.get(u,y),h===c?l++:(l>=5&&(s+=t.N1+(l-5)),c=h,l=1)}a>=5&&(s+=t.N1+(a-5)),l>=5&&(s+=t.N1+(l-5))}return s},r.getPenaltyN2=function(e){const n=e.size;let s=0;for(let a=0;a<n-1;a++)for(let l=0;l<n-1;l++){const d=e.get(a,l)+e.get(a,l+1)+e.get(a+1,l)+e.get(a+1,l+1);(d===4||d===0)&&s++}return s*t.N2},r.getPenaltyN3=function(e){const n=e.size;let s=0,a=0,l=0;for(let d=0;d<n;d++){a=l=0;for(let c=0;c<n;c++)a=a<<1&2047|e.get(d,c),c>=10&&(a===1488||a===93)&&s++,l=l<<1&2047|e.get(c,d),c>=10&&(l===1488||l===93)&&s++}return s*t.N3},r.getPenaltyN4=function(e){let n=0;const s=e.data.length;for(let l=0;l<s;l++)n+=e.data[l];return Math.abs(Math.ceil(n*100/s/5)-10)*t.N4};function o(i,e,n){switch(i){case r.Patterns.PATTERN000:return(e+n)%2===0;case r.Patterns.PATTERN001:return e%2===0;case r.Patterns.PATTERN010:return n%3===0;case r.Patterns.PATTERN011:return(e+n)%3===0;case r.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2===0;case r.Patterns.PATTERN101:return e*n%2+e*n%3===0;case r.Patterns.PATTERN110:return(e*n%2+e*n%3)%2===0;case r.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}r.applyMask=function(e,n){const s=n.size;for(let a=0;a<s;a++)for(let l=0;l<s;l++)n.isReserved(l,a)||n.xor(l,a,o(e,l,a))},r.getBestMask=function(e,n){const s=Object.keys(r.Patterns).length;let a=0,l=1/0;for(let d=0;d<s;d++){n(d),r.applyMask(d,e);const c=r.getPenaltyN1(e)+r.getPenaltyN2(e)+r.getPenaltyN3(e)+r.getPenaltyN4(e);r.applyMask(d,e),c<l&&(l=c,a=d)}return a}})(vt);var q={};const M=j,G=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],J=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];q.getBlocksCount=function(t,o){switch(o){case M.L:return G[(t-1)*4+0];case M.M:return G[(t-1)*4+1];case M.Q:return G[(t-1)*4+2];case M.H:return G[(t-1)*4+3];default:return}};q.getTotalCodewordsCount=function(t,o){switch(o){case M.L:return J[(t-1)*4+0];case M.M:return J[(t-1)*4+1];case M.Q:return J[(t-1)*4+2];case M.H:return J[(t-1)*4+3];default:return}};var Ct={},Z={};const k=new Uint8Array(512),K=new Uint8Array(256);(function(){let t=1;for(let o=0;o<255;o++)k[o]=t,K[t]=o,t<<=1,t&256&&(t^=285);for(let o=255;o<512;o++)k[o]=k[o-255]})();Z.log=function(t){if(t<1)throw new Error("log("+t+")");return K[t]};Z.exp=function(t){return k[t]};Z.mul=function(t,o){return t===0||o===0?0:k[K[t]+K[o]]};(function(r){const t=Z;r.mul=function(i,e){const n=new Uint8Array(i.length+e.length-1);for(let s=0;s<i.length;s++)for(let a=0;a<e.length;a++)n[s+a]^=t.mul(i[s],e[a]);return n},r.mod=function(i,e){let n=new Uint8Array(i);for(;n.length-e.length>=0;){const s=n[0];for(let l=0;l<e.length;l++)n[l]^=t.mul(e[l],s);let a=0;for(;a<n.length&&n[a]===0;)a++;n=n.slice(a)}return n},r.generateECPolynomial=function(i){let e=new Uint8Array([1]);for(let n=0;n<i;n++)e=r.mul(e,new Uint8Array([1,t.exp(n)]));return e}})(Ct);const Tt=Ct;function dt(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}dt.prototype.initialize=function(t){this.degree=t,this.genPoly=Tt.generateECPolynomial(this.degree)};dt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(t.length+this.degree);o.set(t);const i=Tt.mod(o,this.genPoly),e=this.degree-i.length;if(e>0){const n=new Uint8Array(this.degree);return n.set(i,e),n}return i};var Ot=dt,bt={},R={},ct={};ct.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var F={};const At="[0-9]+",Ut="[A-Z $%*+\\-./:]+";let V="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";V=V.replace(/u/g,"\\u");const zt="(?:(?![A-Z0-9 $%*+\\-./:]|"+V+`)(?:.|[\r
]))+`;F.KANJI=new RegExp(V,"g");F.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");F.BYTE=new RegExp(zt,"g");F.NUMERIC=new RegExp(At,"g");F.ALPHANUMERIC=new RegExp(Ut,"g");const _t=new RegExp("^"+V+"$"),kt=new RegExp("^"+At+"$"),Vt=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");F.testKanji=function(t){return _t.test(t)};F.testNumeric=function(t){return kt.test(t)};F.testAlphanumeric=function(t){return Vt.test(t)};(function(r){const t=ct,o=F;r.NUMERIC={id:"Numeric",bit:1<<0,ccBits:[10,12,14]},r.ALPHANUMERIC={id:"Alphanumeric",bit:1<<1,ccBits:[9,11,13]},r.BYTE={id:"Byte",bit:1<<2,ccBits:[8,16,16]},r.KANJI={id:"Kanji",bit:1<<3,ccBits:[8,10,12]},r.MIXED={bit:-1},r.getCharCountIndicator=function(n,s){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?n.ccBits[0]:s<27?n.ccBits[1]:n.ccBits[2]},r.getBestModeForData=function(n){return o.testNumeric(n)?r.NUMERIC:o.testAlphanumeric(n)?r.ALPHANUMERIC:o.testKanji(n)?r.KANJI:r.BYTE},r.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},r.isValid=function(n){return n&&n.bit&&n.ccBits};function i(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return r.NUMERIC;case"alphanumeric":return r.ALPHANUMERIC;case"kanji":return r.KANJI;case"byte":return r.BYTE;default:throw new Error("Unknown mode: "+e)}}r.from=function(n,s){if(r.isValid(n))return n;try{return i(n)}catch{return s}}})(R);(function(r){const t=A,o=q,i=j,e=R,n=ct,s=1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,a=t.getBCHDigit(s);function l(u,h,p){for(let E=1;E<=40;E++)if(h<=r.getCapacity(E,p,u))return E}function d(u,h){return e.getCharCountIndicator(u,h)+4}function c(u,h){let p=0;return u.forEach(function(E){p+=d(E.mode,h)+E.getBitsLength()}),p}function y(u,h){for(let p=1;p<=40;p++)if(c(u,p)<=r.getCapacity(p,h,e.MIXED))return p}r.from=function(h,p){return n.isValid(h)?parseInt(h,10):p},r.getCapacity=function(h,p,E){if(!n.isValid(h))throw new Error("Invalid QR Code version");typeof E=="undefined"&&(E=e.BYTE);const b=t.getSymbolTotalCodewords(h),f=o.getTotalCodewordsCount(h,p),w=(b-f)*8;if(E===e.MIXED)return w;const m=w-d(E,h);switch(E){case e.NUMERIC:return Math.floor(m/10*3);case e.ALPHANUMERIC:return Math.floor(m/11*2);case e.KANJI:return Math.floor(m/13);case e.BYTE:default:return Math.floor(m/8)}},r.getBestVersionForData=function(h,p){let E;const b=i.from(p,i.M);if(Array.isArray(h)){if(h.length>1)return y(h,b);if(h.length===0)return 1;E=h[0]}else E=h;return l(E.mode,E.getLength(),b)},r.getEncodedBits=function(h){if(!n.isValid(h)||h<7)throw new Error("Invalid QR Code version");let p=h<<12;for(;t.getBCHDigit(p)-a>=0;)p^=s<<t.getBCHDigit(p)-a;return h<<12|p}})(bt);var Bt={};const it=A,Nt=1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,Ht=1<<14|1<<12|1<<10|1<<4|1<<1,gt=it.getBCHDigit(Nt);Bt.getEncodedBits=function(t,o){const i=t.bit<<3|o;let e=i<<10;for(;it.getBCHDigit(e)-gt>=0;)e^=Nt<<it.getBCHDigit(e)-gt;return(i<<10|e)^Ht};var It={};const Gt=R;function x(r){this.mode=Gt.NUMERIC,this.data=r.toString()}x.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};x.prototype.getLength=function(){return this.data.length};x.prototype.getBitsLength=function(){return x.getBitsLength(this.data.length)};x.prototype.write=function(t){let o,i,e;for(o=0;o+3<=this.data.length;o+=3)i=this.data.substr(o,3),e=parseInt(i,10),t.put(e,10);const n=this.data.length-o;n>0&&(i=this.data.substr(o),e=parseInt(i,10),t.put(e,n*3+1))};var Jt=x;const Kt=R,W=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function O(r){this.mode=Kt.ALPHANUMERIC,this.data=r}O.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};O.prototype.getLength=function(){return this.data.length};O.prototype.getBitsLength=function(){return O.getBitsLength(this.data.length)};O.prototype.write=function(t){let o;for(o=0;o+2<=this.data.length;o+=2){let i=W.indexOf(this.data[o])*45;i+=W.indexOf(this.data[o+1]),t.put(i,11)}this.data.length%2&&t.put(W.indexOf(this.data[o]),6)};var Yt=O,jt=function(t){for(var o=[],i=t.length,e=0;e<i;e++){var n=t.charCodeAt(e);if(n>=55296&&n<=56319&&i>e+1){var s=t.charCodeAt(e+1);s>=56320&&s<=57343&&(n=(n-55296)*1024+s-56320+65536,e+=1)}if(n<128){o.push(n);continue}if(n<2048){o.push(n>>6|192),o.push(n&63|128);continue}if(n<55296||n>=57344&&n<65536){o.push(n>>12|224),o.push(n>>6&63|128),o.push(n&63|128);continue}if(n>=65536&&n<=1114111){o.push(n>>18|240),o.push(n>>12&63|128),o.push(n>>6&63|128),o.push(n&63|128);continue}o.push(239,191,189)}return new Uint8Array(o).buffer};const qt=jt,Zt=R;function U(r){this.mode=Zt.BYTE,typeof r=="string"&&(r=qt(r)),this.data=new Uint8Array(r)}U.getBitsLength=function(t){return t*8};U.prototype.getLength=function(){return this.data.length};U.prototype.getBitsLength=function(){return U.getBitsLength(this.data.length)};U.prototype.write=function(r){for(let t=0,o=this.data.length;t<o;t++)r.put(this.data[t],8)};var Qt=U;const Xt=R,Wt=A;function z(r){this.mode=Xt.KANJI,this.data=r}z.getBitsLength=function(t){return t*13};z.prototype.getLength=function(){return this.data.length};z.prototype.getBitsLength=function(){return z.getBitsLength(this.data.length)};z.prototype.write=function(r){let t;for(t=0;t<this.data.length;t++){let o=Wt.toSJIS(this.data[t]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),r.put(o,13)}};var te=z,Ft={exports:{}};(function(r){var t={single_source_shortest_paths:function(o,i,e){var n={},s={};s[i]=0;var a=t.PriorityQueue.make();a.push(i,0);for(var l,d,c,y,u,h,p,E,b;!a.empty();){l=a.pop(),d=l.value,y=l.cost,u=o[d]||{};for(c in u)u.hasOwnProperty(c)&&(h=u[c],p=y+h,E=s[c],b=typeof s[c]=="undefined",(b||E>p)&&(s[c]=p,a.push(c,p),n[c]=d))}if(typeof e!="undefined"&&typeof s[e]=="undefined"){var f=["Could not find a path from ",i," to ",e,"."].join("");throw new Error(f)}return n},extract_shortest_path_from_predecessor_list:function(o,i){for(var e=[],n=i;n;)e.push(n),o[n],n=o[n];return e.reverse(),e},find_path:function(o,i,e){var n=t.single_source_shortest_paths(o,i,e);return t.extract_shortest_path_from_predecessor_list(n,e)},PriorityQueue:{make:function(o){var i=t.PriorityQueue,e={},n;o=o||{};for(n in i)i.hasOwnProperty(n)&&(e[n]=i[n]);return e.queue=[],e.sorter=o.sorter||i.default_sorter,e},default_sorter:function(o,i){return o.cost-i.cost},push:function(o,i){var e={value:o,cost:i};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};r.exports=t})(Ft);(function(r){const t=R,o=Jt,i=Yt,e=Qt,n=te,s=F,a=A,l=Ft.exports;function d(f){return unescape(encodeURIComponent(f)).length}function c(f,w,m){const g=[];let v;for(;(v=f.exec(m))!==null;)g.push({data:v[0],index:v.index,mode:w,length:v[0].length});return g}function y(f){const w=c(s.NUMERIC,t.NUMERIC,f),m=c(s.ALPHANUMERIC,t.ALPHANUMERIC,f);let g,v;return a.isKanjiModeEnabled()?(g=c(s.BYTE,t.BYTE,f),v=c(s.KANJI,t.KANJI,f)):(g=c(s.BYTE_KANJI,t.BYTE,f),v=[]),w.concat(m,g,v).sort(function(T,B){return T.index-B.index}).map(function(T){return{data:T.data,mode:T.mode,length:T.length}})}function u(f,w){switch(w){case t.NUMERIC:return o.getBitsLength(f);case t.ALPHANUMERIC:return i.getBitsLength(f);case t.KANJI:return n.getBitsLength(f);case t.BYTE:return e.getBitsLength(f)}}function h(f){return f.reduce(function(w,m){const g=w.length-1>=0?w[w.length-1]:null;return g&&g.mode===m.mode?(w[w.length-1].data+=m.data,w):(w.push(m),w)},[])}function p(f){const w=[];for(let m=0;m<f.length;m++){const g=f[m];switch(g.mode){case t.NUMERIC:w.push([g,{data:g.data,mode:t.ALPHANUMERIC,length:g.length},{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.ALPHANUMERIC:w.push([g,{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.KANJI:w.push([g,{data:g.data,mode:t.BYTE,length:d(g.data)}]);break;case t.BYTE:w.push([{data:g.data,mode:t.BYTE,length:d(g.data)}])}}return w}function E(f,w){const m={},g={start:{}};let v=["start"];for(let C=0;C<f.length;C++){const T=f[C],B=[];for(let S=0;S<T.length;S++){const N=T[S],_=""+C+S;B.push(_),m[_]={node:N,lastCount:0},g[_]={};for(let X=0;X<v.length;X++){const L=v[X];m[L]&&m[L].node.mode===N.mode?(g[L][_]=u(m[L].lastCount+N.length,N.mode)-u(m[L].lastCount,N.mode),m[L].lastCount+=N.length):(m[L]&&(m[L].lastCount=N.length),g[L][_]=u(N.length,N.mode)+4+t.getCharCountIndicator(N.mode,w))}}v=B}for(let C=0;C<v.length;C++)g[v[C]].end=0;return{map:g,table:m}}function b(f,w){let m;const g=t.getBestModeForData(f);if(m=t.from(w,g),m!==t.BYTE&&m.bit<g.bit)throw new Error('"'+f+'" cannot be encoded with mode '+t.toString(m)+`.
 Suggested mode is: `+t.toString(g));switch(m===t.KANJI&&!a.isKanjiModeEnabled()&&(m=t.BYTE),m){case t.NUMERIC:return new o(f);case t.ALPHANUMERIC:return new i(f);case t.KANJI:return new n(f);case t.BYTE:return new e(f)}}r.fromArray=function(w){return w.reduce(function(m,g){return typeof g=="string"?m.push(b(g,null)):g.data&&m.push(b(g.data,g.mode)),m},[])},r.fromString=function(w,m){const g=y(w,a.isKanjiModeEnabled()),v=p(g),C=E(v,m),T=l.find_path(C.map,"start","end"),B=[];for(let S=1;S<T.length-1;S++)B.push(C.table[T[S]].node);return r.fromArray(h(B))},r.rawSplit=function(w){return r.fromArray(y(w,a.isKanjiModeEnabled()))}})(It);const Q=A,tt=j,ee=Pt,ne=Dt,oe=Et,ie=wt,rt=vt,st=q,re=Ot,Y=bt,se=Bt,le=R,et=It;function ae(r,t){const o=r.size,i=ie.getPositions(t);for(let e=0;e<i.length;e++){const n=i[e][0],s=i[e][1];for(let a=-1;a<=7;a++)if(!(n+a<=-1||o<=n+a))for(let l=-1;l<=7;l++)s+l<=-1||o<=s+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?r.set(n+a,s+l,!0,!0):r.set(n+a,s+l,!1,!0))}}function de(r){const t=r.size;for(let o=8;o<t-8;o++){const i=o%2===0;r.set(o,6,i,!0),r.set(6,o,i,!0)}}function ce(r,t){const o=oe.getPositions(t);for(let i=0;i<o.length;i++){const e=o[i][0],n=o[i][1];for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s===-2||s===2||a===-2||a===2||s===0&&a===0?r.set(e+s,n+a,!0,!0):r.set(e+s,n+a,!1,!0)}}function ue(r,t){const o=r.size,i=Y.getEncodedBits(t);let e,n,s;for(let a=0;a<18;a++)e=Math.floor(a/3),n=a%3+o-8-3,s=(i>>a&1)===1,r.set(e,n,s,!0),r.set(n,e,s,!0)}function nt(r,t,o){const i=r.size,e=se.getEncodedBits(t,o);let n,s;for(n=0;n<15;n++)s=(e>>n&1)===1,n<6?r.set(n,8,s,!0):n<8?r.set(n+1,8,s,!0):r.set(i-15+n,8,s,!0),n<8?r.set(8,i-n-1,s,!0):n<9?r.set(8,15-n-1+1,s,!0):r.set(8,15-n-1,s,!0);r.set(i-8,8,1,!0)}function he(r,t){const o=r.size;let i=-1,e=o-1,n=7,s=0;for(let a=o-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!r.isReserved(e,a-l)){let d=!1;s<t.length&&(d=(t[s]>>>n&1)===1),r.set(e,a-l,d),n--,n===-1&&(s++,n=7)}if(e+=i,e<0||o<=e){e-=i,i=-i;break}}}function fe(r,t,o){const i=new ee;o.forEach(function(l){i.put(l.mode.bit,4),i.put(l.getLength(),le.getCharCountIndicator(l.mode,r)),l.write(i)});const e=Q.getSymbolTotalCodewords(r),n=st.getTotalCodewordsCount(r,t),s=(e-n)*8;for(i.getLengthInBits()+4<=s&&i.put(0,4);i.getLengthInBits()%8!==0;)i.putBit(0);const a=(s-i.getLengthInBits())/8;for(let l=0;l<a;l++)i.put(l%2?17:236,8);return ge(i,r,t)}function ge(r,t,o){const i=Q.getSymbolTotalCodewords(t),e=st.getTotalCodewordsCount(t,o),n=i-e,s=st.getBlocksCount(t,o),a=i%s,l=s-a,d=Math.floor(i/s),c=Math.floor(n/s),y=c+1,u=d-c,h=new re(u);let p=0;const E=new Array(s),b=new Array(s);let f=0;const w=new Uint8Array(r.buffer);for(let T=0;T<s;T++){const B=T<l?c:y;E[T]=w.slice(p,p+B),b[T]=h.encode(E[T]),p+=B,f=Math.max(f,B)}const m=new Uint8Array(i);let g=0,v,C;for(v=0;v<f;v++)for(C=0;C<s;C++)v<E[C].length&&(m[g++]=E[C][v]);for(v=0;v<u;v++)for(C=0;C<s;C++)m[g++]=b[C][v];return m}function me(r,t,o,i){let e;if(Array.isArray(r))e=et.fromArray(r);else if(typeof r=="string"){let d=t;if(!d){const c=et.rawSplit(r);d=Y.getBestVersionForData(c,o)}e=et.fromString(r,d||40)}else throw new Error("Invalid data");const n=Y.getBestVersionForData(e,o);if(!n)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=n;else if(t<n)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+n+`.
`);const s=fe(t,o,e),a=Q.getSymbolSize(t),l=new ne(a);return ae(l,t),de(l),ce(l,t),nt(l,o,0),t>=7&&ue(l,t),he(l,s),isNaN(i)&&(i=rt.getBestMask(l,nt.bind(null,l,o))),rt.applyMask(i,l),nt(l,o,i),{modules:l,version:t,errorCorrectionLevel:o,maskPattern:i,segments:e}}pt.create=function(t,o){if(typeof t=="undefined"||t==="")throw new Error("No input text");let i=tt.M,e,n;return typeof o!="undefined"&&(i=tt.from(o.errorCorrectionLevel,tt.M),e=Y.from(o.version),n=rt.from(o.maskPattern),o.toSJISFunc&&Q.setToSJISFunction(o.toSJISFunc)),me(t,e,i,n)};var Lt={},ut={};(function(r){function t(o){if(typeof o=="number"&&(o=o.toString()),typeof o!="string")throw new Error("Color should be defined as hex string");let i=o.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+o);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(n){return[n,n]}))),i.length===6&&i.push("F","F");const e=parseInt(i.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+i.slice(0,6).join("")}}r.getOptions=function(i){i||(i={}),i.color||(i.color={});const e=typeof i.margin=="undefined"||i.margin===null||i.margin<0?4:i.margin,n=i.width&&i.width>=21?i.width:void 0,s=i.scale||4;return{width:n,scale:n?4:s,margin:e,color:{dark:t(i.color.dark||"#000000ff"),light:t(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},r.getScale=function(i,e){return e.width&&e.width>=i+e.margin*2?e.width/(i+e.margin*2):e.scale},r.getImageWidth=function(i,e){const n=r.getScale(i,e);return Math.floor((i+e.margin*2)*n)},r.qrToImageData=function(i,e,n){const s=e.modules.size,a=e.modules.data,l=r.getScale(s,n),d=Math.floor((s+n.margin*2)*l),c=n.margin*l,y=[n.color.light,n.color.dark];for(let u=0;u<d;u++)for(let h=0;h<d;h++){let p=(u*d+h)*4,E=n.color.light;if(u>=c&&h>=c&&u<d-c&&h<d-c){const b=Math.floor((u-c)/l),f=Math.floor((h-c)/l);E=y[a[b*s+f]?1:0]}i[p++]=E.r,i[p++]=E.g,i[p++]=E.b,i[p]=E.a}}})(ut);(function(r){const t=ut;function o(e,n,s){e.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=s,n.width=s,n.style.height=s+"px",n.style.width=s+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}r.render=function(n,s,a){let l=a,d=s;typeof l=="undefined"&&(!s||!s.getContext)&&(l=s,s=void 0),s||(d=i()),l=t.getOptions(l);const c=t.getImageWidth(n.modules.size,l),y=d.getContext("2d"),u=y.createImageData(c,c);return t.qrToImageData(u.data,n,l),o(y,d,c),y.putImageData(u,0,0),d},r.renderToDataURL=function(n,s,a){let l=a;typeof l=="undefined"&&(!s||!s.getContext)&&(l=s,s=void 0),l||(l={});const d=r.render(n,s,l),c=l.type||"image/png",y=l.rendererOpts||{};return d.toDataURL(c,y.quality)}})(Lt);var St={};const pe=ut;function mt(r,t){const o=r.a/255,i=t+'="'+r.hex+'"';return o<1?i+" "+t+'-opacity="'+o.toFixed(2).slice(1)+'"':i}function ot(r,t,o){let i=r+t;return typeof o!="undefined"&&(i+=" "+o),i}function ye(r,t,o){let i="",e=0,n=!1,s=0;for(let a=0;a<r.length;a++){const l=Math.floor(a%t),d=Math.floor(a/t);!l&&!n&&(n=!0),r[a]?(s++,a>0&&l>0&&r[a-1]||(i+=n?ot("M",l+o,.5+d+o):ot("m",e,0),e=0,n=!1),l+1<t&&r[a+1]||(i+=ot("h",s),s=0)):e++}return i}St.render=function(t,o,i){const e=pe.getOptions(o),n=t.modules.size,s=t.modules.data,a=n+e.margin*2,l=e.color.light.a?"<path "+mt(e.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",d="<path "+mt(e.color.dark,"stroke")+' d="'+ye(s,n,e.margin)+'"/>',c='viewBox="0 0 '+a+" "+a+'"',y=e.width?'width="'+e.width+'" height="'+e.width+'" ':"",u='<svg xmlns="http://www.w3.org/2000/svg" '+y+c+' shape-rendering="crispEdges">'+l+d+`</svg>
`;return typeof i=="function"&&i(null,u),u};const Ee=Rt,lt=pt,Mt=Lt,we=St;function ht(r,t,o,i,e){const n=[].slice.call(arguments,1),s=n.length,a=typeof n[s-1]=="function";if(!a&&!Ee())throw new Error("Callback required as last argument");if(a){if(s<2)throw new Error("Too few arguments provided");s===2?(e=o,o=t,t=i=void 0):s===3&&(t.getContext&&typeof e=="undefined"?(e=i,i=void 0):(e=i,i=o,o=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(o=t,t=i=void 0):s===2&&!t.getContext&&(i=o,o=t,t=void 0),new Promise(function(l,d){try{const c=lt.create(o,i);l(r(c,t,i))}catch(c){d(c)}})}try{const l=lt.create(o,i);e(null,r(l,t,i))}catch(l){e(l)}}I.create=lt.create;I.toCanvas=ht.bind(null,Mt.render);I.toDataURL=ht.bind(null,Mt.renderToDataURL);I.toString=ht.bind(null,function(r,t,o){return we.render(r,o)});class ve{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","diecis\xE9is"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(t){switch(typeof t=="number"&&(t=String(t)),t=this.deleteZerosLeft(t),t){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inv\xE1lido"}}convertToText(t){if(typeof t=="number"&&(t=String(t)),t=this.deleteZerosLeft(t),!this.validateNumber(t))throw"N\xFAmero inv\xE1lido, no se puede convertir!";return this.getName(t)}deleteZerosLeft(t){let o=0,i=!0;for(o=0;o<t.length;o++)if(t.charAt(o)!=0){i=!1;break}return i?"0":t.substr(o)}validateNumber(t){return!(isNaN(t)||t===""||t.indexOf(".")>=0||t.indexOf("-")>=0)}getName(t){return t=this.deleteZerosLeft(t),t.length===1?this.getUnits(t):t.length===2?this.getTens(t):t.length===3?this.getHundreds(t):t.length<7?this.getThousands(t):t.length<13?this.getPeriod(t,6,"mill\xF3n"):t.length<19?this.getPeriod(t,12,"bill\xF3n"):"N\xFAmero demasiado grande."}getUnits(t){let o=parseInt(t);return this.units[o]}getTens(t){let o=t.charAt(1);if(t<17)return this.tenToSixteen[t-10];if(t<20)return"dieci"+this.getUnits(o);switch(t){case"20":return"veinte";case"22":return"veintid\xF3s";case"23":return"veintitr\xE9s";case"26":return"veintis\xE9is"}if(t<30)return"veinti"+this.getUnits(o);let i=this.tens[t.charAt(0)-3];return o>0&&(i+=" y "+this.getUnits(o)),i}getHundreds(t){let o="",i=t.charAt(0),e=t.substr(1);if(t==100)return"cien";switch(i){case"1":o="ciento";break;case"5":o="quinientos";break;case"7":o="setecientos";break;case"9":o="novecientos"}return o===""&&(o=this.getUnits(i)+"cientos"),e>0&&(o+=" "+this.getName(e)),o}getThousands(t){let o="mil",i=t.length-3,e=t.substr(0,i),n=t.substr(i);return e>1&&(o=this.getName(e).replace("uno","un")+" mil"),n>0&&(o+=" "+this.getName(n)),o}getPeriod(t,o,i){let e="un "+i,n=t.length-o,s=t.substr(0,n),a=t.substr(n);return s>1&&(e=this.getName(s).replace("uno","un")+" "+i.replace("\xF3","o")+"es"),a>0&&(e+=" "+this.getName(a)),e}}var D={conversorNumerosALetras:ve};class be{static factura(t){return new Promise((o,i)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.montoTotal)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(l.url2+"consulta/QR?nit="+l.nit+"&cuf="+t.cuf+"&numero="+t.numeroFactura+"&t=2",a).then(d=>{let c=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
      <div class='titulo'>FACTURA <br>CON DERECHO A CREDITO FISCAL</div>
      <div class='titulo2'>${l.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${l.direccion}<br>
Tel. ${l.telefono}<br>
Oruro</div>
<hr>
<div class='titulo'>NIT</div>
<div class='titulo2'>${l.nit}</div>
<div class='titulo'>FACTURA N\xB0</div>
<div class='titulo2'>${t.numeroFactura}</div>
<div class='titulo'>C\xD3D. AUTORIZACI\xD3N</div>
<div class='titulo2'>${t.cuf}</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZ\xD3N SOCIAL:</td><td class='contenido'>${t.client.nombreRazonSocial}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client.numeroDocumento}</td></tr>
<tr><td class='titder'>COD. CLIENTE:</td ><td class='contenido'>${t.client.id}</td></tr>
<tr><td class='titder'>FECHA DE EMISI\xD3N:</td><td class='contenido'>${t.fechaEmision}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(u=>{c+=`<div style='font-size: 12px'><b>${u.product_id} ${u.descripcion} </b></div>`,c+=`<div>${u.cantidad} ${parseFloat(u.precioUnitario).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subTotal).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td ><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder' style='font-size: 8px'>IMPORTE BASE CR\xC9DITO FISCAL Bs</td>
      <td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.montoTotal)-Math.floor(parseFloat(t.montoTotal)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div class='titulo2' style='font-size: 9px'>
      ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PA\xCDS,<br>
      EL USO IL\xCDCITO SER\xC1 SANCIONADO PENALMENTE DE<br>
      ACUERDO A LEY<br><br>
      ${t.leyenda} <br><br>
      \u201CEste documento es la Representaci\xF3n Gr\xE1fica de un<br>
      Documento Fiscal Digital emitido en una modalidad de<br>
      facturaci\xF3n en l\xEDnea\u201D</div><br>
      <div style='display: flex;justify-content: center;'> <img  src="${d}" ></div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new $().print(document.getElementById("myElement")),o(d)}).catch(d=>{i(d)})})}static nota(t){return console.log("factura",t),new Promise((o,i)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,a).then(d=>{let c=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo2.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE VENTA"}</div>
      <div class='titulo2'>${l.razon} <br>
${l.direccion}<br>
Tel. ${l.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZ\xD3N SOCIAL:</td><td class='contenido'>${t.client?t.client.nombre:""}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client?t.client.nit:""}</td></tr>
<tr><td class='titder'>FECHA DE EMISI\xD3N:</td><td class='contenido'>${t.fecha_emision}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(u=>{c+=`<div style='font-size: 12px'><b> ${u.producto} </b></div>`,c+=`<div><span style='font-size: 18px;font-weight: bold'>${u.cantidad}</span> ${parseFloat(u.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.total).toFixed(2)}</span></div>`}),c+=`<hr>
<div>${t.comentario===""||t.comentario===null?"":"Comentario: "+t.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${d}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new $().print(document.getElementById("myElement")),o(d)}).catch(d=>{i(d)})})}static notaCompra(t){return console.log("factura",t),new Promise((o,i)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,a).then(async d=>{let c=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE COMPRA"}</div>
      <div class='titulo2'>${l.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${l.direccion}<br>
Tel. ${l.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZ\xD3N SOCIAL:</td><td class='contenido'>${t.client?t.client.nombre:""}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client?t.client.nit:""}</td></tr>
<!--<tr><td class='titder'>FECHA DE EMISI\xD3N:</td><td class='contenido'>${t.fecha_emision}</td></tr>-->
</table><hr><div class='titulo'>DETALLE</div>`;t.buy_details.forEach(u=>{c+=`<div style='font-size: 12px'><b>${u.nombre} </b></div>`,c+=`<div><span style='font-size: 14px;font-weight: bold'>${u.cantidad}</span> ${parseFloat(u.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subtotal).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${d}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new $().print(document.getElementById("myElement")),o(d)}).catch(d=>{i(d)})})}static reportTotal(t,o){const i=t.filter(s=>s.tipoVenta==="Ingreso").reduce((s,a)=>s+a.montoTotal,0),e=t.filter(s=>s.tipoVenta==="Egreso").reduce((s,a)=>s+a.montoTotal,0),n=i-e;return console.log("montoTotal",n),new Promise((s,a)=>{const l=D.conversorNumerosALetras,d=new l,c=Math.abs(n),y=d.convertToText(parseInt(c)),u={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=P().env;I.toDataURL(` Monto: ${parseFloat(n).toFixed(2)}`,u).then(p=>{let E=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>title</div>
      <div class='titulo2'>${h.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${h.direccion}<br>
Tel. ${h.telefono}<br>
Oruro</div>
<hr>
<table>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(f=>{E+=`<div style='font-size: 12px'><b> ${f.user.name} </b></div>`,E+=`<div> ${parseFloat(f.montoTotal).toFixed(2)} ${f.tipoVenta}
          <span style='float:right'> ${f.tipoVenta==="Egreso"?"-":""} ${parseFloat(f.montoTotal).toFixed(2)}</span></div>`}),E+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${y} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${p}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=E,new $().print(document.getElementById("myElement")),s(p)}).catch(p=>{a(p)})})}static reciboCompra(t){return new Promise((o,i)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,a).then(d=>{let c=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE COMPRA</div>
      <div class='titulo2'>${l.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${l.direccion}<br>
    Tel. ${l.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;c+=`<div style='font-size: 12px'><b>${t.product_id} ${t.product.descripcion} </b></div>`,c+=`<div>${t.quantity} ${parseFloat(t.price).toFixed(2)} 0.00
          //           <span style='float:right'>${parseFloat(t.total).toFixed(2)}</span></div>`,c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${d}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=c,new $().print(document.getElementById("myElement")),o(d)}).catch(d=>{i(d)})})}static reciboTranferencia(t,o,i,e){return console.log("producto",t,"de",o,"ha",i,"cantidad",e),new Promise((n,s)=>{const a=D.conversorNumerosALetras,d=new a().convertToText(parseInt(e)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},y=P().env;I.toDataURL(`de: ${o} A: ${i}`,c).then(u=>{let h=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${y.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${y.direccion}<br>
    Tel. ${y.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;h+=`<div style='font-size: 12px'><b>Producto: ${t} de Sucursal${o} a ${i} </b></div>`,h+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${e+""}</td></tr>
      </table>
      <br>
      <div>Son ${d+""} ${e+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${u}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=h,new $().print(document.getElementById("myElement")),n(u)}).catch(u=>{s(u)})})}static recibo(t){var d,c;let o="";const i=t.type;let e="",n=0,s="";i=="INGRESO"?(t.comment==null&&(t.comment=""),s="<table class='tab2'><tr><th>CANT</th><th>DETALLE</th><th>P/U</th><th>TOTAL</th></tr>",t.details.forEach(y=>{y.price==0?e+="<tr><td></td><td>"+y.product+"</td><td></td><td></td></tr>":e+="<tr><td>"+y.quantity+"</td><td>"+y.product+"</td><td>"+y.price+"</td><td>"+y.subtotal+"</td></tr>",n+=parseFloat(y.subtotal)}),s+=e,s+="<tr><td></td><td></td><td><b>TOTAL:</b></td><td>"+n.toFixed(2)+"</td></tr></table>"):(s="<table class='tab2'><tr><th>DESCRIPCION</th><th>PROVEEDOR</th><th>TOTAL</th></tr>",e+="<tr><td>"+t.descripcion+"</td><td>"+((d=t.client)==null?void 0:d.name)+"</td><td>"+t.total+"</td></tr>",s+=e,s+="<tr><td></td><td><b>TOTAL:</b></td><td>"+t.total+"</td></tr></table>");let a="";t.mesa!="MESA"&&(a="font-size:25px; font-weight:bold;font-style: italic;"),o=`<style>
    .imagen{
      width:60%
    }
    .titulo1 {
    text-align:center;
    font-weight:bold;
    font-size:14px;
    }
    .titulo2 {
    text-align:center;
    font-weight:bold;
    font-size:12px;
    }
    .tab1{
    width:100%;
    text-align:center;
    font-weight:bold;
    font-size:12px;
    }
    .tab2{
    width:100%;
    font-size:12px;
    border-collapse: collapse;
    }
    .tab2  th{
    border: .1px solid;
    }
    .numero{
    text-align:right;
    font-weight:bold;
    font-size:30px;}
    .pie{
    text-align:center;
    font-size:8px;}
    </style>
    <div style="padding: 0.0cm 0.3cm 0.0cm 0.3cm;  font-family:Verdana, sans-serif;">
       ${i=="INGRESO"&&parseInt(t.name)>0?'<div class="numero">'+t.name+"</div>":""}
      <div style='text-align:center'><img class='imagen' src="logo2.png" width="70" ></div>
      <div class='titulo1'>
      ${i=="INGRESO"?"CONTACTOS: 76130006":"RECIBO DE EGRESO"}
      </div>
      <div class='titulo2'>AV. TACNA ENTRE JAEN Y TOMAS FRIAS</div>
      <table class='tab1'><tr><td>`+t.date+"</td><td>"+t.time+`</td></tr></table><br>
      ${s}
      ${i=="INGRESO"?'<div class="pie" style="text-align: right;font-weight: bold;font-size: 15px">TICKET '+t.numero+' <span style="'+a+'">'+t.mesa+"</span></div>":"<br>"}
       ${i=="INGRESO"?"<div>"+t.comment+"</div>":""}
       ${i=="INGRESO"?'<div class="pie">GRACIAS POR SU COMPRA, BUEN PROVECHO</div>':""}
      <div class='pie' style="text-align: left;font-weight: bold;">Usuario: ${(c=t.user)==null?void 0:c.name} </div>
    </div>`,document.getElementById("myelement").innerHTML=o,new $().print(document.getElementById("myelement"))}static head(){return`<html>
<style>
      .titulo{
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      }
      .titulo2{
      font-size: 10px;
      text-align: center;
      }
            .titulo3{
      font-size: 10px;
      text-align: center;
      width:70%;
      }
            .contenido{
      font-size: 10px;
      text-align: left;
      }
      .conte2{
      font-size: 10px;
      text-align: right;
      }
      .titder{
      font-size: 12px;
      text-align: right;
      font-weight: bold;
      }
      hr{
  border-top: 1px dashed   ;
}
  table{
    width:100%
  }
  h1 {
    color: black;
    font-family: sans-serif;
  }
  </style>
<body>
<div style="width: 300px;">`}}export{be as I};
