<template>
  <q-page class="q-pa-md bg-grey-3">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-2">
            <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
          </div>
          <div class="col-12 col-md-2">
            <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
          </div>
          <div class="col-12 col-md-2 text-center">
            <q-btn label="Buscar" color="indigo" @click="salesGet"  :loading="loading" no-caps icon="search" class="text-bold" />
          </div>
          <div class="col-12 col-md-6 text-right">
            <q-btn label="Egreso" color="red" @click="salesGet"  :loading="loading" no-caps icon="add_circle_outline" class="text-bold" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <card2-component title="Ingresos" :subtitle="ingresos+' Bs.'" icon="trending_up" color="green"/>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <card2-component title="Egresos" :subtitle="egresos+' Bs.'" icon="trending_down" color="red"/>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <card2-component title="Utilidad" :subtitle="utilidad+' Bs.'" icon="trending_flat" color="blue"/>
          </div>
          <div class="col-12">
            <q-markup-table dense wrap-cells>
              <thead class="bg-black text-white">
              <tr>
                <th class="text-center">Fecha</th>
                <th class="text-center">Tipo</th>
                <th class="text-center">Total</th>
              </tr>
              </thead>
            </q-markup-table>
          </div>
          <div class="col-12">
            <pre>{{sales}}</pre>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";
import Card2Component from "components/Card2Component.vue";

export default {
  name: 'IndexPage',
  components: {Card2Component},
  data () {
    return {
      loading: false,
      //principo de mes
      fechaInicio: moment().format('YYYY-MM-DD'),
      fechaFin: moment().format('YYYY-MM-DD'),
      sales: []
    }
  },
  mounted() {
    this.salesGet();
  },
  methods: {
    salesGet() {
      this.loading = true;
      this.$axios.get('/sales', {
        params: {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        }
      }).then(response => {
        this.sales = response.data;
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
        if (sale.type === 'INGRESO') total += sale.total;
      });
      return total;
    },
    egresos() {
      let total = 0;
      this.sales.forEach(sale => {
        if (sale.type === 'EGRESO') total += sale.total;
      });
      return total;
    },
    utilidad() {
      return this.ingresos - this.egresos;
    }
  }
}
</script>
