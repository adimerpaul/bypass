import{h as w,c as $e,aJ as Qe,aK as ct,aL as dt,aM as ft,p as Et,r as E,a as g,w as me,K as J,aN as Tt,aO as _t,aP as Bt,aQ as Lt,o as vt,g as mt,aR as Rt,aS as Ht,aT as at,aU as pe,aV as Dt,aW as Pt,v as Ne,at as Nt,aX as Kt,x as fe,a7 as $t,aY as Qt,A as ve,aF as jt,k as Ut}from"./index.033fb2bb.js";import{Q as Wt}from"./QChip.2fbc3c7c.js";import{n as it,Q as Xt,e as Yt,f as Jt,d as Gt}from"./format.26cbf75d.js";const Zt=w("div",{class:"q-space"});var cl=$e({name:"QSpace",setup(){return()=>Zt}}),el=$e({name:"QField",inheritAttrs:!1,props:{...Qe,tag:{type:String,default:"label"}},emits:ct,setup(){return dt(ft({requiredForAttr:!1,tagProp:!0}))}});let Te=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const r=document.createElement("div");Object.assign(r.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(r),e.scrollLeft=-1e3,Te=e.scrollLeft>=0,e.remove()}const K=1e3,tl=["start","center","end","start-force","center-force","end-force"],St=Array.prototype.filter,ll=window.getComputedStyle(document.body).overflowAnchor===void 0?Et:function(e,r){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const i=e.children||[];St.call(i,q=>q.dataset&&q.dataset.qVsAnchor!==void 0).forEach(q=>{delete q.dataset.qVsAnchor});const b=i[r];b&&b.dataset&&(b.dataset.qVsAnchor="")}))};function Se(e,r){return e+r}function Ke(e,r,i,b,q,a,T,h){const m=e===window?document.scrollingElement||document.documentElement:e,_=q===!0?"offsetWidth":"offsetHeight",s={scrollStart:0,scrollViewSize:-T-h,scrollMaxSize:0,offsetStart:-T,offsetEnd:-h};if(q===!0?(e===window?(s.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,s.scrollViewSize+=document.documentElement.clientWidth):(s.scrollStart=m.scrollLeft,s.scrollViewSize+=m.clientWidth),s.scrollMaxSize=m.scrollWidth,a===!0&&(s.scrollStart=(Te===!0?s.scrollMaxSize-s.scrollViewSize:0)-s.scrollStart)):(e===window?(s.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,s.scrollViewSize+=document.documentElement.clientHeight):(s.scrollStart=m.scrollTop,s.scrollViewSize+=m.clientHeight),s.scrollMaxSize=m.scrollHeight),i!==null)for(let y=i.previousElementSibling;y!==null;y=y.previousElementSibling)y.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetStart+=y[_]);if(b!==null)for(let y=b.nextElementSibling;y!==null;y=y.nextElementSibling)y.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetEnd+=y[_]);if(r!==e){const y=m.getBoundingClientRect(),V=r.getBoundingClientRect();q===!0?(s.offsetStart+=V.left-y.left,s.offsetEnd-=V.width):(s.offsetStart+=V.top-y.top,s.offsetEnd-=V.height),e!==window&&(s.offsetStart+=s.scrollStart),s.offsetEnd+=s.scrollMaxSize-s.offsetStart}return s}function rt(e,r,i,b){r==="end"&&(r=(e===window?document.body:e)[i===!0?"scrollWidth":"scrollHeight"]),e===window?i===!0?(b===!0&&(r=(Te===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-r),window.scrollTo(r,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,r):i===!0?(b===!0&&(r=(Te===!0?e.scrollWidth-e.offsetWidth:0)-r),e.scrollLeft=r):e.scrollTop=r}function xe(e,r,i,b){if(i>=b)return 0;const q=r.length,a=Math.floor(i/K),T=Math.floor((b-1)/K)+1;let h=e.slice(a,T).reduce(Se,0);return i%K!==0&&(h-=r.slice(a*K,i).reduce(Se,0)),b%K!==0&&b!==q&&(h-=r.slice(b,T*K).reduce(Se,0)),h}const gt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},dl=Object.keys(gt),ul={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...gt};function nl({virtualScrollLength:e,getVirtualScrollTarget:r,getVirtualScrollEl:i,virtualScrollItemSizeComputed:b}){const q=mt(),{props:a,emit:T,proxy:h}=q,{$q:m}=h;let _,s,y,V=[],A;const F=E(0),N=E(0),L=E({}),U=E(null),W=E(null),R=E(null),z=E({from:0,to:0}),Ae=g(()=>a.tableColspan!==void 0?a.tableColspan:100);b===void 0&&(b=g(()=>a.virtualScrollItemSize));const I=g(()=>b.value+";"+a.virtualScrollHorizontal),X=g(()=>I.value+";"+a.virtualScrollSliceRatioBefore+";"+a.virtualScrollSliceRatioAfter);me(X,()=>{$()}),me(I,G);function G(){ne(s,!0)}function ge(l){ne(l===void 0?s:l)}function Z(l,o){const d=r();if(d==null||d.nodeType===8)return;const x=Ke(d,i(),U.value,W.value,a.virtualScrollHorizontal,m.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd);y!==x.scrollViewSize&&$(x.scrollViewSize),H(d,x,Math.min(e.value-1,Math.max(0,parseInt(l,10)||0)),0,tl.indexOf(o)!==-1?o:s!==-1&&l>s?"end":"start")}function ke(){const l=r();if(l==null||l.nodeType===8)return;const o=Ke(l,i(),U.value,W.value,a.virtualScrollHorizontal,m.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd),d=e.value-1,x=o.scrollMaxSize-o.offsetStart-o.offsetEnd-N.value;if(_===o.scrollStart)return;if(o.scrollMaxSize<=0){H(l,o,0,0);return}y!==o.scrollViewSize&&$(o.scrollViewSize),he(z.value.from);const M=Math.floor(o.scrollMaxSize-Math.max(o.scrollViewSize,o.offsetEnd)-Math.min(A[d],o.scrollViewSize/2));if(M>0&&Math.ceil(o.scrollStart)>=M){H(l,o,d,o.scrollMaxSize-o.offsetEnd-V.reduce(Se,0));return}let S=0,v=o.scrollStart-o.offsetStart,O=v;if(v<=x&&v+o.scrollViewSize>=F.value)v-=F.value,S=z.value.from,O=v;else for(let f=0;v>=V[f]&&S<d;f++)v-=V[f],S+=K;for(;v>0&&S<d;)v-=A[S],v>-o.scrollViewSize?(S++,O=v):O=A[S]+v;H(l,o,S,O)}function H(l,o,d,x,M){const S=typeof M=="string"&&M.indexOf("-force")!==-1,v=S===!0?M.replace("-force",""):M,O=v!==void 0?v:"start";let f=Math.max(0,d-L.value[O]),D=f+L.value.total;D>e.value&&(D=e.value,f=Math.max(0,D-L.value.total)),_=o.scrollStart;const Y=f!==z.value.from||D!==z.value.to;if(Y===!1&&v===void 0){ye(d);return}const{activeElement:Ie}=document,Q=R.value;Y===!0&&Q!==null&&Q!==Ie&&Q.contains(Ie)===!0&&(Q.addEventListener("focusout",ze),setTimeout(()=>{Q!==null&&Q.removeEventListener("focusout",ze)})),ll(Q,d-f);const Fe=v!==void 0?A.slice(f,d).reduce(Se,0):0;if(Y===!0){const ee=D>=z.value.from&&f<=z.value.to?z.value.to:D;z.value={from:f,to:ee},F.value=xe(V,A,0,f),N.value=xe(V,A,D,e.value),requestAnimationFrame(()=>{z.value.to!==D&&_===o.scrollStart&&(z.value={from:z.value.from,to:D},N.value=xe(V,A,D,e.value))})}requestAnimationFrame(()=>{if(_!==o.scrollStart)return;Y===!0&&he(f);const ee=A.slice(f,d).reduce(Se,0),te=ee+o.offsetStart+F.value,Me=te+A[d];let be=te+x;if(v!==void 0){const Be=ee-Fe,Ve=o.scrollStart+Be;be=S!==!0&&Ve<te&&Me<Ve+o.scrollViewSize?Ve:v==="end"?Me-o.scrollViewSize:te-(v==="start"?0:Math.round((o.scrollViewSize-A[d])/2))}_=be,rt(l,be,a.virtualScrollHorizontal,m.lang.rtl),ye(d)})}function he(l){const o=R.value;if(o){const d=St.call(o.children,f=>f.classList&&f.classList.contains("q-virtual-scroll--skip")===!1),x=d.length,M=a.virtualScrollHorizontal===!0?f=>f.getBoundingClientRect().width:f=>f.offsetHeight;let S=l,v,O;for(let f=0;f<x;){for(v=M(d[f]),f++;f<x&&d[f].classList.contains("q-virtual-scroll--with-prev")===!0;)v+=M(d[f]),f++;O=v-A[S],O!==0&&(A[S]+=O,V[Math.floor(S/K)]+=O),S++}}}function ze(){R.value!==null&&R.value!==void 0&&R.value.focus()}function ne(l,o){const d=1*b.value;(o===!0||Array.isArray(A)===!1)&&(A=[]);const x=A.length;A.length=e.value;for(let S=e.value-1;S>=x;S--)A[S]=d;const M=Math.floor((e.value-1)/K);V=[];for(let S=0;S<=M;S++){let v=0;const O=Math.min((S+1)*K,e.value);for(let f=S*K;f<O;f++)v+=A[f];V.push(v)}s=-1,_=void 0,F.value=xe(V,A,0,z.value.from),N.value=xe(V,A,z.value.to,e.value),l>=0?(he(z.value.from),J(()=>{Z(l)})):oe()}function $(l){if(l===void 0&&typeof window!="undefined"){const v=r();v!=null&&v.nodeType!==8&&(l=Ke(v,i(),U.value,W.value,a.virtualScrollHorizontal,m.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd).scrollViewSize)}y=l;const o=parseFloat(a.virtualScrollSliceRatioBefore)||0,d=parseFloat(a.virtualScrollSliceRatioAfter)||0,x=1+o+d,M=l===void 0||l<=0?1:Math.ceil(l/b.value),S=Math.max(1,M,Math.ceil((a.virtualScrollSliceSize>0?a.virtualScrollSliceSize:10)/x));L.value={total:Math.ceil(S*x),start:Math.ceil(S*o),center:Math.ceil(S*(.5+o)),end:Math.ceil(S*(1+o)),view:M}}function _e(l,o){const d=a.virtualScrollHorizontal===!0?"width":"height",x={["--q-virtual-scroll-item-"+d]:b.value+"px"};return[l==="tbody"?w(l,{class:"q-virtual-scroll__padding",key:"before",ref:U},[w("tr",[w("td",{style:{[d]:`${F.value}px`,...x},colspan:Ae.value})])]):w(l,{class:"q-virtual-scroll__padding",key:"before",ref:U,style:{[d]:`${F.value}px`,...x}}),w(l,{class:"q-virtual-scroll__content",key:"content",ref:R,tabindex:-1},o.flat()),l==="tbody"?w(l,{class:"q-virtual-scroll__padding",key:"after",ref:W},[w("tr",[w("td",{style:{[d]:`${N.value}px`,...x},colspan:Ae.value})])]):w(l,{class:"q-virtual-scroll__padding",key:"after",ref:W,style:{[d]:`${N.value}px`,...x}})]}function ye(l){s!==l&&(a.onVirtualScroll!==void 0&&T("virtualScroll",{index:l,from:z.value.from,to:z.value.to-1,direction:l<s?"decrease":"increase",ref:h}),s=l)}$();const oe=Tt(ke,m.platform.is.ios===!0?120:35);_t(()=>{$()});let we=!1;return Bt(()=>{we=!0}),Lt(()=>{if(we!==!0)return;const l=r();_!==void 0&&l!==void 0&&l!==null&&l.nodeType!==8?rt(l,_,a.virtualScrollHorizontal,m.lang.rtl):Z(s)}),vt(()=>{oe.cancel()}),Object.assign(h,{scrollTo:Z,reset:G,refresh:ge}),{virtualScrollSliceRange:z,virtualScrollSliceSizeComputed:L,setVirtualScrollSize:$,onVirtualScrollEvt:oe,localResetVirtualScroll:ne,padVirtualScroll:_e,scrollTo:Z,reset:G,refresh:ge}}const st=e=>["add","add-unique","toggle"].includes(e),ol=".*+?^${}()|[]\\",al=Object.keys(Qe);var fl=$e({name:"QSelect",inheritAttrs:!1,props:{...ul,...Rt,...Qe,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],popupNoRouteDismiss:Boolean,useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:st},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...ct,"add","remove","inputValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:r,emit:i}){const{proxy:b}=mt(),{$q:q}=b,a=E(!1),T=E(!1),h=E(-1),m=E(""),_=E(!1),s=E(!1);let y=null,V=null,A,F,N,L=null,U,W,R,z;const Ae=E(null),I=E(null),X=E(null),G=E(null),ge=E(null),Z=Ht(e),ke=Kt(tt),H=g(()=>Array.isArray(e.options)?e.options.length:0),he=g(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ze,virtualScrollSliceSizeComputed:ne,localResetVirtualScroll:$,padVirtualScroll:_e,onVirtualScrollEvt:ye,scrollTo:oe,setVirtualScrollSize:we}=nl({virtualScrollLength:H,getVirtualScrollTarget:bt,getVirtualScrollEl:Ze,virtualScrollItemSizeComputed:he}),l=ft(),o=g(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,n=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&A!==void 0?A:[],c=n.map(p=>wt(p,u));return e.modelValue===null&&t===!0?c.filter(p=>p!==null):c}return n}),d=g(()=>{const t={};return al.forEach(n=>{const u=e[n];u!==void 0&&(t[n]=u)}),t}),x=g(()=>e.optionsDark===null?l.isDark.value:e.optionsDark),M=g(()=>at(o.value)),S=g(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||o.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),v=g(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),O=g(()=>H.value===0),f=g(()=>o.value.map(t=>P.value(t)).join(", ")),D=g(()=>e.displayValue!==void 0?e.displayValue:f.value),Y=g(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),Ie=g(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||o.value.some(Y.value))),Q=g(()=>l.focused.value===!0?e.tabindex:-1),Fe=g(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":a.value===!0?"true":"false","aria-controls":`${l.targetUid.value}_lb`};return h.value>=0&&(t["aria-activedescendant"]=`${l.targetUid.value}_${h.value}`),t}),ee=g(()=>({id:`${l.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),te=g(()=>o.value.map((t,n)=>({index:n,opt:t,html:Y.value(t),selected:!0,removeAtIndex:yt,toggleOption:le,tabindex:Q.value}))),Me=g(()=>{if(H.value===0)return[];const{from:t,to:n}=ze.value;return e.options.slice(t,n).map((u,c)=>{const p=ae.value(u)===!0,C=He(u)===!0,B=t+c,k={clickable:!0,active:C,activeClass:Ve.value,manualFocus:!0,focused:!1,disable:p,tabindex:-1,dense:e.optionsDense,dark:x.value,role:"option","aria-selected":C===!0?"true":"false",id:`${l.targetUid.value}_${B}`,onClick:()=>{le(u)}};return p!==!0&&(h.value===B&&(k.focused=!0),q.platform.is.desktop===!0&&(k.onMousemove=()=>{a.value===!0&&ie(B)})),{index:B,opt:u,html:Y.value(u),label:P.value(u),selected:k.active,focused:k.focused,toggleOption:le,setOptionIndex:ie,itemProps:k}})}),be=g(()=>e.dropdownIcon!==void 0?e.dropdownIcon:q.iconSet.arrow.dropdown),Be=g(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Ve=g(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),j=g(()=>Re(e.optionValue,"value")),P=g(()=>Re(e.optionLabel,"label")),ae=g(()=>Re(e.optionDisable,"disable")),Oe=g(()=>o.value.map(t=>j.value(t))),ht=g(()=>{const t={onInput:tt,onChange:ke,onKeydown:Ge,onKeyup:Ye,onKeypress:Je,onFocus:We,onClick(n){F===!0&&fe(n)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=ke,t});me(o,t=>{A=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&l.innerLoading.value!==!0&&(T.value!==!0&&a.value!==!0||M.value!==!0)&&(N!==!0&&de(),(T.value===!0||a.value===!0)&&re(""))},{immediate:!0}),me(()=>e.fillInput,de),me(a,De),me(H,qt);function je(t){return e.emitValue===!0?j.value(t):t}function Le(t){if(t!==-1&&t<o.value.length)if(e.multiple===!0){const n=e.modelValue.slice();i("remove",{index:t,value:n.splice(t,1)[0]}),i("update:modelValue",n)}else i("update:modelValue",null)}function yt(t){Le(t),l.focus()}function Ue(t,n){const u=je(t);if(e.multiple!==!0){e.fillInput===!0&&Ce(P.value(t),!0,!0),i("update:modelValue",u);return}if(o.value.length===0){i("add",{index:0,value:u}),i("update:modelValue",e.multiple===!0?[u]:u);return}if(n===!0&&He(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const c=e.modelValue.slice();i("add",{index:c.length,value:u}),c.push(u),i("update:modelValue",c)}function le(t,n){if(l.editable.value!==!0||t===void 0||ae.value(t)===!0)return;const u=j.value(t);if(e.multiple!==!0){n!==!0&&(Ce(e.fillInput===!0?P.value(t):"",!0,!0),ue()),I.value!==null&&I.value.focus(),(o.value.length===0||pe(j.value(o.value[0]),u)!==!0)&&i("update:modelValue",e.emitValue===!0?u:t);return}if((F!==!0||_.value===!0)&&l.focus(),We(),o.value.length===0){const C=e.emitValue===!0?u:t;i("add",{index:0,value:C}),i("update:modelValue",e.multiple===!0?[C]:C);return}const c=e.modelValue.slice(),p=Oe.value.findIndex(C=>pe(C,u));if(p!==-1)i("remove",{index:p,value:c.splice(p,1)[0]});else{if(e.maxValues!==void 0&&c.length>=e.maxValues)return;const C=e.emitValue===!0?u:t;i("add",{index:c.length,value:C}),c.push(C)}i("update:modelValue",c)}function ie(t){if(q.platform.is.desktop!==!0)return;const n=t!==-1&&t<H.value?t:-1;h.value!==n&&(h.value=n)}function qe(t=1,n){if(a.value===!0){let u=h.value;do u=it(u+t,-1,H.value-1);while(u!==-1&&u!==h.value&&ae.value(e.options[u])===!0);h.value!==u&&(ie(u),oe(u),n!==!0&&e.useInput===!0&&e.fillInput===!0&&Ee(u>=0?P.value(e.options[u]):U,!0))}}function wt(t,n){const u=c=>pe(j.value(c),t);return e.options.find(u)||n.find(u)||t}function Re(t,n){const u=t!==void 0?t:n;return typeof u=="function"?u:c=>c!==null&&typeof c=="object"&&u in c?c[u]:c}function He(t){const n=j.value(t);return Oe.value.find(u=>pe(u,n))!==void 0}function We(t){e.useInput===!0&&I.value!==null&&(t===void 0||I.value===t.target&&t.target.value===f.value)&&I.value.select()}function Xe(t){$t(t,27)===!0&&a.value===!0&&(fe(t),ue(),de()),i("keyup",t)}function Ye(t){const{value:n}=t.target;if(t.keyCode!==void 0){Xe(t);return}if(t.target.value="",y!==null&&(clearTimeout(y),y=null),V!==null&&(clearTimeout(V),V=null),de(),typeof n=="string"&&n.length!==0){const u=n.toLocaleLowerCase(),c=C=>{const B=e.options.find(k=>C.value(k).toLocaleLowerCase()===u);return B===void 0?!1:(o.value.indexOf(B)===-1?le(B):ue(),!0)},p=C=>{c(j)!==!0&&(c(P)===!0||C===!0||re(n,!0,()=>p(!0)))};p()}else l.clearValue(t)}function Je(t){i("keypress",t)}function Ge(t){if(i("keydown",t),Qt(t)===!0)return;const n=m.value.length!==0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(h.value!==-1||n===!0);if(t.keyCode===27){Ne(t);return}if(t.keyCode===9&&u===!1){se();return}if(t.target===void 0||t.target.id!==l.targetUid.value||l.editable.value!==!0)return;if(t.keyCode===40&&l.innerLoading.value!==!0&&a.value===!1){ve(t),ce();return}if(t.keyCode===8&&(e.useChips===!0||e.clearable===!0)&&e.hideSelected!==!0&&m.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?Le(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&i("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof m.value!="string"||m.value.length===0)&&(ve(t),h.value=-1,qe(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&ne.value!==void 0&&(ve(t),h.value=Math.max(-1,Math.min(H.value,h.value+(t.keyCode===33?-1:1)*ne.value.view)),qe(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(ve(t),qe(t.keyCode===38?-1:1,e.multiple));const c=H.value;if((R===void 0||z<Date.now())&&(R=""),c>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||R.length!==0)){a.value!==!0&&ce(t);const p=t.key.toLocaleLowerCase(),C=R.length===1&&R[0]===p;z=Date.now()+1500,C===!1&&(ve(t),R+=p);const B=new RegExp("^"+R.split("").map(Pe=>ol.indexOf(Pe)!==-1?"\\"+Pe:Pe).join(".*"),"i");let k=h.value;if(C===!0||k<0||B.test(P.value(e.options[k]))!==!0)do k=it(k+1,-1,c-1);while(k!==h.value&&(ae.value(e.options[k])===!0||B.test(P.value(e.options[k]))!==!0));h.value!==k&&J(()=>{ie(k),oe(k),k>=0&&e.useInput===!0&&e.fillInput===!0&&Ee(P.value(e.options[k]),!0)});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||R!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&ve(t),h.value!==-1&&h.value<c){le(e.options[h.value]);return}if(n===!0){const p=(C,B)=>{if(B){if(st(B)!==!0)return}else B=e.newValueMode;if(Ce("",e.multiple!==!0,!0),C==null)return;(B==="toggle"?le:Ue)(C,B==="add-unique"),e.multiple!==!0&&(I.value!==null&&I.value.focus(),ue())};if(e.onNewValue!==void 0?i("newValue",m.value,p):p(m.value),e.multiple!==!0)return}a.value===!0?se():l.innerLoading.value!==!0&&ce()}}function Ze(){return F===!0?ge.value:X.value!==null&&X.value.contentEl!==null?X.value.contentEl:void 0}function bt(){return Ze()}function Vt(){return e.hideSelected===!0?[]:r["selected-item"]!==void 0?te.value.map(t=>r["selected-item"](t)).slice():r.selected!==void 0?[].concat(r.selected()):e.useChips===!0?te.value.map((t,n)=>w(Wt,{key:"option-"+n,removable:l.editable.value===!0&&ae.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:Q.value,onRemove(){t.removeAtIndex(n)}},()=>w("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:P.value(t.opt)}))):[w("span",{[Ie.value===!0?"innerHTML":"textContent"]:D.value})]}function et(){if(O.value===!0)return r["no-option"]!==void 0?r["no-option"]({inputValue:m.value}):void 0;const t=r.option!==void 0?r.option:u=>w(Gt,{key:u.index,...u.itemProps},()=>w(Yt,()=>w(Jt,()=>w("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let n=_e("div",Me.value.map(t));return r["before-options"]!==void 0&&(n=r["before-options"]().concat(n)),Ut(r["after-options"],n)}function Ct(t,n){const u=n===!0?{...Fe.value,...l.splitAttrs.attributes.value}:void 0,c={ref:n===!0?I:void 0,key:"i_t",class:S.value,style:e.inputStyle,value:m.value!==void 0?m.value:"",type:"search",...u,id:n===!0?l.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...ht.value};return t!==!0&&F===!0&&(Array.isArray(c.class)===!0?c.class=[...c.class,"no-pointer-events"]:c.class+=" no-pointer-events"),w("input",c)}function tt(t){y!==null&&(clearTimeout(y),y=null),V!==null&&(clearTimeout(V),V=null),!(t&&t.target&&t.target.qComposing===!0)&&(Ee(t.target.value||""),N=!0,U=m.value,l.focused.value!==!0&&(F!==!0||_.value===!0)&&l.focus(),e.onFilter!==void 0&&(y=setTimeout(()=>{y=null,re(m.value)},e.inputDebounce)))}function Ee(t,n){m.value!==t&&(m.value=t,n===!0||e.inputDebounce===0||e.inputDebounce==="0"?i("inputValue",t):V=setTimeout(()=>{V=null,i("inputValue",t)},e.inputDebounce))}function Ce(t,n,u){N=u!==!0,e.useInput===!0&&(Ee(t,!0),(n===!0||u!==!0)&&(U=t),n!==!0&&re(t))}function re(t,n,u){if(e.onFilter===void 0||n!==!0&&l.focused.value!==!0)return;l.innerLoading.value===!0?i("filterAbort"):(l.innerLoading.value=!0,s.value=!0),t!==""&&e.multiple!==!0&&o.value.length!==0&&N!==!0&&t===P.value(o.value[0])&&(t="");const c=setTimeout(()=>{a.value===!0&&(a.value=!1)},10);L!==null&&clearTimeout(L),L=c,i("filter",t,(p,C)=>{(n===!0||l.focused.value===!0)&&L===c&&(clearTimeout(L),typeof p=="function"&&p(),s.value=!1,J(()=>{l.innerLoading.value=!1,l.editable.value===!0&&(n===!0?a.value===!0&&ue():a.value===!0?De(!0):a.value=!0),typeof C=="function"&&J(()=>{C(b)}),typeof u=="function"&&J(()=>{u(b)})}))},()=>{l.focused.value===!0&&L===c&&(clearTimeout(L),l.innerLoading.value=!1,s.value=!1),a.value===!0&&(a.value=!1)})}function pt(){return w(Xt,{ref:X,class:v.value,style:e.popupContentStyle,modelValue:a.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&O.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:x.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,noRouteDismiss:e.popupNoRouteDismiss,square:Be.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...ee.value,onScrollPassive:ye,onBeforeShow:ut,onBeforeHide:xt,onShow:At},et)}function xt(t){nt(t),se()}function At(){we()}function kt(t){fe(t),I.value!==null&&I.value.focus(),_.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function zt(t){fe(t),J(()=>{_.value=!1})}function It(){const t=[w(el,{class:`col-auto ${l.fieldClass.value}`,...d.value,for:l.targetUid.value,dark:x.value,square:!0,loading:s.value,itemAligned:!1,filled:!0,stackLabel:m.value.length!==0,...l.splitAttrs.listeners.value,onFocus:kt,onBlur:zt},{...r,rawControl:()=>l.getControl(!0),before:void 0,after:void 0})];return a.value===!0&&t.push(w("div",{ref:ge,class:v.value+" scroll",style:e.popupContentStyle,...ee.value,onClick:Ne,onScrollPassive:ye},et())),w(jt,{ref:G,modelValue:T.value,position:e.useInput===!0?"top":void 0,transitionShow:W,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,noRouteDismiss:e.popupNoRouteDismiss,onBeforeShow:ut,onBeforeHide:Ft,onHide:Mt,onShow:Ot},()=>w("div",{class:"q-select__dialog"+(x.value===!0?" q-select__dialog--dark q-dark":"")+(_.value===!0?" q-select__dialog--focused":"")},t))}function Ft(t){nt(t),G.value!==null&&G.value.__updateRefocusTarget(l.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),l.focused.value=!1}function Mt(t){ue(),l.focused.value===!1&&i("blur",t),de()}function Ot(){const t=document.activeElement;(t===null||t.id!==l.targetUid.value)&&I.value!==null&&I.value!==t&&I.value.focus(),we()}function se(){T.value!==!0&&(h.value=-1,a.value===!0&&(a.value=!1),l.focused.value===!1&&(L!==null&&(clearTimeout(L),L=null),l.innerLoading.value===!0&&(i("filterAbort"),l.innerLoading.value=!1,s.value=!1)))}function ce(t){l.editable.value===!0&&(F===!0?(l.onControlFocusin(t),T.value=!0,J(()=>{l.focus()})):l.focus(),e.onFilter!==void 0?re(m.value):(O.value!==!0||r["no-option"]!==void 0)&&(a.value=!0))}function ue(){T.value=!1,se()}function de(){e.useInput===!0&&Ce(e.multiple!==!0&&e.fillInput===!0&&o.value.length!==0&&P.value(o.value[0])||"",!0,!0)}function De(t){let n=-1;if(t===!0){if(o.value.length!==0){const u=j.value(o.value[0]);n=e.options.findIndex(c=>pe(j.value(c),u))}$(n)}ie(n)}function qt(t,n){a.value===!0&&l.innerLoading.value===!1&&($(-1,!0),J(()=>{a.value===!0&&l.innerLoading.value===!1&&(t>n?$():De(!0))}))}function lt(){T.value===!1&&X.value!==null&&X.value.updatePosition()}function ut(t){t!==void 0&&fe(t),i("popupShow",t),l.hasPopupOpen=!0,l.onControlFocusin(t)}function nt(t){t!==void 0&&fe(t),i("popupHide",t),l.hasPopupOpen=!1,l.onControlFocusout(t)}function ot(){F=q.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?r["no-option"]!==void 0||e.onFilter!==void 0||O.value===!1:!0),W=q.platform.is.ios===!0&&F===!0&&e.useInput===!0?"fade":e.transitionShow}return Dt(ot),Pt(lt),ot(),vt(()=>{y!==null&&clearTimeout(y),V!==null&&clearTimeout(V)}),Object.assign(b,{showPopup:ce,hidePopup:ue,removeAtIndex:Le,add:Ue,toggleOption:le,getOptionIndex:()=>h.value,setOptionIndex:ie,moveOptionSelection:qe,filter:re,updateMenuPosition:lt,updateInputValue:Ce,isOptionSelected:He,getEmittingOptionValue:je,isOptionDisabled:(...t)=>ae.value.apply(null,t)===!0,getOptionValue:(...t)=>j.value.apply(null,t),getOptionLabel:(...t)=>P.value.apply(null,t)}),Object.assign(l,{innerValue:o,fieldClass:g(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:Ae,targetRef:I,hasValue:M,showPopup:ce,floatingLabel:g(()=>e.hideSelected!==!0&&M.value===!0||typeof m.value=="number"||m.value.length!==0||at(e.displayValue)),getControlChild:()=>{if(l.editable.value!==!1&&(T.value===!0||O.value!==!0||r["no-option"]!==void 0))return F===!0?It():pt();l.hasPopupOpen===!0&&(l.hasPopupOpen=!1)},controlEvents:{onFocusin(t){l.onControlFocusin(t)},onFocusout(t){l.onControlFocusout(t,()=>{de(),se()})},onClick(t){if(Ne(t),F!==!0&&a.value===!0){se(),I.value!==null&&I.value.focus();return}ce(t)}},getControl:t=>{const n=Vt(),u=t===!0||T.value!==!0||F!==!0;if(e.useInput===!0)n.push(Ct(t,u));else if(l.editable.value===!0){const p=u===!0?Fe.value:void 0;n.push(w("input",{ref:u===!0?I:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?l.targetUid.value:void 0,value:D.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...p,onKeydown:Ge,onKeyup:Xe,onKeypress:Je})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length!==0&&n.push(w("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Ye}))}if(Z.value!==void 0&&e.disable!==!0&&Oe.value.length!==0){const p=Oe.value.map(C=>w("option",{value:C,selected:!0}));n.push(w("select",{class:"hidden",name:Z.value,multiple:e.multiple},p))}const c=e.useInput===!0||u!==!0?void 0:l.splitAttrs.attributes.value;return w("div",{class:"q-field__native row items-center",...c,...l.splitAttrs.listeners.value},n)},getInnerAppend:()=>e.loading!==!0&&s.value!==!0&&e.hideDropdownIcon!==!0?[w(Nt,{class:"q-select__dropdown-icon"+(a.value===!0?" rotate-180":""),name:be.value})]:null}),dt(l)}});export{cl as Q,fl as a,nl as b,dl as c,ul as u};