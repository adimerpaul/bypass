<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <q-input v-model="date" type="date" label="Fecha Ini" outlined dense :loading="loading" />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input v-model="date2" type="date" label="Fecha Fin" outlined dense :loading="loading" />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-select v-model="user" :options="usuarios" label="Usuarios" outlined dense option-label="name" />
          </div>
          <div class="col-xs-12 col-md-2 text-center">
            <q-btn @click="diarioGet" class="text-bold" label="Buscar" color="primary" icon="search" no-caps :loading="loading" />
          </div>
          <div class="col-xs-12 col-md-2 text-center">
            <q-btn @click="getSales" class="text-bold" label="Reporte Venta" color="green" icon="print" no-caps :loading="loading" size="12px" />
          </div>
          <div class="col-xs-12 col-md-2 text-center">
            <q-btn @click="reportProduct" class="text-bold" label="Reporte Product" color="deep-purple" icon="print" no-caps :loading="loading" size="12px" />
          </div>
          <div class="col-xs-12 col-md-2 text-center">
            <q-btn @click="reportInsumo" class="text-bold" label="Reporte Insumo" color="indigo" icon="print" no-caps :loading="loading" size="12px" />
          </div>
          <div class="col-xs-12 col-md-2 text-center">
            <q-btn @click="reportPago" class="text-bold" label="Reporte Pago" color="purple" icon="print" no-caps :loading="loading" size="12px" />
          </div>
<!--          Arqueo caja-->
          <div class="col-xs-12 col-md-2 text-center">
            <q-btn @click="reportArqueo" class="text-bold" label="Reporte Arqueo" color="orange" icon="print" no-caps :loading="loading" size="12px" />
          </div>
          <div class="col-xs-12">
            <q-markup-table dense wrap-cells bordered>
              <thead>
              <tr>
                <td colspan="9" class="text-center text-bold">Diario del {{ date }}</td>
              </tr>
              <tr>
                <td colspan="9" class="text-center text-bold">{{ dia(date) }}</td>
              </tr>
              <tr class="bg-black text-white">
                <th>Item</th>
                <th>Medida</th>
                <th>Inicio</th>
                <th>Ingreso</th>
                <th>Egreso</th>
                <th>Ventas</th>
                <th>Cierre</th>
                <th>Local</th>
                <th>Diferencia</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in diario" :key="index">
                <tr class="text-center">
                  <td colspan="9" class="text-bold">{{ item.name }}</td>
                </tr>
                <tr v-for="(diario, index) in item.diario" :key="index">
                  <td>{{ diario.item }}</td>
                  <td>{{ diario.medida }}</td>
                  <td class="text-right">
                    <input v-model="diario.inicio" type="number" style="width: 100px;" @input="debouncedUpdate(diario)" />
                  </td>
                  <td class="text-right">{{ diario.ingreso }}</td>
                  <td class="text-right">{{ diario.egreso }}</td>
                  <td class="text-right">{{ diario.ventas }}</td>
                  <td class="text-right">{{ diario.cierre }}</td>
                  <td class="text-right">
                    <input v-model="diario.local" type="number" style="width: 100px;" @input="debouncedUpdate(diario)" />
                  </td>
                  <td class="text-right">
                    <div :class="diario.local - diario.cierre < 0 ? 'text-negative' : 'text-positive'">
                      {{ diario.local - diario.cierre  }}
                    </div>
                  </td>
                </tr>
              </template>
              </tbody>
            </q-markup-table>
<!--            <pre>{{ diario }}</pre>-->
          </div>
        </div>
      </q-card-section>
      <div id="myelement" class="hidden"></div>
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";
import 'moment/locale/es';
import debounce from "lodash.debounce";
import { Printd } from 'printd'

export default {
  name: "DiariesIndex",
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),
      diario: {},
      loading: false,
      user:{'id':0,'name':'TODOS'},
      usuarios:[]
    };
  },
  mounted() {
    this.diarioGet();
    this.getUser()
    //this.getSales();
  },
  methods: {
    getUser(){
      this.$axios.get("listUser").then(res => {
        this.usuarios=[{'id':0,'name':'TODOS'}]
        res.data.forEach(r => {
          this.usuarios.push(r)
        });
        console.log(this.usuarios)
      })

    },
    reportArqueo(){
      this.loading = true;
      this.$axios.post("reportPago", {date: this.date,date2: this.date2,user_id:this.user.id}).then(res => {
        if (res.data.length == 0) {
          this.$alert.error('No se encontraron ventas para el dia seleccionado')
          return false
        }
        let cadena = ''
        let contenido = ''
        let total = 0
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const text= dias[moment(this.date).day()]+' '+moment(this.date).format("DD")+' de '+meses[moment(this.date).month()]+' de '+moment(this.date).format("YYYY")
        const text2= dias[moment(this.date2).day()]+' '+moment(this.date2).format("DD")+' de '+meses[moment(this.date2).month()]+' de '+moment(this.date2).format("YYYY")
        const text3=this.user.id==0?'':this.user.name
        res.data.forEach(p => {
          let detail = ''
          let total = 0
          p.details.forEach(d => {
            detail += `<tr><td>${d.date}</td><td>${d.time}</td><td>N ${d.numero} ${d.mesa}</td><td style="text-align: right">${d.total}</td></tr>`
            total += parseFloat(d.total)
          })
          contenido +=`
         <div class='titulo2' style="font-weight: bold">*${p.pago}</div>
         <table class='tab2'>
          </td><td style='font-weight: bold;text-align: left;width: 50%'>${p.pago}</td><td style='font-weight: bold;text-align: right'>${total.toFixed(2)}</td></tr>
         </table>
`
        });
        cadena = `<style>
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
      border-collapse: collapse;
      font-weight:bold;
      }
      .tab2{
      width:100%;
      font-size:10px;
      border-collapse: collapse;
      }
      .tab2  th{
      border: 1px solid;
      }
      .tab2 td{
      border: 1px solid grey;
      text-align:left
      }
      .pie{
      text-align:center;
      font-size:8px;}
      </style>
      <div style="padding: 0cm 0.3cm">
      <table class=tab1>
      <div class='titulo1' style="font-weight: bold">ARQUEO DE CAJA</div>
      <div class='titulo2' style="font-weight: bold">${text}</div>
      <div class='titulo2' style="font-weight: bold">${text2}</div>
      <div class='titulo2' style="font-weight: bold">${text3}</div>
      <div class='titulo2'>EXPRESADO BOLIVIANOS</div>
      ${contenido}
      <br>
      <br>
      <hr>
    </div>
      `
        document.getElementById('myelement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myelement'))
      }).finally(() => {
        this.loading = false;
      });
    },
    reportPago(){
      this.loading = true;
      this.$axios.post("reportPago", {date: this.date, date2: this.date2,user_id:this.user.id}).then(res => {
        if (res.data.length == 0) {
          this.$alert.error('No se encontraron ventas para el dia seleccionado')
          return false
        }
        let cadena = ''
        let contenido = ''
        let total = 0
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const text= dias[moment(this.date).day()]+' '+moment(this.date).format("DD")+' de '+meses[moment(this.date).month()]+' de '+moment(this.date).format("YYYY")
        const text2= dias[moment(this.date2).day()]+' '+moment(this.date2).format("DD")+' de '+meses[moment(this.date2).month()]+' de '+moment(this.date2).format("YYYY")
        const text3=this.user.id==0?'':this.user.name
        res.data.forEach(p => {
          let detail = ''
          let total = 0
          p.details.forEach(d => {
            detail += `<tr><td>${d.date}</td><td>${d.time}</td><td>N ${d.numero} ${d.mesa}</td><td style="text-align: right">${d.total}</td></tr>`
            total += parseFloat(d.total)
          })
          contenido +=`
         <div class='titulo2' style="font-weight: bold">*${p.pago}</div>
         <table class='tab2'><tr><th>FECHA</th><th>HORA</th><th>DETALLE</th><th>TOTAL</th></tr>
         ${detail}
          <tr><td></td><td style='font-weight: bold;text-align: right'>TOTAL</td><td style='font-weight: bold;text-align: right'>${total.toFixed(2)}</td></tr>
         </table>`
        });
        cadena = `<style>
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
      border-collapse: collapse;
      font-weight:bold;
      }
      .tab2{
      width:100%;
      font-size:10px;
      border-collapse: collapse;
      }
      .tab2  th{
      border: 1px solid;
      }
      .tab2 td{
      border: 1px solid grey;
      text-align:left
      }
      .pie{
      text-align:center;
      font-size:8px;}
      </style>
      <div style="padding: 0cm 0.3cm">
      <table class=tab1>
      <div class='titulo1' style="font-weight: bold">REPORTE POR TIPO DE TRANSACCION</div>
      <div class='titulo2' style="font-weight: bold">${text}</div>
      <div class='titulo2' style="font-weight: bold">${text2}</div>
      <div class='titulo2' style="font-weight: bold">${text3}</div>
      <div class='titulo2'>EXPRESADO BOLIVIANOS</div>
      ${contenido}
    </div>
      `
        document.getElementById('myelement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myelement'))
      }).finally(() => {
        this.loading = false;
      });
    },
    reportProduct() {
      this.loading = true;
      this.$axios.post("reportProduct", {date: this.date,date2: this.date2,user_id:this.user.id}).then(res => {
        console.log(res.data)
        if (res.data.length == 0) {
          this.$alert.error('No se encontraron ventas para el dia seleccionado')
          return false
        }
        let cadena = ''
        let contenido = ''
        let total = 0
        moment.locale('es')
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const text= dias[moment(this.date).day()]+' '+moment(this.date).format("DD")+' de '+meses[moment(this.date).month()]+' de '+moment(this.date).format("YYYY")
        const text2= dias[moment(this.date2).day()]+' '+moment(this.date2).format("DD")+' de '+meses[moment(this.date2).month()]+' de '+moment(this.date2).format("YYYY")
        const text3=this.user.id==0?'':this.user.name
        res.data.forEach(r => {
          contenido += '<tr><td>' + r.product + '</td><td>' + r.price + '</td><td style="text-align: right">' + r.quantity + '</td><td>'+(parseFloat(r.price) * parseFloat(r.quantity)).toFixed(2)+'</td></tr>'
        });
        cadena = `<style>
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
      border-collapse: collapse;
      font-weight:bold;
      }
      .tab2{
      width:100%;
      font-size:10px;
      border-collapse: collapse;
      }
      .tab2  th{
      border: 1px solid;
      }
      .tab2 td{
      border: 1px solid grey;
      text-align:left
      }
      .pie{
      text-align:center;
      font-size:8px;}
      </style>
      <div style="padding: 0cm 0.3cm 0cm 0.3cm">
      <div class='titulo1' style="font-weight: bold">VENTA POR PRODUCTO</div>
      <div class='titulo2'>${text}</div>
      <div class='titulo2'>${text2}</div>
      <div class='titulo2' style="font-weight: bold">${text3}</div>
      <div class='titulo2'>TOTAL MERCADERIA VENDIDA</div>
      <table class='tab2'>
        <tr>
          <th>DETALLE</th>
          <th>PU</th>
          <th>CANT</th>
          <th>TOTAL</th>
        </tr>
      ${contenido}
      </table>
    </div>
      `
        document.getElementById('myelement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myelement'))
      }).finally(() => {
        this.loading = false;
      });
    },
    reportInsumo() {
      this.loading = true;
      this.$axios.post("reportInsumo", {date: this.date,date2: this.date2,user_id:this.user.id}).then(res => {
        console.log(res.data)
        if (res.data.length == 0) {
          this.$alert.error('No se encontraron ventas para el dia seleccionado')
          return false
        }
        let cadena = ''
        let contenido = ''
        let total = 0
        moment.locale('es')
        const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const text= dias[moment(this.date).day()]+' '+moment(this.date).format("DD")+' de '+meses[moment(this.date).month()]+' de '+moment(this.date).format("YYYY")
      const text2= dias[moment(this.date2).day()]+' '+moment(this.date2).format("DD")+' de '+meses[moment(this.date2).month()]+' de '+moment(this.date2).format("YYYY")
        const text3=this.user.id==0?'':this.user.name
        res.data.forEach(r => {
          contenido += '<tr><td>' + r.id + '</td><td>' + r.name + '</td><td style="text-align: right">' + r.quantity + '</td></tr>'
        });
        cadena = `<style>
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
      border-collapse: collapse;
      font-weight:bold;
      }
      .tab2{
      width:100%;
      font-size:10px;
      border-collapse: collapse;
      }
      .tab2  th{
      border: 1px solid;
      }
      .tab2 td{
      border: 1px solid grey;
      text-align:left
      }
      .pie{
      text-align:center;
      font-size:8px;}
      </style>
      <div style="padding: 0cm 0.3cm 0cm 0.3cm">
      <div class='titulo1' style="font-weight: bold">VENTA POR PRODUCTO</div>
      <div class='titulo2'>${text}</div>
      <div class='titulo2'>${text2}</div>
      <div class='titulo2' style="font-weight: bold">${text3}</div>
      <div class='titulo2'>TOTAL INSUMOS VENDIDA</div>
      <table class='tab2'>
        <tr>
          <th>ID</th>
          <th>DETALLE</th>
          <th>COSTO</th>
        </tr>
      ${contenido}
      </table>
    </div>
      `
        document.getElementById('myelement').innerHTML = cadena
        const d = new Printd()
        d.print(document.getElementById('myelement'))
      }).finally(() => {
        this.loading = false;
      });
    },
    getSales(){
      this.loading = true;
      this.$axios.post("reportSale" , {date: this.date,date2: this.date2,user_id:this.user.id}).then(res => {
        if(res.data.length==0){
          this.$alert.error('No se encontraron ventas para el dia seleccionado')
          return false
        }
        let cadena=''
      let contenido=''
      let total=0
      moment.locale('es')
      const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const text= dias[moment(this.date).day()]+' '+moment(this.date).format("DD")+' de '+meses[moment(this.date).month()]+' de '+moment(this.date).format("YYYY")
      const text2= dias[moment(this.date2).day()]+' '+moment(this.date2).format("DD")+' de '+meses[moment(this.date2).month()]+' de '+moment(this.date2).format("YYYY")
        const text3=this.user.id==0?'':this.user.name
        res.data.forEach(r => {
        contenido+='<tr><td>'+r.date+'</td><td>'+r.time+'</td><td>'+r.pago+' N '+r.numero+'  '+r.mesa+'</td><td style="text-align: right">'+r.total+'</td></tr>'
        total += parseFloat(r.total)
      });
      cadena=`<style>
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
      font-size:12px;
      }
      .tab1{
      width:100%;
      text-align:center;
      font-size:10px;
      border-collapse: collapse;
      font-weight:bold;
      }
      .tab2{
      width:100%;
      font-size:10px;
      border-collapse: collapse;
      }
      .tab2  th{
      border: 1px solid;
      }
      .tab2 td{
      border: 1px solid grey;
      text-align:left
      }
      .pie{
      text-align:center;
      font-size:8px;}
      </style>
      <div style="padding: 0.0cm 0.3cm 0.0cm 0.3cm">
      <table class=tab1>
        <tr><td class="fa-weight:bold">SUCURSAL <br> ORURO</td><td><div style="background: #778ea2">TOTAL VENDIDO</div></td></tr>
        <tr><td></td><td style='font-size:18px;font-weight: bold'>${total.toFixed(2)} Bs</td></tr>
        </table>
      <div class='titulo1'>REPORTE VENTA DEL DIA</div>
      <div class='titulo2'>${text}</div>
      <div class='titulo2'>${text2}</div>
      <div class='titulo2' style="font-weight: bold">${text3}</div>
      <table class='tab2'><tr><th>FECHA</th><th>HORA</th><th>DETALLE</th><th>TOTAL</th></tr>
      ${contenido}
      </table>
    </div>
      `
     document.getElementById('myelement').innerHTML = cadena
      const d = new Printd()
      d.print(document.getElementById('myelement'))
      }).finally(() => {
        this.loading = false;
      });

    },
    update(diario) {
      console.log(diario);
      this.$axios.put("diario/" + diario.id, diario).then(response => {
        console.log(response.data);
      });
    },
    debouncedUpdate: debounce(function(diario) {
      this.update(diario);
    }, 500), // 500ms debounce time
    diarioGet() {
      this.loading = true;
      this.$axios.get("diarioDate/" + this.date).then(response => {
        this.diario = response.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    dia(fecha) {
      const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      return dias[moment(fecha).day()];
    }
  }
};
</script>
