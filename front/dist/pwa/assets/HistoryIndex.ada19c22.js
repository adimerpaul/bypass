import{_ as g,Q as a,R as o,S as h,T as c,aB as A,V as e,aC as C,U as x,a0 as _,a1 as f,a2 as b,aD as I,W as n}from"./index.9c5ac26d.js";import{Q as i}from"./QChip.8c2a605e.js";import{Q as y}from"./QMarkupTable.676a391e.js";import{Q as v}from"./QPage.2f2de6a9.js";import{h as w}from"./moment.40bc58bf.js";const V={name:"DiariesIndex",data(){return{date:w().format("YYYY-MM-DD"),buys:[],deregistrations:[],loading:!1}},mounted(){this.buyGet()},methods:{deregistrationAnular(s){this.$alert.confirm("\xBFEst\xE1 seguro de anular la baja?").onOk(()=>{this.$axios.put(`deregistrationsAnular/${s}`).then(l=>{const p=this.deregistrations.find(m=>m.id===s);p.status="INACTIVE",this.$alert.success("Baja anulada")}).catch(l=>{this.$alert.error(l.response.data.message)})})},buyAnular(s){this.$alert.confirm("\xBFEst\xE1 seguro de anular la compra?").onOk(()=>{this.$axios.put(`buysAnular/${s}`).then(l=>{const p=this.buys.find(m=>m.id===s);p.status="INACTIVE",this.$alert.success("Compra anulada")}).catch(l=>{this.$alert.error(l.response.data.message)})})},buyGet(){this.loading=!0,this.$axios.get("buys",{params:{date:this.date}}).then(s=>{this.buys=s.data.buys,this.deregistrations=s.data.deregistrations}).catch(s=>{this.$alert.error(s.response.data.message)}).finally(()=>{this.loading=!1})}}},E={class:"row"},Q={class:"col-12 col-md-2"},$={class:"col-12 col-md-2 text-center"},T={class:"row"},B={class:"col-6"},z=e("thead",null,[e("tr",null,[e("td",{colspan:"8",class:"text-center text-bold"},"COMPRAS")]),e("tr",{class:"bg-black text-white"},[e("td",null,"Opcion"),e("td",null,"Insumo"),e("td",null,"Usuario"),e("td",null,"Cantidad"),e("td",null,"Precio"),e("td",null,"Total"),e("td",null,"Estado"),e("td",null,"Fecha")])],-1),M={class:"q-pa-none q-ma-none"},Y={class:"q-pa-none q-ma-none"},D={class:"q-pa-none q-ma-none"},O={class:"q-pa-none q-ma-none"},S={class:"q-pa-none q-ma-none"},F={class:"q-pa-none q-ma-none"},N={class:"q-pa-none q-ma-none"},P={class:"q-pa-none q-ma-none"},U={class:"col-6"},G=e("thead",null,[e("tr",null,[e("td",{colspan:"8",class:"text-center text-bold"},"BAJAS")]),e("tr",{class:"bg-black text-white"},[e("td",null,"Opcion"),e("td",null,"Insumo"),e("td",null,"Usuario"),e("td",null,"Cantidad"),e("td",null,"Precio"),e("td",null,"Total"),e("td",null,"Estado"),e("td",null,"Fecha")])],-1),H={class:"q-pa-none q-ma-none"},j={class:"q-pa-none q-ma-none"},R={class:"q-pa-none q-ma-none"},J={class:"q-pa-none q-ma-none"},L={class:"q-pa-none q-ma-none"},W={class:"q-pa-none q-ma-none"},K={class:"q-pa-none q-ma-none"},X={class:"q-pa-none q-ma-none"};function Z(s,l,p,m,d,q){return a(),o(v,{class:"bg-grey-3 q-pa-xs"},{default:h(()=>[c(I,null,{default:h(()=>[c(A,{class:"q-pa-xs"},{default:h(()=>[e("div",E,[e("div",Q,[c(C,{modelValue:d.date,"onUpdate:modelValue":l[0]||(l[0]=t=>d.date=t),type:"date",label:"Fecha",outlined:"",dense:"",loading:d.loading},null,8,["modelValue","loading"])]),e("div",$,[c(x,{onClick:q.buyGet,class:"text-bold",label:"Buscar",color:"primary",icon:"search","no-caps":"",loading:d.loading},null,8,["onClick","loading"])])]),e("div",T,[e("div",B,[c(y,{dense:"","wrap-cells":"",bordered:""},{default:h(()=>[z,e("tbody",null,[(a(!0),_(b,null,f(d.buys,t=>{var r,u;return a(),_("tr",{key:t.id},[e("td",M,[t.status==="ACTIVE"?(a(),o(x,{key:0,dense:"",size:"10px",color:"primary",onClick:k=>q.buyAnular(t.id),label:"Anular",icon:"cancel","no-caps":""},null,8,["onClick"])):(a(),o(i,{key:1,color:"grey","text-color":"white",label:"Anulado",dense:"",size:"10px"}))]),e("td",Y,n((r=t.insumo)==null?void 0:r.name),1),e("td",D,n((u=t.user)==null?void 0:u.name),1),e("td",O,n(t.quantity),1),e("td",S,n(t.price),1),e("td",F,n(t.total),1),e("td",N,[t.status==="ACTIVE"?(a(),o(i,{key:0,color:"green","text-color":"white",label:"Activo",dense:"",size:"10px"})):(a(),o(i,{key:1,color:"red","text-color":"white",label:"Inactivo",dense:"",size:"10px"}))]),e("td",P,n(s.$filters.formatdMYHi(t.date+" "+t.time)),1)])}),128))])]),_:1})]),e("div",U,[c(y,{dense:"","wrap-cells":"",bordered:""},{default:h(()=>[G,e("tbody",null,[(a(!0),_(b,null,f(d.deregistrations,t=>{var r,u;return a(),_("tr",{key:t.id},[e("td",H,[t.status==="ACTIVE"?(a(),o(x,{key:0,dense:"",size:"10px",color:"primary",onClick:k=>q.deregistrationAnular(t.id),label:"Anular",icon:"cancel","no-caps":""},null,8,["onClick"])):(a(),o(i,{key:1,color:"grey","text-color":"white",label:"Anulado",dense:"",size:"10px"}))]),e("td",j,n((r=t.insumo)==null?void 0:r.name),1),e("td",R,n((u=t.user)==null?void 0:u.name),1),e("td",J,n(t.quantity),1),e("td",L,n(t.price),1),e("td",W,n(t.total),1),e("td",K,[t.status==="ACTIVE"?(a(),o(i,{key:0,color:"green","text-color":"white",label:"Activo",dense:"",size:"10px"})):(a(),o(i,{key:1,color:"red","text-color":"white",label:"Inactivo",dense:"",size:"10px"}))]),e("td",X,n(s.$filters.formatdMYHi(t.date+" "+t.time)),1)])}),128))])]),_:1})])])]),_:1})]),_:1})]),_:1})}var oe=g(V,[["render",Z]]);export{oe as default};