<template>
  <q-page class="bg-grey-3 q-pa-md">
    <!-- ====== Gráfico Global ====== -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section class="row items-center q-col-gutter-md">
        <div class="col-12 text-h6 text-weight-bold">Gráfico Predictivo de Ventas (Global)</div>

        <div class="col-12 col-md-3">
          <q-input v-model="fecha_inicio" type="date" label="Fecha inicio" dense outlined/>
        </div>
        <div class="col-12 col-md-3">
          <q-input v-model="fecha_fin" type="date" label="Fecha fin" dense outlined/>
        </div>

        <div class="col-12 col-md-auto">
          <q-btn
            color="primary" no-caps icon="search" label="Buscar"
            :loading="loadingGeneral" @click="fetchChartData"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <apexchart type="line" :options="chartOptions" :series="chartSeries"/>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ====== Gráfico por Producto ====== -->
    <q-card flat bordered>
      <q-card-section class="row items-center q-col-gutter-md">
        <div class="col-12 text-h6 text-weight-bold">Gráfico Predictivo de Ventas por Producto</div>

        <div class="col-12 col-md-3">
          <q-input v-model="fecha_inicio" type="date" label="Fecha inicio" dense outlined/>
        </div>
        <div class="col-12 col-md-3">
          <q-input v-model="fecha_fin" type="date" label="Fecha fin" dense outlined/>
        </div>

        <div class="col-12 col-md-4">
          <q-select
            v-model="selectedProduct"
            :options="products"
            label="Producto"
            dense outlined emit-value map-options
            option-value="value" option-label="label"
          />
        </div>

        <div class="col-12 col-md-auto">
          <q-btn
            color="primary" no-caps icon="search" label="Buscar"
            :loading="loadingProduct" @click="fetchChartDataProduct"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <apexchart type="line" :options="chartOptionsProduct" :series="chartSeriesProduct"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ApexCharts from 'vue3-apexcharts'
import moment from 'moment'

/**
 * Ajusta estas URLs a tu entorno:
 * - apiFlaskBase: servicio Flask de regresión
 * - apiLaravelBase: backend donde obtienes la lista de productos
 */
const apiFlaskBase   = 'http://127.0.0.1:5000'
const apiLaravelBase = '' // si usas boot axios con baseURL, puedes dejarlo vacío y llamar 'products'

export default {
  name: 'PredictivePage',
  components: { apexchart: ApexCharts },

  data () {
    return {
      // Fechas por defecto: inicio fijo y hoy
      fecha_inicio: '2024-09-30',
      fecha_fin: moment().format('YYYY-MM-DD'),

      // Productos
      products: [],           // [{label, value}]
      selectedProduct: null,

      // Loaders
      loadingGeneral: false,
      loadingProduct: false,

      // Chart Global
      chartOptions: {
        chart: { id: 'predictive-chart', toolbar: { show: true } },
        xaxis: { type: 'datetime', title: { text: 'Fecha' } },
        yaxis: { title: { text: 'Total Ventas' } },
        stroke: { width: 3 },
        markers: { size: 0 },
        legend: { position: 'top' },
        title: { text: 'Predicción de Ventas', align: 'center' },
        tooltip: { x: { format: 'yyyy-MM-dd' } }
      },
      chartSeries: [
        { name: 'Ventas Totales', data: [] },
        { name: 'Predicción', data: [] }
      ],

      // Chart por producto
      chartOptionsProduct: {
        chart: { id: 'predictive-product', toolbar: { show: true } },
        xaxis: { type: 'datetime', title: { text: 'Fecha' } },
        yaxis: { title: { text: 'Total Ventas (Producto)' } },
        stroke: { width: 3 },
        markers: { size: 0 },
        legend: { position: 'top' },
        title: { text: 'Predicción de Ventas por Producto', align: 'center' },
        tooltip: { x: { format: 'yyyy-MM-dd' } }
      },
      chartSeriesProduct: [
        { name: 'Ventas Totales (Producto)', data: [] },
        { name: 'Predicción (Producto)', data: [] }
      ]
    }
  },

  mounted () {
    this.getProducts()
    this.fetchChartData()
  },

  methods: {
    // ========== Productos ==========
    async getProducts () {
      try {
        // Usa this.$axios si tienes boot axios configurado
        const url = apiLaravelBase ? `${apiLaravelBase}/products` : 'products'
        const { data } = await this.$axios.get(url)

        this.products = (data || []).map(p => ({
          label: p.name || p.nombre || `#${p.id}`,
          value: p.id
        }))

        // Seleccionar primero por defecto
        if (!this.selectedProduct && this.products.length) {
          this.selectedProduct = this.products[0].value
        }
      } catch (err) {
        this.$q.notify({ type: 'negative', message: 'Error obteniendo productos' })
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },

    // ========== Validaciones ==========
    _validateDates () {
      if (!this.fecha_inicio || !this.fecha_fin) {
        this.$q.notify({ type: 'warning', message: 'Selecciona rango de fechas' })
        return false
      }
      if (this.fecha_inicio > this.fecha_fin) {
        this.$q.notify({ type: 'warning', message: 'La fecha inicio no puede ser mayor que la fecha fin' })
        return false
      }
      return true
    },

    // ========== Global ==========
    async fetchChartData () {
      if (!this._validateDates()) return
      this.loadingGeneral = true
      this.chartSeries = [
        { name: 'Ventas Totales', data: [] },
        { name: 'Predicción', data: [] }
      ]
      try {
        const { data } = await this.$axios.post(`${apiFlaskBase}/regresion`, {
          fecha_inicio: this.fecha_inicio,
          fecha_fin: this.fecha_fin
        })

        const pred = data?.predicciones || []
        const ventas = pred.map(it => [new Date(it.week).getTime(), Number(it.total_ventas || 0)])
        const linea  = pred.map(it => [new Date(it.week).getTime(), Number(it.predicted || 0)])

        this.chartSeries = [
          { name: 'Ventas Totales', data: ventas },
          { name: 'Predicción', data: linea }
        ]
      } catch (err) {
        this.$q.notify({ type: 'negative', message: 'Error obteniendo datos globales' })
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loadingGeneral = false
      }
    },

    // ========== Por producto ==========
    async fetchChartDataProduct () {
      if (!this._validateDates()) return
      if (!this.selectedProduct) {
        this.$q.notify({ type: 'warning', message: 'Selecciona un producto' })
        return
      }

      this.loadingProduct = true
      this.chartSeriesProduct = [
        { name: 'Ventas Totales (Producto)', data: [] },
        { name: 'Predicción (Producto)', data: [] }
      ]
      try {
        const { data } = await this.$axios.post(`${apiFlaskBase}/regresion_producto`, {
          fecha_inicio: this.fecha_inicio,
          fecha_fin: this.fecha_fin,
          product_id: this.selectedProduct
        })

        const pred = data?.predicciones || []
        const ventas = pred.map(it => [new Date(it.week).getTime(), Number(it.total_ventas || 0)])
        const linea  = pred.map(it => [new Date(it.week).getTime(), Number(it.predicted || 0)])

        this.chartSeriesProduct = [
          { name: 'Ventas Totales (Producto)', data: ventas },
          { name: 'Predicción (Producto)', data: linea }
        ]
      } catch (err) {
        this.$q.notify({ type: 'negative', message: 'Error obteniendo datos del producto' })
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loadingProduct = false
      }
    }
  }
}
</script>

<style scoped>
/* Opcional: separadores visuales */
</style>
