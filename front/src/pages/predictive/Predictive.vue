<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card class="q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h5 text-bold">Gráfico Predictivo de ventas</div>
        <div class="row">
          <q-input v-model="fecha_inicio" type="date" label="Fecha Inicio" dense outlined class="col" />
          <q-input v-model="fecha_fin" type="date" label="Fecha Fin" dense outlined class="col" />
          <q-btn label="Buscar" color="primary" @click="fetchChartData" no-caps icon="search" class="col-auto" />
        </div>
        <div class="row">
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-8">
            <apexchart
              type="line"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
          <div class="col-12 col-md-2"></div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h5 text-bold">Gráfico Predictivo de Productos</div>
        <div class="row">
          <q-input v-model="fecha_inicio" type="date" label="Fecha Inicio" dense outlined class="col" />
          <q-input v-model="fecha_fin" type="date" label="Fecha Fin" dense outlined class="col" />
          <q-select
            v-model="selectedProduct"
            :options="products"
            label="Producto"
            dense
            outlined
            class="col"
            emit-value
            map-options
            display-value="name"
          />
          <pre>{{ products }}</pre>
          <q-btn label="Buscar" color="primary" @click="fetchChartData" no-caps icon="search" class="col-auto" />
        </div>
        <div class="row">
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-8">
            <apexchart
              type="line"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
          <div class="col-12 col-md-2"></div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ApexCharts from 'vue3-apexcharts';
import moment from "moment";

export default {
  name: 'PredictivePage',
  components: {
    apexchart: ApexCharts
  },
  data() {
    return {
      // fecha_inicio: moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD'),
      fecha_inicio:'2024-09-30',
      // fecha_fin: moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
      fecha_fin: moment().format('YYYY-MM-DD'),
      products: [],
      selectedProduct: null,
      chartOptions: {
        chart: {
          id: 'predictive-chart',
          toolbar: {
            show: true
          }
        },
        xaxis: {
          type: 'datetime',
          title: {
            text: 'Fecha'
          }
        },
        yaxis: {
          title: {
            text: 'Total Ventas'
          }
        },
        title: {
          text: 'Predicción de Ventas',
          align: 'center'
        }
      },
      // Datos del gráfico
      chartSeries: [
        {
          name: 'Ventas Totales',
          data: [] // Los datos se llenarán dinámicamente
        },
        {
          name: 'Predicción',
          data: [] // Los datos se llenarán dinámicamente
        }
      ]
    }
  },
  mounted() {
    this.fetchChartData();
    this.getProducts();
  },
  methods: {
    async getProducts() {
      this.$axios.get('products').then(response => {
        this.products = response.data;
      }).catch(error => {
        console.error('Error al obtener los productos:', error);
      });
    },
    async fetchChartData() {
      this.chartSeries = [
        {
          name: 'Ventas Totales',
          data: [] // Los datos se llenarán dinámicamente
        },
        {
          name: 'Predicción',
          data: [] // Los datos se llenarán dinámicamente
        }
      ];
      this.$axios.post('http://127.0.0.1:5000/regresion', {
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin
      }).then(response => {
        if (response.data.predicciones) {
          // console.log('Datos del gráfico:', response.data.predicciones);
          const ventas = response.data.predicciones.map(item => [new Date(item.week).getTime(), item.total_ventas]);
          const predicciones = response.data.predicciones.map(item => [new Date(item.week).getTime(), item.predicted]);

          this.chartSeries = [
            {name: 'Ventas Totales', data: ventas},
            {name: 'Predicción', data: predicciones}
          ];
        }
      }).catch(error => {
        console.error('Error al obtener los datos del gráfico:', error);
      });
    }
  },
}
</script>
