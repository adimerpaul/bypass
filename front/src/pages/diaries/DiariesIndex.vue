<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-2">
            <q-input v-model="date" type="date" label="Fecha" outlined dense :loading="loading" />
          </div>
          <div class="col-12 col-md-2 text-center">
            <q-btn @click="diarioGet" class="text-bold" label="Buscar" color="primary" icon="search" no-caps :loading="loading" />
          </div>
          <div class="col-12 col-md-2 text-center">
            <q-btn @click="getSales" class="text-bold" label="Ingresos" color="green" icon="list" no-caps :loading="loading" />
          </div>
          <div class="col-12">
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
      diario: {},
      loading: false
    };
  },
  mounted() {
    this.diarioGet();
    //this.getSales();
  },
  methods: {
    getSales(){
    
      this.$axios.post("reportSale" , {date: this.date}).then(res => {
        if(res.data.length==0) return false
        let cadena=''
      let contenido=''
      let total=0
      moment.locale('es')
      res.data.forEach(r => {
        contenido+='<tr><td>'+r.time+'</td><td>'+r.name+'</td><td>'+r.total+'</td></tr>'
        total += parseFloat(r.total)
      });
      cadena=`<style>
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
      border: .1px solid;
      }
      .tab2 td{
      text-align:center}
      .pie{
      text-align:center;
      font-size:8px;}
      </style>
      <table class=tab1><tr><td >SUCURSAL <br> ORURO</td><td>TOTAL VENDIDO</td></tr><tr><td></td><td style='font-size:18px;'>`+total.toFixed(1)+` Bs</td></tr></table>
      <div class='titulo1'>REPORTE VENTA DEL DIA</div>
      <div class='titulo2'>`+moment(this.fecha).format("dddd, DD  MMMM  YYYY")+`</div>
      <table class='tab2'><tr><th>HORA</th><th>DETALLE</th><th>TOTAL</th></tr>
      `+contenido+`      
        </table><br>
      `
      

     document.getElementById('myelement').innerHTML = cadena
      const d = new Printd()
      d.print(document.getElementById('myelement'))
      })

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
