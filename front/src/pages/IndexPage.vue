<template>
  <q-page class="q-pa-md bg-grey-3">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-select v-model="mesa" label="Mesa" outlined dense :options="['TODO','MESA','LLEVAR','DELIVERY','PEDIDOS YA']" />
          </div>
          <div class="col-12 col-md-3 text-center">
            <q-btn label="Buscar" color="indigo" @click="salesGet"  :loading="loading" no-caps icon="search" class="text-bold" />
          </div>
          <div class="col-12 col-md-4 text-right">
            <q-btn label="Caja Chica" color="indigo" @click="cajaClick"  :loading="loading" no-caps icon="attach_money" class="text-bold" />
          </div>
          <div class="col-12 col-md-4 text-right">
            <q-btn label="Egreso" color="red" @click="egreseClick"  :loading="loading" no-caps icon="add_circle_outline" class="text-bold" />
          </div>
          <div class="col-12 col-md-4 text-right">
            <q-btn color="info" @click="printCajaClick"  :loading="loading" no-caps icon="print" class="text-bold" />
          </div>
          </div>
          <div class="row">
          <div class="col-12 col-md-4 q-pa-xs">
            <card2-component title="Ingresos" :subtitle="ingresos+' Bs.'" icon="trending_up" color="green"/>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <card2-component title="Egresos" :subtitle="egresos+' Bs.'" icon="trending_down" color="red"/>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <card2-component title="Caja Chica" :subtitle="cajaChica?.monto+' Bs.'" icon="fa-solid fa-cash-register" color="blue"/>
<!--            <pre>{{cajaChica}}</pre>-->
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-3 q-pa-xs" >
            <card2-component title="EFECTIVO" :subtitle="ganancia1.total+' Bs.'" icon="point_of_sale" color="amber" dense/>
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs" >
            <card2-component title="TARJETA" :subtitle="ganancia2.total+' Bs.'" icon="credit_card" color="indigo"/>
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs" >
            <card2-component title="ONLINE" :subtitle="ganancia3.total+' Bs.'" icon="shopping_cart" color="cyan"/>
          </div>
          <div class="col-xs-12 col-md-3 q-pa-xs" >
            <card2-component title="QR" :subtitle="ganancia4.total+' Bs.'" icon="qr_code_scanner" color="deep-orange"/>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-markup-table dense wrap-cells >
              <thead class="bg-black text-white">
              <tr>
                <th>Opciones</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Descripcion</th>
                <th>Name</th>
                <th>Total</th>
                <th>Usuario</th>
              </tr>
              </thead>
              <tbody v-if="sales.length > 0">
              <tr v-for="sale in sales" :key="sale.id">
                <td>
                  {{sale.numero}}
                  <q-btn-dropdown label="Opciones" no-caps size="10px" dense :color="sale.type === 'EGRESO' ? 'red' : 'green'" auto-close
                                  v-if="sale.status !== 'ANULADO'">
                    <q-item clickable v-ripple @click="reimprimir(sale)">
                      <q-item-section avatar>
                        <q-icon name="print" />
                      </q-item-section>
                      <q-item-section>Reimprimir</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="anular(sale)">
                      <q-item-section avatar>
                        <q-icon name="cancel" />
                      </q-item-section>
                      <q-item-section>Anular</q-item-section>
                    </q-item>
                  </q-btn-dropdown>
                  <q-chip v-if="sale.status === 'ANULADO'" color="red" text-color="white" label="Anulado" size="12px" dense/>
                </td>
                <td>{{$filters.formatdMYHi(sale.date+' '+sale.time)}}</td>
                <td>
                  <q-chip v-if="sale.type === 'INGRESO'" color="green" text-color="white" label="Ingreso" size="12px" dense/>
                  <q-chip v-if="sale.type === 'EGRESO'" color="red" text-color="white" label="Egreso" size="12px" dense/>
                </td>
                <td>
                  <div class="text-caption" style="max-width: 400px; white-space: normal; overflow-wrap: break-word;line-height: 0.9;">
                    {{sale.descripcion}}
                  </div>
                </td>
                <td>{{sale.name}}</td>
                <td class="text-bold">{{sale.total}} Bs</td>
                <td>{{sale.user?.name}}</td>
              </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="7" class="text-center">No hay ventas</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
<!--          <div class="col-12">-->
<!--            <pre>{{sales}}</pre>-->
<!--          </div>-->
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="egresoDialog" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Egreso</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="egresoDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit="egresoPost">
            <q-input v-model="egreso.total" label="Total" type="number" outlined dense :rules="[val => !!val || 'Campo requerido']" step="0.01" />
            <q-select v-model="egreso.provedor_id" label="Provedor" outlined dense :options="provedores" option-value="id" option-label="name" :rules="[val => !!val || 'Campo requerido']" />
            <q-input v-model="egreso.descripcion" label="Descripcion" type="text" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="red" @click="egresoDialog = false" no-caps icon="close" :loading="loading"></q-btn>
              <q-btn label="Guardar" color="green" type="submit" no-caps icon="save" :loading="loading"></q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogCaja" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Ingreso Caja Chica Dia</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="dialogCaja = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit="cajaPost">
            <q-input v-model="chica.monto" label="Monto" type="number" outlined dense :rules="[val => !!val || 'Campo requerido']" step="0.01" />
            <q-input v-model="chica.descripcion" label="Descripcion" type="text" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="red" @click="dialogCaja = false" no-caps icon="close" :loading="loading"></q-btn>
              <q-btn label="Guardar" color="green" type="submit" no-caps icon="save" :loading="loading"></q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div id="myelement" class="hidden" ></div>
  </q-page>
</template>

<script>
import moment from "moment";
import Card2Component from "components/Card2Component.vue";
import { Printd } from 'printd'
import {Imprimir} from "src/addons/Imprimir";

export default {
  name: 'IndexPage',
  components: {Card2Component},
  data () {
    return {
      mesa:'TODO',
      loading: false,
      caja:[],
      dialogCaja:false,
      //principo de mes
      fechaInicio: moment().format('YYYY-MM-DD'),
      fechaFin: moment().format('YYYY-MM-DD'),
      sales: [],
      ganancia1: {},
      ganancia2: {},
      ganancia3: {},
      ganancia4: {},
      egresoDialog: false,
      egreso: {},
      provedores: [],
      chica:{},
      detalleGasto:[],
      cajaChica:{
        monto:0
      }
    }
  },
  mounted() {
    this.salesGet();
    this.provedoresGet();
    this.ultimaCajaGet();
  },
  methods: {
    printCajaClick(){
      if(this.cajaChica?.monto ==0){
        this.$alert.error('Debe registrar Caja Chica');
        return false
      }
      let cadena =''
    let tabla=''
    let contenido=''
      
      tabla='<table class=\'tab2\'><tr><th>DESCRIPCION</th><th>PROVEEDOR</th><th>TOTAL</th></tr>'
      this.detalleGasto.forEach(r => {
          contenido+='<tr><td>'+r.descripcion+'</td><td>'+r.name+'</td><td>'+r.total+'</td></tr>'
      });
      tabla+=contenido
      tabla+=`<tr><td></td><td><b>TOTAL GASTOS:</b></td><th>`+this.egresos+`</th></tr>
      <tr><td></td><td><b>Caja Chica:</b></td><th>`+(parseFloat(this.cajaChica.monto) + parseFloat(this.egresos))+`</th></tr>
      <tr><td></td><td><b>Saldo:</b></td><th>`+this.cajaChica.monto  +`</th></tr>
      </table>`

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
    position:absolute; right:7px;
    font-weight:bold;
    font-size:30px;
    }
    .textocab{
    text-align:center;
    font-size:10px;
    }
    .pie{
    text-align:center;
    font-size:8px;}
    </style>
    <div style="padding: 0.0cm 0.3cm 0.0cm 0.3cm;  font-family:Verdana, sans-serif; position:relative; margin-top:0">

      <div style='text-align:center'><img class='imagen' src="logo2.png" width="70" ></div>
      <div class='titulo1'>
     
      </div>
      <div class='titulo2'>AV. TACNA ENTRE JAEN Y TOMAS FRIAS</div>
      <table class='tab1'><tr><td>`+this.fechaFin+`</td></tr></table><br>
      ${tabla}
  
    </div>`
    // }
    document.getElementById('myelement').innerHTML = cadena
    const d = new Printd()
    d.print(document.getElementById('myelement'))

    },
    ultimaCajaGet(){
      this.$axios.post('/ultimaCaja',{fecha:this.fechaFin}).then(response => {
        this.cajaChica=response.data
      }).catch(error => {
        console.error(error);
        this.$alert.error('Error Caja');
      })
    },
    cajaPost() {
      this.loading = true;
      this.$axios.post('/caja',this.chica).then(response => {
        this.$alert.success('Caja  registrado');
        this.ultimaCajaGet();
        this.dialogCaja = false;
      }).catch(error => {
        console.error(error);
        this.$alert.error('Error al registrar');
      }).finally(() => {
        this.loading = false;
      });
    },
    cajaClick(){
      this.dialogCaja=true
      this.chica={}
    },
    getCaja(){
      this.loading = true;
      this.$axios.post('/totalCaja',{ini:this.fechaInicio,fin:this.fechaFin}).then(response => {
        this.caja=response.data  
      }).catch(error => {
        console.error(error);
        this.$alert.error('Error Caja');
      }).finally(() => {
        this.loading = false;
      });
    },
    egresoPost() {
      this.loading = true;
      this.$axios.post('/egresos',this.egreso).then(response => {
        this.$alert.success('Egreso registrado');
        Imprimir.recibo(response.data);
        // this.salesGet();
        this.ultimaCajaGet();
        this.egresoDialog = false;
      }).catch(error => {
        console.error(error);
        this.$alert.error('Error al registrar el egreso');
      }).finally(() => {
        this.loading = false;
      });
    },
    provedoresGet() {
      this.$axios.get('/provedores').then(response => {
        this.provedores = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    egreseClick() {
      this.egresoDialog = true;
      this.egreso = {
        total: '',
        provedor_id: '',
        descripcion: ''
      };
    },
    reimprimir(sale) {
      Imprimir.recibo(sale);
    },
    anular(sale) {
      this.$alert.confirm('¿Está seguro de anular la venta?').onOk(() => {
        this.$axios.post(`saleAnular`,{
          id: sale.id
        }).then(response => {
          this.$alert.success('Venta anulada');
          this.salesGet();
        }).catch(error => {
          console.error(error);
          this.$alert.error('Error al anular la venta');
        });
      });
    },
    salesGet() {
      this.loading = true;
      this.$axios.post('/reportVenta', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          mesa:this.mesa
      }).then(response => {
        this.detalleGasto=[]
        this.sales = response.data
        this.sales.forEach(r => {
          if (r.type === 'EGRESO' && r.status !== 'ANULADO') 
            this.detalleGasto.push(r)
        });
        this.gananciaGet()
        this.ultimaCajaGet()
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.loading = false;
      });
    },
  gananciaGet() {
      this.loading = true;
      this.$axios.post('/reportGanancia', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
      }).then(response => {
        console.log(response.data)
        this.ganancia1 = response.data[0]
        this.ganancia2 = response.data[1]
        this.ganancia3 = response.data[2]
        this.ganancia4 = response.data[3]
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    ingresos() {
      let total = 0;
      this.sales.forEach(sale => {
        if (sale.type === 'INGRESO' && sale.status !== 'ANULADO') total += sale.total;
      });
      return total;
    },
    egresos() {
      let total = 0;
      this.sales.forEach(sale => {
        if (sale.type === 'EGRESO' && sale.status !== 'ANULADO') 
        total += sale.total;
      });
      return total;
    },
    totalCaja(){
      let total = 0;
      this.caja.forEach(r => {
        total = total + parseFloat(r.monto)
      });
      return total; 
    },
    totalGasto() {
      return this.totalCaja - this.egresos;
    }
  }
}
</script>
