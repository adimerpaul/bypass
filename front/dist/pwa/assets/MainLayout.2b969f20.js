import{c as K,a as v,h as Q,d as we,i as _e,e as M,r as V,w,o as Ce,f as ot,g as xe,l as qe,j as rt,k as lt,m as ut,n as Y,p as it,q as nt,s as ee,t as ce,v as Oe,x as de,y as ge,z as fe,A as st,B as ct,C as dt,E as ft,F as vt,G as ht,H as mt,I as pt,J as yt,K as Qe,L as R,M as Ve,O as bt,_ as gt,P as wt,Q as D,R as T,S as c,T as i,U as ve,V as De,W as he,X as F,Y as N,Z as me,$ as _t,a0 as Ct,a1 as xt,a2 as qt,a3 as j,a4 as $e}from"./index.da022f16.js";import{Q as kt}from"./QBadge.8c6851a6.js";import{Q as Te,a as W,b as O,c as P}from"./QList.f7560650.js";import{c as Bt,b as te,Q as St}from"./format.1b4169b6.js";import{Q as Ie,a as Me,b as zt}from"./QPageContainer.6b67786f.js";import{Q as Lt}from"./QImg.5abd0571.js";import{Q as pe}from"./QChip.50ed125e.js";var Ot=K({name:"QToolbarTitle",props:{shrink:Boolean},setup(t,{slots:r}){const n=v(()=>"q-toolbar__title ellipsis"+(t.shrink===!0?" col-shrink":""));return()=>Q("div",{class:n.value},we(r.default))}}),Qt=K({name:"QToolbar",props:{inset:Boolean},setup(t,{slots:r}){const n=v(()=>"q-toolbar row no-wrap items-center"+(t.inset===!0?" q-toolbar--inset":""));return()=>Q("div",{class:n.value,role:"toolbar"},we(r.default))}}),Ae=K({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(t,{slots:r,emit:n}){const{proxy:{$q:_}}=xe(),e=_e(qe,M);if(e===M)return console.error("QHeader needs to be child of QLayout"),M;const a=V(parseInt(t.heightHint,10)),u=V(!0),s=v(()=>t.reveal===!0||e.view.value.indexOf("H")!==-1||_.platform.is.ios&&e.isContainer.value===!0),p=v(()=>{if(t.modelValue!==!0)return 0;if(s.value===!0)return u.value===!0?a.value:0;const f=a.value-e.scroll.value.position;return f>0?f:0}),d=v(()=>t.modelValue!==!0||s.value===!0&&u.value!==!0),l=v(()=>t.modelValue===!0&&d.value===!0&&t.reveal===!0),B=v(()=>"q-header q-layout__section--marginal "+(s.value===!0?"fixed":"absolute")+"-top"+(t.bordered===!0?" q-header--bordered":"")+(d.value===!0?" q-header--hidden":"")+(t.modelValue!==!0?" q-layout--prevent-focus":"")),q=v(()=>{const f=e.rows.value.top,z={};return f[0]==="l"&&e.left.space===!0&&(z[_.lang.rtl===!0?"right":"left"]=`${e.left.size}px`),f[2]==="r"&&e.right.space===!0&&(z[_.lang.rtl===!0?"left":"right"]=`${e.right.size}px`),z});function b(f,z){e.update("header",f,z)}function y(f,z){f.value!==z&&(f.value=z)}function x({height:f}){y(a,f),b("size",f)}function C(f){l.value===!0&&y(u,!0),n("focusin",f)}w(()=>t.modelValue,f=>{b("space",f),y(u,!0),e.animate()}),w(p,f=>{b("offset",f)}),w(()=>t.reveal,f=>{f===!1&&y(u,t.modelValue)}),w(u,f=>{e.animate(),n("reveal",f)}),w(e.scroll,f=>{t.reveal===!0&&y(u,f.direction==="up"||f.position<=t.revealOffset||f.position-f.inflectionPoint<100)});const g={};return e.instances.header=g,t.modelValue===!0&&b("size",a.value),b("space",t.modelValue),b("offset",p.value),Ce(()=>{e.instances.header===g&&(e.instances.header=void 0,b("size",0),b("offset",0),b("space",!1))}),()=>{const f=ot(r.default,[]);return t.elevated===!0&&f.push(Q("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),f.push(Q(Ie,{debounce:0,onResize:x})),Q("header",{class:B.value,style:q.value,onFocusin:C},f)}}}),Vt=K({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(t,{slots:r,emit:n}){const{proxy:{$q:_}}=xe(),e=_e(qe,M);if(e===M)return console.error("QFooter needs to be child of QLayout"),M;const a=V(parseInt(t.heightHint,10)),u=V(!0),s=V(rt.value===!0||e.isContainer.value===!0?0:window.innerHeight),p=v(()=>t.reveal===!0||e.view.value.indexOf("F")!==-1||_.platform.is.ios&&e.isContainer.value===!0),d=v(()=>e.isContainer.value===!0?e.containerHeight.value:s.value),l=v(()=>{if(t.modelValue!==!0)return 0;if(p.value===!0)return u.value===!0?a.value:0;const h=e.scroll.value.position+d.value+a.value-e.height.value;return h>0?h:0}),B=v(()=>t.modelValue!==!0||p.value===!0&&u.value!==!0),q=v(()=>t.modelValue===!0&&B.value===!0&&t.reveal===!0),b=v(()=>"q-footer q-layout__section--marginal "+(p.value===!0?"fixed":"absolute")+"-bottom"+(t.bordered===!0?" q-footer--bordered":"")+(B.value===!0?" q-footer--hidden":"")+(t.modelValue!==!0?" q-layout--prevent-focus"+(p.value!==!0?" hidden":""):"")),y=v(()=>{const h=e.rows.value.bottom,k={};return h[0]==="l"&&e.left.space===!0&&(k[_.lang.rtl===!0?"right":"left"]=`${e.left.size}px`),h[2]==="r"&&e.right.space===!0&&(k[_.lang.rtl===!0?"left":"right"]=`${e.right.size}px`),k});function x(h,k){e.update("footer",h,k)}function C(h,k){h.value!==k&&(h.value=k)}function g({height:h}){C(a,h),x("size",h)}function f(){if(t.reveal!==!0)return;const{direction:h,position:k,inflectionPoint:ae}=e.scroll.value;C(u,h==="up"||k-ae<100||e.height.value-d.value-k-a.value<300)}function z(h){q.value===!0&&C(u,!0),n("focusin",h)}w(()=>t.modelValue,h=>{x("space",h),C(u,!0),e.animate()}),w(l,h=>{x("offset",h)}),w(()=>t.reveal,h=>{h===!1&&C(u,t.modelValue)}),w(u,h=>{e.animate(),n("reveal",h)}),w([a,e.scroll,e.height],f),w(()=>_.screen.height,h=>{e.isContainer.value!==!0&&C(s,h)});const U={};return e.instances.footer=U,t.modelValue===!0&&x("size",a.value),x("space",t.modelValue),x("offset",l.value),Ce(()=>{e.instances.footer===U&&(e.instances.footer=void 0,x("size",0),x("offset",0),x("space",!1))}),()=>{const h=lt(r.default,[Q(Ie,{debounce:0,onResize:g})]);return t.elevated===!0&&h.push(Q("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),Q("footer",{class:b.value,style:y.value,onFocusin:z},h)}}});const ke={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Dt=Object.keys(ke);ke.all=!0;function Ee(t){const r={};for(const n of Dt)t[n]===!0&&(r[n]=!0);return Object.keys(r).length===0?ke:(r.horizontal===!0?r.left=r.right=!0:r.left===!0&&r.right===!0&&(r.horizontal=!0),r.vertical===!0?r.up=r.down=!0:r.up===!0&&r.down===!0&&(r.vertical=!0),r.horizontal===!0&&r.vertical===!0&&(r.all=!0),r)}const $t=["INPUT","TEXTAREA"];function Pe(t,r){return r.event===void 0&&t.target!==void 0&&t.target.draggable!==!0&&typeof r.handler=="function"&&$t.includes(t.target.nodeName.toUpperCase())===!1&&(t.qClonedBy===void 0||t.qClonedBy.indexOf(r.uid)===-1)}function ye(t,r,n){const _=ge(t);let e,a=_.left-r.event.x,u=_.top-r.event.y,s=Math.abs(a),p=Math.abs(u);const d=r.direction;d.horizontal===!0&&d.vertical!==!0?e=a<0?"left":"right":d.horizontal!==!0&&d.vertical===!0?e=u<0?"up":"down":d.up===!0&&u<0?(e="up",s>p&&(d.left===!0&&a<0?e="left":d.right===!0&&a>0&&(e="right"))):d.down===!0&&u>0?(e="down",s>p&&(d.left===!0&&a<0?e="left":d.right===!0&&a>0&&(e="right"))):d.left===!0&&a<0?(e="left",s<p&&(d.up===!0&&u<0?e="up":d.down===!0&&u>0&&(e="down"))):d.right===!0&&a>0&&(e="right",s<p&&(d.up===!0&&u<0?e="up":d.down===!0&&u>0&&(e="down")));let l=!1;if(e===void 0&&n===!1){if(r.event.isFirst===!0||r.event.lastDir===void 0)return{};e=r.event.lastDir,l=!0,e==="left"||e==="right"?(_.left-=a,s=0,a=0):(_.top-=u,p=0,u=0)}return{synthetic:l,payload:{evt:t,touch:r.event.mouse!==!0,mouse:r.event.mouse===!0,position:_,direction:e,isFirst:r.event.isFirst,isFinal:n===!0,duration:Date.now()-r.event.time,distance:{x:s,y:p},offset:{x:a,y:u},delta:{x:_.left-r.event.lastX,y:_.top-r.event.lastY}}}}let Tt=0;var be=ut({name:"touch-pan",beforeMount(t,{value:r,modifiers:n}){if(n.mouse!==!0&&Y.has.touch!==!0)return;function _(a,u){n.mouse===!0&&u===!0?st(a):(n.stop===!0&&de(a),n.prevent===!0&&Oe(a))}const e={uid:"qvtp_"+Tt++,handler:r,modifiers:n,direction:Ee(n),noop:it,mouseStart(a){Pe(a,e)&&nt(a)&&(ee(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(a,!0))},touchStart(a){if(Pe(a,e)){const u=a.target;ee(e,"temp",[[u,"touchmove","move","notPassiveCapture"],[u,"touchcancel","end","passiveCapture"],[u,"touchend","end","passiveCapture"]]),e.start(a)}},start(a,u){if(Y.is.firefox===!0&&ce(t,!0),e.lastEvt=a,u===!0||n.stop===!0){if(e.direction.all!==!0&&(u!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const d=a.type.indexOf("mouse")!==-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&Oe(d),a.cancelBubble===!0&&de(d),Object.assign(d,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[e.uid]:a.qClonedBy.concat(e.uid)}),e.initialEvent={target:a.target,event:d}}de(a)}const{left:s,top:p}=ge(a);e.event={x:s,y:p,time:Date.now(),mouse:u===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:s,lastY:p}},move(a){if(e.event===void 0)return;const u=ge(a),s=u.left-e.event.x,p=u.top-e.event.y;if(s===0&&p===0)return;e.lastEvt=a;const d=e.event.mouse===!0,l=()=>{_(a,d);let b;n.preserveCursor!==!0&&n.preservecursor!==!0&&(b=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),d===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Bt(),e.styleCleanup=y=>{if(e.styleCleanup=void 0,b!==void 0&&(document.documentElement.style.cursor=b),document.body.classList.remove("non-selectable"),d===!0){const x=()=>{document.body.classList.remove("no-pointer-events--children")};y!==void 0?setTimeout(()=>{x(),y()},50):x()}else y!==void 0&&y()}};if(e.event.detected===!0){e.event.isFirst!==!0&&_(a,e.event.mouse);const{payload:b,synthetic:y}=ye(a,e,!1);b!==void 0&&(e.handler(b)===!1?e.end(a):(e.styleCleanup===void 0&&e.event.isFirst===!0&&l(),e.event.lastX=b.position.left,e.event.lastY=b.position.top,e.event.lastDir=y===!0?void 0:b.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||d===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){l(),e.event.detected=!0,e.move(a);return}const B=Math.abs(s),q=Math.abs(p);B!==q&&(e.direction.horizontal===!0&&B>q||e.direction.vertical===!0&&B<q||e.direction.up===!0&&B<q&&p<0||e.direction.down===!0&&B<q&&p>0||e.direction.left===!0&&B>q&&s<0||e.direction.right===!0&&B>q&&s>0?(e.event.detected=!0,e.move(a)):e.end(a,!0))},end(a,u){if(e.event!==void 0){if(fe(e,"temp"),Y.is.firefox===!0&&ce(t,!1),u===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(ye(a===void 0?e.lastEvt:a,e).payload);const{payload:s}=ye(a===void 0?e.lastEvt:a,e,!0),p=()=>{e.handler(s)};e.styleCleanup!==void 0?e.styleCleanup(p):p()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(t.__qtouchpan=e,n.mouse===!0){const a=n.mouseCapture===!0||n.mousecapture===!0?"Capture":"";ee(e,"main",[[t,"mousedown","mouseStart",`passive${a}`]])}Y.has.touch===!0&&ee(e,"main",[[t,"touchstart","touchStart",`passive${n.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,r){const n=t.__qtouchpan;n!==void 0&&(r.oldValue!==r.value&&(typeof value!="function"&&n.end(),n.handler=r.value),n.direction=Ee(r.modifiers))},beforeUnmount(t){const r=t.__qtouchpan;r!==void 0&&(r.event!==void 0&&r.end(),fe(r,"main"),fe(r,"temp"),Y.is.firefox===!0&&ce(t,!1),r.styleCleanup!==void 0&&r.styleCleanup(),delete t.__qtouchpan)}});const Fe=150;var Mt=K({name:"QDrawer",inheritAttrs:!1,props:{...ct,...dt,side:{type:String,default:"left",validator:t=>["left","right"].includes(t)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:t=>["default","desktop","mobile"].includes(t),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...ft,"onLayout","miniState"],setup(t,{slots:r,emit:n,attrs:_}){const e=xe(),{proxy:{$q:a}}=e,u=vt(t,a),{preventBodyScroll:s}=bt(),{registerTimeout:p,removeTimeout:d}=ht(),l=_e(qe,M);if(l===M)return console.error("QDrawer needs to be child of QLayout"),M;let B,q=null,b;const y=V(t.behavior==="mobile"||t.behavior!=="desktop"&&l.totalWidth.value<=t.breakpoint),x=v(()=>t.mini===!0&&y.value!==!0),C=v(()=>x.value===!0?t.miniWidth:t.width),g=V(t.showIfAbove===!0&&y.value===!1?!0:t.modelValue===!0),f=v(()=>t.persistent!==!0&&(y.value===!0||Ne.value===!0));function z(o,m){if(ae(),o!==!1&&l.animate(),L(0),y.value===!0){const S=l.instances[J.value];S!==void 0&&S.belowBreakpoint===!0&&S.hide(!1),A(1),l.isContainer.value!==!0&&s(!0)}else A(0),o!==!1&&ie(!1);p(()=>{o!==!1&&ie(!0),m!==!0&&n("show",o)},Fe)}function U(o,m){He(),o!==!1&&l.animate(),A(0),L(I.value*C.value),ne(),m!==!0?p(()=>{n("hide",o)},Fe):d()}const{show:h,hide:k}=mt({showing:g,hideOnRouteChange:f,handleShow:z,handleHide:U}),{addToHistory:ae,removeFromHistory:He}=pt(g,k,f),G={belowBreakpoint:y,hide:k},$=v(()=>t.side==="right"),I=v(()=>(a.lang.rtl===!0?-1:1)*($.value===!0?1:-1)),Be=V(0),H=V(!1),oe=V(!1),Se=V(C.value*I.value),J=v(()=>$.value===!0?"left":"right"),re=v(()=>g.value===!0&&y.value===!1&&t.overlay===!1?t.miniToOverlay===!0?t.miniWidth:C.value:0),le=v(()=>t.overlay===!0||t.miniToOverlay===!0||l.view.value.indexOf($.value?"R":"L")!==-1||a.platform.is.ios===!0&&l.isContainer.value===!0),X=v(()=>t.overlay===!1&&g.value===!0&&y.value===!1),Ne=v(()=>t.overlay===!0&&g.value===!0&&y.value===!1),We=v(()=>"fullscreen q-drawer__backdrop"+(g.value===!1&&H.value===!1?" hidden":"")),Re=v(()=>({backgroundColor:`rgba(0,0,0,${Be.value*.4})`})),ze=v(()=>$.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),Ue=v(()=>$.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),Xe=v(()=>{const o={};return l.header.space===!0&&ze.value===!1&&(le.value===!0?o.top=`${l.header.offset}px`:l.header.space===!0&&(o.top=`${l.header.size}px`)),l.footer.space===!0&&Ue.value===!1&&(le.value===!0?o.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(o.bottom=`${l.footer.size}px`)),o}),Ye=v(()=>{const o={width:`${C.value}px`,transform:`translateX(${Se.value}px)`};return y.value===!0?o:Object.assign(o,Xe.value)}),je=v(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),Ke=v(()=>`q-drawer q-drawer--${t.side}`+(oe.value===!0?" q-drawer--mini-animate":"")+(t.bordered===!0?" q-drawer--bordered":"")+(u.value===!0?" q-drawer--dark q-dark":"")+(H.value===!0?" no-transition":g.value===!0?"":" q-layout--prevent-focus")+(y.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${x.value===!0?"mini":"standard"}`+(le.value===!0||X.value!==!0?" fixed":"")+(t.overlay===!0||t.miniToOverlay===!0?" q-drawer--on-top":"")+(ze.value===!0?" q-drawer--top-padding":""))),Ge=v(()=>{const o=a.lang.rtl===!0?t.side:J.value;return[[be,tt,void 0,{[o]:!0,mouse:!0}]]}),Je=v(()=>{const o=a.lang.rtl===!0?J.value:t.side;return[[be,Le,void 0,{[o]:!0,mouse:!0}]]}),Ze=v(()=>{const o=a.lang.rtl===!0?J.value:t.side;return[[be,Le,void 0,{[o]:!0,mouse:!0,mouseAllDir:!0}]]});function ue(){at(y,t.behavior==="mobile"||t.behavior!=="desktop"&&l.totalWidth.value<=t.breakpoint)}w(y,o=>{o===!0?(B=g.value,g.value===!0&&k(!1)):t.overlay===!1&&t.behavior!=="mobile"&&B!==!1&&(g.value===!0?(L(0),A(0),ne()):h(!1))}),w(()=>t.side,(o,m)=>{l.instances[m]===G&&(l.instances[m]=void 0,l[m].space=!1,l[m].offset=0),l.instances[o]=G,l[o].size=C.value,l[o].space=X.value,l[o].offset=re.value}),w(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&ue()}),w(()=>t.behavior+t.breakpoint,ue),w(l.isContainer,o=>{g.value===!0&&s(o!==!0),o===!0&&ue()}),w(l.scrollbarWidth,()=>{L(g.value===!0?0:void 0)}),w(re,o=>{E("offset",o)}),w(X,o=>{n("onLayout",o),E("space",o)}),w($,()=>{L()}),w(C,o=>{L(),se(t.miniToOverlay,o)}),w(()=>t.miniToOverlay,o=>{se(o,C.value)}),w(()=>a.lang.rtl,()=>{L()}),w(()=>t.mini,()=>{t.noMiniAnimation||t.modelValue===!0&&(et(),l.animate())}),w(x,o=>{n("miniState",o)});function L(o){o===void 0?Qe(()=>{o=g.value===!0?0:C.value,L(I.value*o)}):(l.isContainer.value===!0&&$.value===!0&&(y.value===!0||Math.abs(o)===C.value)&&(o+=I.value*l.scrollbarWidth.value),Se.value=o)}function A(o){Be.value=o}function ie(o){const m=o===!0?"remove":l.isContainer.value!==!0?"add":"";m!==""&&document.body.classList[m]("q-body--drawer-toggle")}function et(){q!==null&&clearTimeout(q),e.proxy&&e.proxy.$el&&e.proxy.$el.classList.add("q-drawer--mini-animate"),oe.value=!0,q=setTimeout(()=>{q=null,oe.value=!1,e&&e.proxy&&e.proxy.$el&&e.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function tt(o){if(g.value!==!1)return;const m=C.value,S=te(o.distance.x,0,m);if(o.isFinal===!0){S>=Math.min(75,m)===!0?h():(l.animate(),A(0),L(I.value*m)),H.value=!1;return}L((a.lang.rtl===!0?$.value!==!0:$.value)?Math.max(m-S,0):Math.min(0,S-m)),A(te(S/m,0,1)),o.isFirst===!0&&(H.value=!0)}function Le(o){if(g.value!==!0)return;const m=C.value,S=o.direction===t.side,Z=(a.lang.rtl===!0?S!==!0:S)?te(o.distance.x,0,m):0;if(o.isFinal===!0){Math.abs(Z)<Math.min(75,m)===!0?(l.animate(),A(1),L(0)):k(),H.value=!1;return}L(I.value*Z),A(te(1-Z/m,0,1)),o.isFirst===!0&&(H.value=!0)}function ne(){s(!1),ie(!0)}function E(o,m){l.update(t.side,o,m)}function at(o,m){o.value!==m&&(o.value=m)}function se(o,m){E("size",o===!0?t.miniWidth:m)}return l.instances[t.side]=G,se(t.miniToOverlay,C.value),E("space",X.value),E("offset",re.value),t.showIfAbove===!0&&t.modelValue!==!0&&g.value===!0&&t["onUpdate:modelValue"]!==void 0&&n("update:modelValue",!0),yt(()=>{n("onLayout",X.value),n("miniState",x.value),B=t.showIfAbove===!0;const o=()=>{(g.value===!0?z:U)(!1,!0)};if(l.totalWidth.value!==0){Qe(o);return}b=w(l.totalWidth,()=>{b(),b=void 0,g.value===!1&&t.showIfAbove===!0&&y.value===!1?h(!1):o()})}),Ce(()=>{b!==void 0&&b(),q!==null&&(clearTimeout(q),q=null),g.value===!0&&ne(),l.instances[t.side]===G&&(l.instances[t.side]=void 0,E("size",0),E("offset",0),E("space",!1))}),()=>{const o=[];y.value===!0&&(t.noSwipeOpen===!1&&o.push(R(Q("div",{key:"open",class:`q-drawer__opener fixed-${t.side}`,"aria-hidden":"true"}),Ge.value)),o.push(Ve("div",{ref:"backdrop",class:We.value,style:Re.value,"aria-hidden":"true",onClick:k},void 0,"backdrop",t.noSwipeBackdrop!==!0&&g.value===!0,()=>Ze.value)));const m=x.value===!0&&r.mini!==void 0,S=[Q("div",{..._,key:""+m,class:[je.value,_.class]},m===!0?r.mini():we(r.default))];return t.elevated===!0&&g.value===!0&&S.push(Q("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(Ve("aside",{ref:"content",class:Ke.value,style:Ye.value},S,"contentclose",t.noSwipeClose!==!0&&y.value===!0,()=>Je.value)),Q("div",{class:"q-drawer-container"},o)}}});const At={data(){return{leftDrawerOpen:!1,essentialLinks:[{title:"Inicio",icon:"home",to:"/"},{title:"Ventas",icon:"shopping_basket",to:"/sales"},{title:"Insumos",icon:"inventory_2",to:"/supplies"},{title:"Transacciones",icon:"shopping_cart",to:"/purchases"},{title:"Historial",icon:"history",to:"/history"},{title:"Diarios",icon:"assignment",to:"/diaries"},{title:"Productos",icon:"shopping_cart",to:"/products"},{title:"Usuarios",icon:"people",to:"/users"},{title:"Clientes",icon:"person",to:"/clients"}]}},methods:{textCapitalize(t){if(!t)return"";const r=t.toLowerCase();return t.charAt(0).toUpperCase()+r.slice(1)},toggleLeftDrawer(){this.leftDrawerOpen=!this.leftDrawerOpen},logout(){this.$alert.dialog("\xBFEst\xE1 seguro que desea cerrar sesi\xF3n?").onOk(()=>{this.$axios.post("/logout").then(()=>{this.$store.isLogeed=!1,this.$store.user={},localStorage.removeItem("tokenPrestamos"),this.$router.push("/login")})})}},computed:{rutaActual(){return this.$route.path},title(){const t=this.$route.path;return t==="/"?"Inicio":t==="/users"?"Usuarios":t==="/clients"?"Clientes":t==="/products"?"Productos":t==="/sales"?"Ventas":t==="/supplies"?"Insumos":t==="/purchases"?"Compras":t==="/diaries"?"Diarios":"Inicio"}}},Et={class:"text-black text-bold"};function Pt(t,r,n,_,e,a){const u=wt("router-view");return D(),T(Me,{view:"lHh Lpr lFf"},{default:c(()=>[i(Ae,{class:"bg-white text-black",bordered:""},{default:c(()=>[i(Qt,null,{default:c(()=>[i(ve,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:a.toggleLeftDrawer},null,8,["onClick"]),i(Ot,null,{default:c(()=>[De("div",Et,he(a.title),1)]),_:1}),De("div",null,[i(ve,{flat:"",dense:"",icon:"o_notifications","aria-label":"Notificaciones"},{default:c(()=>[i(kt,{color:"primary","text-color":"white",floating:""},{default:c(()=>[F("3")]),_:1})]),_:1}),i(ve,{flat:"",dense:"",icon:"o_account_circle","aria-label":"Menu",label:a.textCapitalize(t.$store.user.name),"no-caps":"","icon-right":"arrow_drop_down"},{default:c(()=>[i(St,null,{default:c(()=>[i(Te,null,{default:c(()=>[R((D(),T(W,{clickable:""},{default:c(()=>[i(O,{avatar:""},{default:c(()=>[i(N,{icon:"account_circle"})]),_:1}),i(O,null,{default:c(()=>[i(P,null,{default:c(()=>[F("Perfil")]),_:1})]),_:1})]),_:1})),[[j]]),R((D(),T(W,{clickable:""},{default:c(()=>[i(O,{avatar:""},{default:c(()=>[i(N,{icon:"settings"})]),_:1}),i(O,null,{default:c(()=>[i(P,null,{default:c(()=>[F("Configuraci\xF3n")]),_:1})]),_:1})]),_:1})),[[j]]),R((D(),T(W,{clickable:"",onClick:a.logout},{default:c(()=>[i(O,{avatar:""},{default:c(()=>[i(N,{icon:"logout"})]),_:1}),i(O,null,{default:c(()=>[i(P,null,{default:c(()=>[F("Cerrar Sesi\xF3n")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[j]])]),_:1})]),_:1})]),_:1},8,["label"])])]),_:1})]),_:1}),i(Mt,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":r[0]||(r[0]=s=>e.leftDrawerOpen=s),"show-if-above":"",width:220,class:"bg-primary text-white"},{default:c(()=>[i(Me,null,{default:c(()=>[i(Ae,null,{default:c(()=>[i(Te,null,{default:c(()=>[i(P,{class:"q-pa-xs"},{default:c(()=>[i(W,{dense:""},{default:c(()=>[i(O,{avatar:""},{default:c(()=>[i(N,{class:"bg-white","text-color":"primary",size:"45px"},{default:c(()=>[i(Lt,{src:"/logo.png"})]),_:1})]),_:1}),i(O,null,{default:c(()=>[i(P,{class:"text-white text-bold"},{default:c(()=>{var s,p,d;return[((s=t.$store.user)==null?void 0:s.role)==="VENDEDOR"?(D(),T(pe,{key:0,dense:"",label:"Vendedor",color:"orange","text-color":"white",icon:"account_circle"})):me("",!0),((p=t.$store.user)==null?void 0:p.role)==="ADMIN"?(D(),T(pe,{key:1,dense:"",label:"Admin",color:"indigo","text-color":"white",icon:"account_circle"})):me("",!0),((d=t.$store.user)==null?void 0:d.role)==="SUPERADMIN"?(D(),T(pe,{key:2,dense:"",label:"Super admin",color:"purple","text-color":"white",icon:"account_circle"})):me("",!0)]}),_:1}),i(P,{caption:"",class:"text-white"},{default:c(()=>[F(he(t.$store.user.name),1)]),_:1})]),_:1})]),_:1})]),_:1}),i(_t,{dark:""}),(D(!0),Ct(qt,null,xt(e.essentialLinks,s=>R((D(),T(W,{clickable:"",dense:"",key:s.title,to:s.to,exact:"",class:$e(`text-white ${a.rutaActual==s.to?"bg-secondary":""}`)},{default:c(()=>[i(O,{avatar:""},{default:c(()=>[i(N,{"text-color":"white",icon:`${a.rutaActual==s.to?s.icon:"o_"+s.icon}`,size:`${a.rutaActual==s.to?"45px":"38px"}`},null,8,["icon","size"])]),_:2},1024),i(O,null,{default:c(()=>[i(P,{class:$e(`text-white ${a.rutaActual==s.to?"text-bold":""}`)},{default:c(()=>[F(he(s.title),1)]),_:2},1032,["class"])]),_:2},1024)]),_:2},1032,["to","class"])),[[j]])),128))]),_:1})]),_:1}),i(Vt,null,{default:c(()=>[R((D(),T(W,{clickable:"",dense:"",onClick:a.logout},{default:c(()=>[i(O,{avatar:""},{default:c(()=>[i(N,{"text-color":"white",icon:"logout",size:"38px"})]),_:1}),i(O,null,{default:c(()=>[i(P,{class:"text-white text-bold"},{default:c(()=>[F("Cerrar Sesi\xF3n")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[j]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(zt,null,{default:c(()=>[i(u)]),_:1})]),_:1})}var Yt=gt(At,[["render",Pt]]);export{Yt as default};