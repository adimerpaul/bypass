import{_ as w,P as I,Q as i,R as d,S as a,T as o,aB as f,V as l,aC as p,U as c,a0 as v,a1 as G,a2 as S,aD as x,aE as U,aF as A,L as k,at as C,X as Q,a3 as V,Z as m,W as u}from"./index.da022f16.js";import{a as D,b as g}from"./QList.f7560650.js";import{Q as B}from"./QBtnDropdown.2bed3d2b.js";import{Q as _}from"./QChip.50ed125e.js";import{Q as F}from"./QMarkupTable.e6d5c36e.js";import{Q as O}from"./QSpace.a3d21b38.js";import{Q as N}from"./QSelect.cd214b3a.js";import{Q as q}from"./QForm.8b2be9ca.js";import{Q as Y}from"./QPage.dd58d8e9.js";import{h as y}from"./moment.40bc58bf.js";import{C as R}from"./Card2Component.88ad8ec1.js";import"./format.1b4169b6.js";const P={name:"IndexPage",components:{Card2Component:R},data(){return{loading:!1,fechaInicio:y().format("YYYY-MM-DD"),fechaFin:y().format("YYYY-MM-DD"),sales:[],egresoDialog:!1,egreso:{},provedores:[]}},mounted(){this.salesGet(),this.provedoresGet()},methods:{egresoPost(){this.loading=!0,this.$axios.post("/egresos",this.egreso).then(s=>{this.$alert.success("Egreso registrado"),this.salesGet(),this.egresoDialog=!1}).catch(s=>{console.error(s),this.$alert.error("Error al registrar el egreso")}).finally(()=>{this.loading=!1})},provedoresGet(){this.$axios.get("/provedores").then(s=>{this.provedores=s.data}).catch(s=>{console.error(s)})},egreseClick(){this.egresoDialog=!0,this.egreso={total:"",provedor_id:"",descripcion:""}},reimprimir(s){console.log("reimprimir",s)},anular(s){this.$alert.confirm("\xBFEst\xE1 seguro de anular la venta?").onOk(()=>{this.$axios.post("saleAnular",{id:s.id}).then(t=>{this.$alert.success("Venta anulada"),this.salesGet()}).catch(t=>{console.error(t),this.$alert.error("Error al anular la venta")})})},salesGet(){this.loading=!0,this.$axios.get("/sales",{params:{fechaInicio:this.fechaInicio,fechaFin:this.fechaFin}}).then(s=>{this.sales=s.data}).catch(s=>{console.error(s)}).finally(()=>{this.loading=!1})}},computed:{ingresos(){let s=0;return this.sales.forEach(t=>{t.type==="INGRESO"&&t.status!=="ANULADO"&&(s+=t.total)}),s},egresos(){let s=0;return this.sales.forEach(t=>{t.type==="EGRESO"&&t.status!=="ANULADO"&&(s+=t.total)}),s},utilidad(){return this.ingresos-this.egresos}}},L={class:"row"},M={class:"col-12 col-md-2"},T={class:"col-12 col-md-2"},z={class:"col-12 col-md-2 text-center"},H={class:"col-12 col-md-6 text-right"},W={class:"col-12 col-md-4 q-pa-xs"},X={class:"col-12 col-md-4 q-pa-xs"},Z={class:"col-12 col-md-4 q-pa-xs"},j={class:"col-12"},J=l("thead",{class:"bg-black text-white"},[l("tr",null,[l("th",null,"Opciones"),l("th",null,"Fecha"),l("th",null,"Tipo"),l("th",null,"Descripcion"),l("th",null,"Name"),l("th",null,"Total"),l("th",null,"Usuario")])],-1),K={class:"text-caption",style:{"max-width":"400px","white-space":"normal","overflow-wrap":"break-word","line-height":"0.9"}},$={class:"text-bold"},ee=l("div",{class:"text-h6"},"Egreso",-1);function oe(s,t,le,te,r,n){const h=I("card2-component");return i(),d(Y,{class:"q-pa-md bg-grey-3"},{default:a(()=>[o(x,null,{default:a(()=>[o(f,{class:"q-pa-xs"},{default:a(()=>[l("div",L,[l("div",M,[o(p,{modelValue:r.fechaInicio,"onUpdate:modelValue":t[0]||(t[0]=e=>r.fechaInicio=e),label:"Fecha Inicio",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),l("div",T,[o(p,{modelValue:r.fechaFin,"onUpdate:modelValue":t[1]||(t[1]=e=>r.fechaFin=e),label:"Fecha Fin",type:"date",outlined:"",dense:""},null,8,["modelValue"])]),l("div",z,[o(c,{label:"Buscar",color:"indigo",onClick:n.salesGet,loading:r.loading,"no-caps":"",icon:"search",class:"text-bold"},null,8,["onClick","loading"])]),l("div",H,[o(c,{label:"Egreso",color:"red",onClick:n.egreseClick,loading:r.loading,"no-caps":"",icon:"add_circle_outline",class:"text-bold"},null,8,["onClick","loading"])]),l("div",W,[o(h,{title:"Ingresos",subtitle:n.ingresos+" Bs.",icon:"trending_up",color:"green"},null,8,["subtitle"])]),l("div",X,[o(h,{title:"Egresos",subtitle:n.egresos+" Bs.",icon:"trending_down",color:"red"},null,8,["subtitle"])]),l("div",Z,[o(h,{title:"Utilidad",subtitle:n.utilidad+" Bs.",icon:"trending_flat",color:"blue"},null,8,["subtitle"])]),l("div",j,[o(F,{dense:"","wrap-cells":""},{default:a(()=>[J,l("tbody",null,[(i(!0),v(S,null,G(r.sales,e=>{var b;return i(),v("tr",{key:e.id},[l("td",null,[e.status!=="ANULADO"?(i(),d(B,{key:0,label:"Opciones","no-caps":"",size:"10px",dense:"",color:e.type==="EGRESO"?"red":"green","auto-close":""},{default:a(()=>[k((i(),d(D,{clickable:"",onClick:E=>n.reimprimir(e)},{default:a(()=>[o(g,{avatar:""},{default:a(()=>[o(C,{name:"print"})]),_:1}),o(g,null,{default:a(()=>[Q("Reimprimir")]),_:1})]),_:2},1032,["onClick"])),[[V]]),k((i(),d(D,{clickable:"",onClick:E=>n.anular(e)},{default:a(()=>[o(g,{avatar:""},{default:a(()=>[o(C,{name:"cancel"})]),_:1}),o(g,null,{default:a(()=>[Q("Anular")]),_:1})]),_:2},1032,["onClick"])),[[V]])]),_:2},1032,["color"])):m("",!0),e.status==="ANULADO"?(i(),d(_,{key:1,color:"red","text-color":"white",label:"Anulado",size:"12px",dense:""})):m("",!0)]),l("td",null,u(s.$filters.formatdMYHi(e.date+" "+e.time)),1),l("td",null,[e.type==="INGRESO"?(i(),d(_,{key:0,color:"green","text-color":"white",label:"Ingreso",size:"12px",dense:""})):m("",!0),e.type==="EGRESO"?(i(),d(_,{key:1,color:"red","text-color":"white",label:"Egreso",size:"12px",dense:""})):m("",!0)]),l("td",null,[l("div",K,u(e.descripcion),1)]),l("td",null,u(e.name),1),l("td",$,u(e.total)+" Bs",1),l("td",null,u((b=e.user)==null?void 0:b.name),1)])}),128))])]),_:1})])])]),_:1})]),_:1}),o(A,{modelValue:r.egresoDialog,"onUpdate:modelValue":t[7]||(t[7]=e=>r.egresoDialog=e),persistent:""},{default:a(()=>[o(x,null,{default:a(()=>[o(f,{class:"row items-center q-pb-none"},{default:a(()=>[ee,o(O),o(c,{flat:"",round:"",dense:"",icon:"close",onClick:t[2]||(t[2]=e=>r.egresoDialog=!1)})]),_:1}),o(f,null,{default:a(()=>[o(q,{onSubmit:n.egresoPost},{default:a(()=>[o(p,{modelValue:r.egreso.total,"onUpdate:modelValue":t[3]||(t[3]=e=>r.egreso.total=e),label:"Total",type:"number",outlined:"",dense:"",rules:[e=>!!e||"Campo requerido"],step:"0.01"},null,8,["modelValue","rules"]),o(N,{modelValue:r.egreso.provedor_id,"onUpdate:modelValue":t[4]||(t[4]=e=>r.egreso.provedor_id=e),label:"Provedor",outlined:"",dense:"",options:r.provedores,"option-value":"id","option-label":"name",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","options","rules"]),o(p,{modelValue:r.egreso.descripcion,"onUpdate:modelValue":t[5]||(t[5]=e=>r.egreso.descripcion=e),label:"Descripcion",type:"text",outlined:"",dense:"",rules:[e=>!!e||"Campo requerido"]},null,8,["modelValue","rules"]),o(U,{align:"right"},{default:a(()=>[o(c,{label:"Cancelar",color:"red",onClick:t[6]||(t[6]=e=>r.egresoDialog=!1),"no-caps":"",icon:"close",loading:r.loading},null,8,["loading"]),o(c,{label:"Guardar",color:"green",type:"submit","no-caps":"",icon:"save",loading:r.loading},null,8,["loading"])]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var fe=w(P,[["render",oe]]);export{fe as default};