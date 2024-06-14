import{u as P}from"./index.132823aa.js";import{P as $}from"./index.aa4d44c1.js";var I={},Rt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},pt={},b={};let at;const $t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];b.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};b.getSymbolTotalCodewords=function(t){return $t[t]};b.getBCHDigit=function(i){let t=0;for(;i!==0;)t++,i>>>=1;return t};b.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');at=t};b.isKanjiModeEnabled=function(){return typeof at!="undefined"};b.toSJIS=function(t){return at(t)};var j={};(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+o)}}i.isValid=function(r){return r&&typeof r.bit!="undefined"&&r.bit>=0&&r.bit<4},i.from=function(r,e){if(i.isValid(r))return r;try{return t(r)}catch{return e}}})(j);function yt(){this.buffer=[],this.length=0}yt.prototype={get:function(i){const t=Math.floor(i/8);return(this.buffer[t]>>>7-i%8&1)===1},put:function(i,t){for(let o=0;o<t;o++)this.putBit((i>>>t-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(i){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),i&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Pt=yt;function V(i){if(!i||i<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=i,this.data=new Uint8Array(i*i),this.reservedBit=new Uint8Array(i*i)}V.prototype.set=function(i,t,o,r){const e=i*this.size+t;this.data[e]=o,r&&(this.reservedBit[e]=!0)};V.prototype.get=function(i,t){return this.data[i*this.size+t]};V.prototype.xor=function(i,t,o){this.data[i*this.size+t]^=o};V.prototype.isReserved=function(i,t){return this.reservedBit[i*this.size+t]};var Dt=V,Et={};(function(i){const t=b.getSymbolSize;i.getRowColCoords=function(r){if(r===1)return[];const e=Math.floor(r/7)+2,n=t(r),s=n===145?26:Math.ceil((n-13)/(2*e-2))*2,a=[n-7];for(let l=1;l<e-1;l++)a[l]=a[l-1]-s;return a.push(6),a.reverse()},i.getPositions=function(r){const e=[],n=i.getRowColCoords(r),s=n.length;for(let a=0;a<s;a++)for(let l=0;l<s;l++)a===0&&l===0||a===0&&l===s-1||a===s-1&&l===0||e.push([n[a],n[l]]);return e}})(Et);var wt={};const xt=b.getSymbolSize,ft=7;wt.getPositions=function(t){const o=xt(t);return[[0,0],[o-ft,0],[0,o-ft]]};var vt={};(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7},i.from=function(e){return i.isValid(e)?parseInt(e,10):void 0},i.getPenaltyN1=function(e){const n=e.size;let s=0,a=0,l=0,c=null,d=null;for(let w=0;w<n;w++){a=l=0,c=d=null;for(let u=0;u<n;u++){let h=e.get(w,u);h===c?a++:(a>=5&&(s+=t.N1+(a-5)),c=h,a=1),h=e.get(u,w),h===d?l++:(l>=5&&(s+=t.N1+(l-5)),d=h,l=1)}a>=5&&(s+=t.N1+(a-5)),l>=5&&(s+=t.N1+(l-5))}return s},i.getPenaltyN2=function(e){const n=e.size;let s=0;for(let a=0;a<n-1;a++)for(let l=0;l<n-1;l++){const c=e.get(a,l)+e.get(a,l+1)+e.get(a+1,l)+e.get(a+1,l+1);(c===4||c===0)&&s++}return s*t.N2},i.getPenaltyN3=function(e){const n=e.size;let s=0,a=0,l=0;for(let c=0;c<n;c++){a=l=0;for(let d=0;d<n;d++)a=a<<1&2047|e.get(c,d),d>=10&&(a===1488||a===93)&&s++,l=l<<1&2047|e.get(d,c),d>=10&&(l===1488||l===93)&&s++}return s*t.N3},i.getPenaltyN4=function(e){let n=0;const s=e.data.length;for(let l=0;l<s;l++)n+=e.data[l];return Math.abs(Math.ceil(n*100/s/5)-10)*t.N4};function o(r,e,n){switch(r){case i.Patterns.PATTERN000:return(e+n)%2===0;case i.Patterns.PATTERN001:return e%2===0;case i.Patterns.PATTERN010:return n%3===0;case i.Patterns.PATTERN011:return(e+n)%3===0;case i.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2===0;case i.Patterns.PATTERN101:return e*n%2+e*n%3===0;case i.Patterns.PATTERN110:return(e*n%2+e*n%3)%2===0;case i.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}i.applyMask=function(e,n){const s=n.size;for(let a=0;a<s;a++)for(let l=0;l<s;l++)n.isReserved(l,a)||n.xor(l,a,o(e,l,a))},i.getBestMask=function(e,n){const s=Object.keys(i.Patterns).length;let a=0,l=1/0;for(let c=0;c<s;c++){n(c),i.applyMask(c,e);const d=i.getPenaltyN1(e)+i.getPenaltyN2(e)+i.getPenaltyN3(e)+i.getPenaltyN4(e);i.applyMask(c,e),d<l&&(l=d,a=c)}return a}})(vt);var q={};const S=j,J=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],K=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];q.getBlocksCount=function(t,o){switch(o){case S.L:return J[(t-1)*4+0];case S.M:return J[(t-1)*4+1];case S.Q:return J[(t-1)*4+2];case S.H:return J[(t-1)*4+3];default:return}};q.getTotalCodewordsCount=function(t,o){switch(o){case S.L:return K[(t-1)*4+0];case S.M:return K[(t-1)*4+1];case S.Q:return K[(t-1)*4+2];case S.H:return K[(t-1)*4+3];default:return}};var Ct={},Z={};const k=new Uint8Array(512),G=new Uint8Array(256);(function(){let t=1;for(let o=0;o<255;o++)k[o]=t,G[t]=o,t<<=1,t&256&&(t^=285);for(let o=255;o<512;o++)k[o]=k[o-255]})();Z.log=function(t){if(t<1)throw new Error("log("+t+")");return G[t]};Z.exp=function(t){return k[t]};Z.mul=function(t,o){return t===0||o===0?0:k[G[t]+G[o]]};(function(i){const t=Z;i.mul=function(r,e){const n=new Uint8Array(r.length+e.length-1);for(let s=0;s<r.length;s++)for(let a=0;a<e.length;a++)n[s+a]^=t.mul(r[s],e[a]);return n},i.mod=function(r,e){let n=new Uint8Array(r);for(;n.length-e.length>=0;){const s=n[0];for(let l=0;l<e.length;l++)n[l]^=t.mul(e[l],s);let a=0;for(;a<n.length&&n[a]===0;)a++;n=n.slice(a)}return n},i.generateECPolynomial=function(r){let e=new Uint8Array([1]);for(let n=0;n<r;n++)e=i.mul(e,new Uint8Array([1,t.exp(n)]));return e}})(Ct);const Tt=Ct;function dt(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}dt.prototype.initialize=function(t){this.degree=t,this.genPoly=Tt.generateECPolynomial(this.degree)};dt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(t.length+this.degree);o.set(t);const r=Tt.mod(o,this.genPoly),e=this.degree-r.length;if(e>0){const n=new Uint8Array(this.degree);return n.set(r,e),n}return r};var Ot=dt,At={},R={},ct={};ct.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var F={};const bt="[0-9]+",Ut="[A-Z $%*+\\-./:]+";let H="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";H=H.replace(/u/g,"\\u");const zt="(?:(?![A-Z0-9 $%*+\\-./:]|"+H+`)(?:.|[\r
]))+`;F.KANJI=new RegExp(H,"g");F.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");F.BYTE=new RegExp(zt,"g");F.NUMERIC=new RegExp(bt,"g");F.ALPHANUMERIC=new RegExp(Ut,"g");const _t=new RegExp("^"+H+"$"),kt=new RegExp("^"+bt+"$"),Ht=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");F.testKanji=function(t){return _t.test(t)};F.testNumeric=function(t){return kt.test(t)};F.testAlphanumeric=function(t){return Ht.test(t)};(function(i){const t=ct,o=F;i.NUMERIC={id:"Numeric",bit:1<<0,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:1<<1,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:1<<2,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:1<<3,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(n,s){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?n.ccBits[0]:s<27?n.ccBits[1]:n.ccBits[2]},i.getBestModeForData=function(n){return o.testNumeric(n)?i.NUMERIC:o.testAlphanumeric(n)?i.ALPHANUMERIC:o.testKanji(n)?i.KANJI:i.BYTE},i.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},i.isValid=function(n){return n&&n.bit&&n.ccBits};function r(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+e)}}i.from=function(n,s){if(i.isValid(n))return n;try{return r(n)}catch{return s}}})(R);(function(i){const t=b,o=q,r=j,e=R,n=ct,s=1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,a=t.getBCHDigit(s);function l(u,h,p){for(let y=1;y<=40;y++)if(h<=i.getCapacity(y,p,u))return y}function c(u,h){return e.getCharCountIndicator(u,h)+4}function d(u,h){let p=0;return u.forEach(function(y){p+=c(y.mode,h)+y.getBitsLength()}),p}function w(u,h){for(let p=1;p<=40;p++)if(d(u,p)<=i.getCapacity(p,h,e.MIXED))return p}i.from=function(h,p){return n.isValid(h)?parseInt(h,10):p},i.getCapacity=function(h,p,y){if(!n.isValid(h))throw new Error("Invalid QR Code version");typeof y=="undefined"&&(y=e.BYTE);const A=t.getSymbolTotalCodewords(h),f=o.getTotalCodewordsCount(h,p),E=(A-f)*8;if(y===e.MIXED)return E;const m=E-c(y,h);switch(y){case e.NUMERIC:return Math.floor(m/10*3);case e.ALPHANUMERIC:return Math.floor(m/11*2);case e.KANJI:return Math.floor(m/13);case e.BYTE:default:return Math.floor(m/8)}},i.getBestVersionForData=function(h,p){let y;const A=r.from(p,r.M);if(Array.isArray(h)){if(h.length>1)return w(h,A);if(h.length===0)return 1;y=h[0]}else y=h;return l(y.mode,y.getLength(),A)},i.getEncodedBits=function(h){if(!n.isValid(h)||h<7)throw new Error("Invalid QR Code version");let p=h<<12;for(;t.getBCHDigit(p)-a>=0;)p^=s<<t.getBCHDigit(p)-a;return h<<12|p}})(At);var Bt={};const it=b,Nt=1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,Vt=1<<14|1<<12|1<<10|1<<4|1<<1,gt=it.getBCHDigit(Nt);Bt.getEncodedBits=function(t,o){const r=t.bit<<3|o;let e=r<<10;for(;it.getBCHDigit(e)-gt>=0;)e^=Nt<<it.getBCHDigit(e)-gt;return(r<<10|e)^Vt};var It={};const Jt=R;function x(i){this.mode=Jt.NUMERIC,this.data=i.toString()}x.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};x.prototype.getLength=function(){return this.data.length};x.prototype.getBitsLength=function(){return x.getBitsLength(this.data.length)};x.prototype.write=function(t){let o,r,e;for(o=0;o+3<=this.data.length;o+=3)r=this.data.substr(o,3),e=parseInt(r,10),t.put(e,10);const n=this.data.length-o;n>0&&(r=this.data.substr(o),e=parseInt(r,10),t.put(e,n*3+1))};var Kt=x;const Gt=R,W=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function O(i){this.mode=Gt.ALPHANUMERIC,this.data=i}O.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};O.prototype.getLength=function(){return this.data.length};O.prototype.getBitsLength=function(){return O.getBitsLength(this.data.length)};O.prototype.write=function(t){let o;for(o=0;o+2<=this.data.length;o+=2){let r=W.indexOf(this.data[o])*45;r+=W.indexOf(this.data[o+1]),t.put(r,11)}this.data.length%2&&t.put(W.indexOf(this.data[o]),6)};var Yt=O,jt=function(t){for(var o=[],r=t.length,e=0;e<r;e++){var n=t.charCodeAt(e);if(n>=55296&&n<=56319&&r>e+1){var s=t.charCodeAt(e+1);s>=56320&&s<=57343&&(n=(n-55296)*1024+s-56320+65536,e+=1)}if(n<128){o.push(n);continue}if(n<2048){o.push(n>>6|192),o.push(n&63|128);continue}if(n<55296||n>=57344&&n<65536){o.push(n>>12|224),o.push(n>>6&63|128),o.push(n&63|128);continue}if(n>=65536&&n<=1114111){o.push(n>>18|240),o.push(n>>12&63|128),o.push(n>>6&63|128),o.push(n&63|128);continue}o.push(239,191,189)}return new Uint8Array(o).buffer};const qt=jt,Zt=R;function U(i){this.mode=Zt.BYTE,typeof i=="string"&&(i=qt(i)),this.data=new Uint8Array(i)}U.getBitsLength=function(t){return t*8};U.prototype.getLength=function(){return this.data.length};U.prototype.getBitsLength=function(){return U.getBitsLength(this.data.length)};U.prototype.write=function(i){for(let t=0,o=this.data.length;t<o;t++)i.put(this.data[t],8)};var Qt=U;const Xt=R,Wt=b;function z(i){this.mode=Xt.KANJI,this.data=i}z.getBitsLength=function(t){return t*13};z.prototype.getLength=function(){return this.data.length};z.prototype.getBitsLength=function(){return z.getBitsLength(this.data.length)};z.prototype.write=function(i){let t;for(t=0;t<this.data.length;t++){let o=Wt.toSJIS(this.data[t]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),i.put(o,13)}};var te=z,Ft={exports:{}};(function(i){var t={single_source_shortest_paths:function(o,r,e){var n={},s={};s[r]=0;var a=t.PriorityQueue.make();a.push(r,0);for(var l,c,d,w,u,h,p,y,A;!a.empty();){l=a.pop(),c=l.value,w=l.cost,u=o[c]||{};for(d in u)u.hasOwnProperty(d)&&(h=u[d],p=w+h,y=s[d],A=typeof s[d]=="undefined",(A||y>p)&&(s[d]=p,a.push(d,p),n[d]=c))}if(typeof e!="undefined"&&typeof s[e]=="undefined"){var f=["Could not find a path from ",r," to ",e,"."].join("");throw new Error(f)}return n},extract_shortest_path_from_predecessor_list:function(o,r){for(var e=[],n=r;n;)e.push(n),o[n],n=o[n];return e.reverse(),e},find_path:function(o,r,e){var n=t.single_source_shortest_paths(o,r,e);return t.extract_shortest_path_from_predecessor_list(n,e)},PriorityQueue:{make:function(o){var r=t.PriorityQueue,e={},n;o=o||{};for(n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);return e.queue=[],e.sorter=o.sorter||r.default_sorter,e},default_sorter:function(o,r){return o.cost-r.cost},push:function(o,r){var e={value:o,cost:r};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(Ft);(function(i){const t=R,o=Kt,r=Yt,e=Qt,n=te,s=F,a=b,l=Ft.exports;function c(f){return unescape(encodeURIComponent(f)).length}function d(f,E,m){const g=[];let v;for(;(v=f.exec(m))!==null;)g.push({data:v[0],index:v.index,mode:E,length:v[0].length});return g}function w(f){const E=d(s.NUMERIC,t.NUMERIC,f),m=d(s.ALPHANUMERIC,t.ALPHANUMERIC,f);let g,v;return a.isKanjiModeEnabled()?(g=d(s.BYTE,t.BYTE,f),v=d(s.KANJI,t.KANJI,f)):(g=d(s.BYTE_KANJI,t.BYTE,f),v=[]),E.concat(m,g,v).sort(function(T,B){return T.index-B.index}).map(function(T){return{data:T.data,mode:T.mode,length:T.length}})}function u(f,E){switch(E){case t.NUMERIC:return o.getBitsLength(f);case t.ALPHANUMERIC:return r.getBitsLength(f);case t.KANJI:return n.getBitsLength(f);case t.BYTE:return e.getBitsLength(f)}}function h(f){return f.reduce(function(E,m){const g=E.length-1>=0?E[E.length-1]:null;return g&&g.mode===m.mode?(E[E.length-1].data+=m.data,E):(E.push(m),E)},[])}function p(f){const E=[];for(let m=0;m<f.length;m++){const g=f[m];switch(g.mode){case t.NUMERIC:E.push([g,{data:g.data,mode:t.ALPHANUMERIC,length:g.length},{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.ALPHANUMERIC:E.push([g,{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.KANJI:E.push([g,{data:g.data,mode:t.BYTE,length:c(g.data)}]);break;case t.BYTE:E.push([{data:g.data,mode:t.BYTE,length:c(g.data)}])}}return E}function y(f,E){const m={},g={start:{}};let v=["start"];for(let C=0;C<f.length;C++){const T=f[C],B=[];for(let M=0;M<T.length;M++){const N=T[M],_=""+C+M;B.push(_),m[_]={node:N,lastCount:0},g[_]={};for(let X=0;X<v.length;X++){const L=v[X];m[L]&&m[L].node.mode===N.mode?(g[L][_]=u(m[L].lastCount+N.length,N.mode)-u(m[L].lastCount,N.mode),m[L].lastCount+=N.length):(m[L]&&(m[L].lastCount=N.length),g[L][_]=u(N.length,N.mode)+4+t.getCharCountIndicator(N.mode,E))}}v=B}for(let C=0;C<v.length;C++)g[v[C]].end=0;return{map:g,table:m}}function A(f,E){let m;const g=t.getBestModeForData(f);if(m=t.from(E,g),m!==t.BYTE&&m.bit<g.bit)throw new Error('"'+f+'" cannot be encoded with mode '+t.toString(m)+`.
 Suggested mode is: `+t.toString(g));switch(m===t.KANJI&&!a.isKanjiModeEnabled()&&(m=t.BYTE),m){case t.NUMERIC:return new o(f);case t.ALPHANUMERIC:return new r(f);case t.KANJI:return new n(f);case t.BYTE:return new e(f)}}i.fromArray=function(E){return E.reduce(function(m,g){return typeof g=="string"?m.push(A(g,null)):g.data&&m.push(A(g.data,g.mode)),m},[])},i.fromString=function(E,m){const g=w(E,a.isKanjiModeEnabled()),v=p(g),C=y(v,m),T=l.find_path(C.map,"start","end"),B=[];for(let M=1;M<T.length-1;M++)B.push(C.table[T[M]].node);return i.fromArray(h(B))},i.rawSplit=function(E){return i.fromArray(w(E,a.isKanjiModeEnabled()))}})(It);const Q=b,tt=j,ee=Pt,ne=Dt,oe=Et,ie=wt,rt=vt,st=q,re=Ot,Y=At,se=Bt,le=R,et=It;function ae(i,t){const o=i.size,r=ie.getPositions(t);for(let e=0;e<r.length;e++){const n=r[e][0],s=r[e][1];for(let a=-1;a<=7;a++)if(!(n+a<=-1||o<=n+a))for(let l=-1;l<=7;l++)s+l<=-1||o<=s+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?i.set(n+a,s+l,!0,!0):i.set(n+a,s+l,!1,!0))}}function de(i){const t=i.size;for(let o=8;o<t-8;o++){const r=o%2===0;i.set(o,6,r,!0),i.set(6,o,r,!0)}}function ce(i,t){const o=oe.getPositions(t);for(let r=0;r<o.length;r++){const e=o[r][0],n=o[r][1];for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s===-2||s===2||a===-2||a===2||s===0&&a===0?i.set(e+s,n+a,!0,!0):i.set(e+s,n+a,!1,!0)}}function ue(i,t){const o=i.size,r=Y.getEncodedBits(t);let e,n,s;for(let a=0;a<18;a++)e=Math.floor(a/3),n=a%3+o-8-3,s=(r>>a&1)===1,i.set(e,n,s,!0),i.set(n,e,s,!0)}function nt(i,t,o){const r=i.size,e=se.getEncodedBits(t,o);let n,s;for(n=0;n<15;n++)s=(e>>n&1)===1,n<6?i.set(n,8,s,!0):n<8?i.set(n+1,8,s,!0):i.set(r-15+n,8,s,!0),n<8?i.set(8,r-n-1,s,!0):n<9?i.set(8,15-n-1+1,s,!0):i.set(8,15-n-1,s,!0);i.set(r-8,8,1,!0)}function he(i,t){const o=i.size;let r=-1,e=o-1,n=7,s=0;for(let a=o-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!i.isReserved(e,a-l)){let c=!1;s<t.length&&(c=(t[s]>>>n&1)===1),i.set(e,a-l,c),n--,n===-1&&(s++,n=7)}if(e+=r,e<0||o<=e){e-=r,r=-r;break}}}function fe(i,t,o){const r=new ee;o.forEach(function(l){r.put(l.mode.bit,4),r.put(l.getLength(),le.getCharCountIndicator(l.mode,i)),l.write(r)});const e=Q.getSymbolTotalCodewords(i),n=st.getTotalCodewordsCount(i,t),s=(e-n)*8;for(r.getLengthInBits()+4<=s&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const a=(s-r.getLengthInBits())/8;for(let l=0;l<a;l++)r.put(l%2?17:236,8);return ge(r,i,t)}function ge(i,t,o){const r=Q.getSymbolTotalCodewords(t),e=st.getTotalCodewordsCount(t,o),n=r-e,s=st.getBlocksCount(t,o),a=r%s,l=s-a,c=Math.floor(r/s),d=Math.floor(n/s),w=d+1,u=c-d,h=new re(u);let p=0;const y=new Array(s),A=new Array(s);let f=0;const E=new Uint8Array(i.buffer);for(let T=0;T<s;T++){const B=T<l?d:w;y[T]=E.slice(p,p+B),A[T]=h.encode(y[T]),p+=B,f=Math.max(f,B)}const m=new Uint8Array(r);let g=0,v,C;for(v=0;v<f;v++)for(C=0;C<s;C++)v<y[C].length&&(m[g++]=y[C][v]);for(v=0;v<u;v++)for(C=0;C<s;C++)m[g++]=A[C][v];return m}function me(i,t,o,r){let e;if(Array.isArray(i))e=et.fromArray(i);else if(typeof i=="string"){let c=t;if(!c){const d=et.rawSplit(i);c=Y.getBestVersionForData(d,o)}e=et.fromString(i,c||40)}else throw new Error("Invalid data");const n=Y.getBestVersionForData(e,o);if(!n)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=n;else if(t<n)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+n+`.
`);const s=fe(t,o,e),a=Q.getSymbolSize(t),l=new ne(a);return ae(l,t),de(l),ce(l,t),nt(l,o,0),t>=7&&ue(l,t),he(l,s),isNaN(r)&&(r=rt.getBestMask(l,nt.bind(null,l,o))),rt.applyMask(r,l),nt(l,o,r),{modules:l,version:t,errorCorrectionLevel:o,maskPattern:r,segments:e}}pt.create=function(t,o){if(typeof t=="undefined"||t==="")throw new Error("No input text");let r=tt.M,e,n;return typeof o!="undefined"&&(r=tt.from(o.errorCorrectionLevel,tt.M),e=Y.from(o.version),n=rt.from(o.maskPattern),o.toSJISFunc&&Q.setToSJISFunction(o.toSJISFunc)),me(t,e,r,n)};var Lt={},ut={};(function(i){function t(o){if(typeof o=="number"&&(o=o.toString()),typeof o!="string")throw new Error("Color should be defined as hex string");let r=o.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+o);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const e=parseInt(r.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+r.slice(0,6).join("")}}i.getOptions=function(r){r||(r={}),r.color||(r.color={});const e=typeof r.margin=="undefined"||r.margin===null||r.margin<0?4:r.margin,n=r.width&&r.width>=21?r.width:void 0,s=r.scale||4;return{width:n,scale:n?4:s,margin:e,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},i.getScale=function(r,e){return e.width&&e.width>=r+e.margin*2?e.width/(r+e.margin*2):e.scale},i.getImageWidth=function(r,e){const n=i.getScale(r,e);return Math.floor((r+e.margin*2)*n)},i.qrToImageData=function(r,e,n){const s=e.modules.size,a=e.modules.data,l=i.getScale(s,n),c=Math.floor((s+n.margin*2)*l),d=n.margin*l,w=[n.color.light,n.color.dark];for(let u=0;u<c;u++)for(let h=0;h<c;h++){let p=(u*c+h)*4,y=n.color.light;if(u>=d&&h>=d&&u<c-d&&h<c-d){const A=Math.floor((u-d)/l),f=Math.floor((h-d)/l);y=w[a[A*s+f]?1:0]}r[p++]=y.r,r[p++]=y.g,r[p++]=y.b,r[p]=y.a}}})(ut);(function(i){const t=ut;function o(e,n,s){e.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=s,n.width=s,n.style.height=s+"px",n.style.width=s+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(n,s,a){let l=a,c=s;typeof l=="undefined"&&(!s||!s.getContext)&&(l=s,s=void 0),s||(c=r()),l=t.getOptions(l);const d=t.getImageWidth(n.modules.size,l),w=c.getContext("2d"),u=w.createImageData(d,d);return t.qrToImageData(u.data,n,l),o(w,c,d),w.putImageData(u,0,0),c},i.renderToDataURL=function(n,s,a){let l=a;typeof l=="undefined"&&(!s||!s.getContext)&&(l=s,s=void 0),l||(l={});const c=i.render(n,s,l),d=l.type||"image/png",w=l.rendererOpts||{};return c.toDataURL(d,w.quality)}})(Lt);var Mt={};const pe=ut;function mt(i,t){const o=i.a/255,r=t+'="'+i.hex+'"';return o<1?r+" "+t+'-opacity="'+o.toFixed(2).slice(1)+'"':r}function ot(i,t,o){let r=i+t;return typeof o!="undefined"&&(r+=" "+o),r}function ye(i,t,o){let r="",e=0,n=!1,s=0;for(let a=0;a<i.length;a++){const l=Math.floor(a%t),c=Math.floor(a/t);!l&&!n&&(n=!0),i[a]?(s++,a>0&&l>0&&i[a-1]||(r+=n?ot("M",l+o,.5+c+o):ot("m",e,0),e=0,n=!1),l+1<t&&i[a+1]||(r+=ot("h",s),s=0)):e++}return r}Mt.render=function(t,o,r){const e=pe.getOptions(o),n=t.modules.size,s=t.modules.data,a=n+e.margin*2,l=e.color.light.a?"<path "+mt(e.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",c="<path "+mt(e.color.dark,"stroke")+' d="'+ye(s,n,e.margin)+'"/>',d='viewBox="0 0 '+a+" "+a+'"',w=e.width?'width="'+e.width+'" height="'+e.width+'" ':"",u='<svg xmlns="http://www.w3.org/2000/svg" '+w+d+' shape-rendering="crispEdges">'+l+c+`</svg>
`;return typeof r=="function"&&r(null,u),u};const Ee=Rt,lt=pt,St=Lt,we=Mt;function ht(i,t,o,r,e){const n=[].slice.call(arguments,1),s=n.length,a=typeof n[s-1]=="function";if(!a&&!Ee())throw new Error("Callback required as last argument");if(a){if(s<2)throw new Error("Too few arguments provided");s===2?(e=o,o=t,t=r=void 0):s===3&&(t.getContext&&typeof e=="undefined"?(e=r,r=void 0):(e=r,r=o,o=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(o=t,t=r=void 0):s===2&&!t.getContext&&(r=o,o=t,t=void 0),new Promise(function(l,c){try{const d=lt.create(o,r);l(i(d,t,r))}catch(d){c(d)}})}try{const l=lt.create(o,r);e(null,i(l,t,r))}catch(l){e(l)}}I.create=lt.create;I.toCanvas=ht.bind(null,St.render);I.toDataURL=ht.bind(null,St.renderToDataURL);I.toString=ht.bind(null,function(i,t,o){return we.render(i,o)});class ve{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","diecis\xE9is"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(t){switch(typeof t=="number"&&(t=String(t)),t=this.deleteZerosLeft(t),t){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inv\xE1lido"}}convertToText(t){if(typeof t=="number"&&(t=String(t)),t=this.deleteZerosLeft(t),!this.validateNumber(t))throw"N\xFAmero inv\xE1lido, no se puede convertir!";return this.getName(t)}deleteZerosLeft(t){let o=0,r=!0;for(o=0;o<t.length;o++)if(t.charAt(o)!=0){r=!1;break}return r?"0":t.substr(o)}validateNumber(t){return!(isNaN(t)||t===""||t.indexOf(".")>=0||t.indexOf("-")>=0)}getName(t){return t=this.deleteZerosLeft(t),t.length===1?this.getUnits(t):t.length===2?this.getTens(t):t.length===3?this.getHundreds(t):t.length<7?this.getThousands(t):t.length<13?this.getPeriod(t,6,"mill\xF3n"):t.length<19?this.getPeriod(t,12,"bill\xF3n"):"N\xFAmero demasiado grande."}getUnits(t){let o=parseInt(t);return this.units[o]}getTens(t){let o=t.charAt(1);if(t<17)return this.tenToSixteen[t-10];if(t<20)return"dieci"+this.getUnits(o);switch(t){case"20":return"veinte";case"22":return"veintid\xF3s";case"23":return"veintitr\xE9s";case"26":return"veintis\xE9is"}if(t<30)return"veinti"+this.getUnits(o);let r=this.tens[t.charAt(0)-3];return o>0&&(r+=" y "+this.getUnits(o)),r}getHundreds(t){let o="",r=t.charAt(0),e=t.substr(1);if(t==100)return"cien";switch(r){case"1":o="ciento";break;case"5":o="quinientos";break;case"7":o="setecientos";break;case"9":o="novecientos"}return o===""&&(o=this.getUnits(r)+"cientos"),e>0&&(o+=" "+this.getName(e)),o}getThousands(t){let o="mil",r=t.length-3,e=t.substr(0,r),n=t.substr(r);return e>1&&(o=this.getName(e).replace("uno","un")+" mil"),n>0&&(o+=" "+this.getName(n)),o}getPeriod(t,o,r){let e="un "+r,n=t.length-o,s=t.substr(0,n),a=t.substr(n);return s>1&&(e=this.getName(s).replace("uno","un")+" "+r.replace("\xF3","o")+"es"),a>0&&(e+=" "+this.getName(a)),e}}var D={conversorNumerosALetras:ve};class Ae{static factura(t){return new Promise((o,r)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.montoTotal)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(l.url2+"consulta/QR?nit="+l.nit+"&cuf="+t.cuf+"&numero="+t.numeroFactura+"&t=2",a).then(c=>{let d=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(u=>{d+=`<div style='font-size: 12px'><b>${u.product_id} ${u.descripcion} </b></div>`,d+=`<div>${u.cantidad} ${parseFloat(u.precioUnitario).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subTotal).toFixed(2)}</span></div>`}),d+=`<hr>
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
      <div style='display: flex;justify-content: center;'> <img  src="${c}" ></div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=d,new $().print(document.getElementById("myElement")),o(c)}).catch(c=>{r(c)})})}static nota(t){return console.log("factura",t),new Promise((o,r)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,a).then(c=>{let d=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(u=>{d+=`<div style='font-size: 12px'><b> ${u.producto} </b></div>`,d+=`<div><span style='font-size: 18px;font-weight: bold'>${u.cantidad}</span> ${parseFloat(u.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.total).toFixed(2)}</span></div>`}),d+=`<hr>
<div>${t.comentario===""||t.comentario===null?"":"Comentario: "+t.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${c}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=d,new $().print(document.getElementById("myElement")),o(c)}).catch(c=>{r(c)})})}static notaCompra(t){return console.log("factura",t),new Promise((o,r)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,a).then(async c=>{let d=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;t.buy_details.forEach(u=>{d+=`<div style='font-size: 12px'><b>${u.nombre} </b></div>`,d+=`<div><span style='font-size: 14px;font-weight: bold'>${u.cantidad}</span> ${parseFloat(u.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subtotal).toFixed(2)}</span></div>`}),d+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${c}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=d,new $().print(document.getElementById("myElement")),o(c)}).catch(c=>{r(c)})})}static reportTotal(t,o){const r=t.filter(s=>s.tipoVenta==="Ingreso").reduce((s,a)=>s+a.montoTotal,0),e=t.filter(s=>s.tipoVenta==="Egreso").reduce((s,a)=>s+a.montoTotal,0),n=r-e;return console.log("montoTotal",n),new Promise((s,a)=>{const l=D.conversorNumerosALetras,c=new l,d=Math.abs(n),w=c.convertToText(parseInt(d)),u={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=P().env;I.toDataURL(` Monto: ${parseFloat(n).toFixed(2)}`,u).then(p=>{let y=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(f=>{y+=`<div style='font-size: 12px'><b> ${f.user.name} </b></div>`,y+=`<div> ${parseFloat(f.montoTotal).toFixed(2)} ${f.tipoVenta}
          <span style='float:right'> ${f.tipoVenta==="Egreso"?"-":""} ${parseFloat(f.montoTotal).toFixed(2)}</span></div>`}),y+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${w} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${p}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=y,new $().print(document.getElementById("myElement")),s(p)}).catch(p=>{a(p)})})}static reciboCompra(t){return new Promise((o,r)=>{const e=D.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),a={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},l=P().env;I.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,a).then(c=>{let d=`${this.head()}
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
    </table><hr><div class='titulo'>DETALLE</div>`;d+=`<div style='font-size: 12px'><b>${t.product_id} ${t.product.descripcion} </b></div>`,d+=`<div>${t.quantity} ${parseFloat(t.price).toFixed(2)} 0.00
          //           <span style='float:right'>${parseFloat(t.total).toFixed(2)}</span></div>`,d+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${c}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=d,new $().print(document.getElementById("myElement")),o(c)}).catch(c=>{r(c)})})}static reciboTranferencia(t,o,r,e){return console.log("producto",t,"de",o,"ha",r,"cantidad",e),new Promise((n,s)=>{const a=D.conversorNumerosALetras,c=new a().convertToText(parseInt(e)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},w=P().env;I.toDataURL(`de: ${o} A: ${r}`,d).then(u=>{let h=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${w.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${w.direccion}<br>
    Tel. ${w.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;h+=`<div style='font-size: 12px'><b>Producto: ${t} de Sucursal${o} a ${r} </b></div>`,h+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${e+""}</td></tr>
      </table>
      <br>
      <div>Son ${c+""} ${e+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${u}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=h,new $().print(document.getElementById("myElement")),n(u)}).catch(u=>{s(u)})})}static recibo(t){var l,c;console.log(t);let o="";const r=t.type;let e="",n=0,s="";r=="INGRESO"?(s="<table class='tab2'><tr><th>CANT</th><th>DETALLE</th><th>P/U</th><th>TOTAL</th></tr>",t.details.forEach(d=>{e+="<tr><td>"+d.quantity+"</td><td>"+d.product+"</td><td>"+d.price+"</td><td>"+d.subtotal+"</td></tr>",n+=parseFloat(d.subtotal)}),s+=e,s+="<tr><td></td><td></td><td><b>TOTAL:</b></td><td>"+n.toFixed(2)+"</td></tr></table>"):(s="<table class='tab2'><tr><th>DESCRIPCION</th><th>PROVEEDOR</th><th>TOTAL</th></tr>",e+="<tr><td>"+t.descripcion+"</td><td>"+((l=t.client)==null?void 0:l.name)+"</td><td>"+t.total+"</td></tr>",s+=e,s+="<tr><td></td><td><b>TOTAL:</b></td><td>"+t.total+"</td></tr></table>"),o=`<style>
    .imagen{
      width:60%
    }
    .titulo1 {
    text-align:center;
    font-weight:bold;
    font-size:12px;
    }
    .titulo2 {
    text-align:center;
    font-size:10px;
    }
    .tab1{
    width:100%;
    text-align:center;
    font-size:10px;
    }
    .tab2{
    width:100%;
    font-size:10px;
    border-collapse: collapse;
    }
    .tab2  th{
    border: .1px solid;
    }
    .pie{
    text-align:center;
    font-size:8px;}
    </style>
    <div style="padding: 0.0cm 0.3cm 0.0cm 0.3cm">
      <div style='text-align:center'><img class='imagen' src="logo2.png" width="70" ></div>
      <div class='titulo1'>
      ${r=="INGRESO"?"CONTACTOS: 76130006":"RECIBO DE EGRESO"}
      </div>
      <div class='titulo2'>AV. TACNA ENTRE JAEN Y TOMAS FRIAS</div>
      <table class='tab1'><tr><td>`+t.date+"</td><td>"+t.time+`</td></tr></table><br>
      ${s}
      <div class='pie' style="text-align: right;font-weight: bold;font-size: 15px">TICKET ${t.numero} ${t.mesa} </div>
      <div class='pie'>GRACIAS POR SU COMPRA, BUEN PROVECHO</div>
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
<div style="width: 300px;">`}}export{Ae as I};
