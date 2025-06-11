<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="text-h5 text-primary q-mb-md">Reporte por Tipo de Movimiento</div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-4">
        <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
      </div>
      <div class="col-12 col-md-4 flex items-center">
        <q-btn label="Generar" color="primary" icon="insights" @click="generarReporte" :loading="loading" no-caps />
      </div>
    </div>

    <div v-if="chartSeries.length">
      <apexchart type="bar" height="400" :options="chartOptions" :series="chartSeries" />
    </div>
    <div v-else class="text-center q-mt-md">
      <q-icon name="bar_chart" size="56px" color="grey" />
      <div class="text-caption text-grey">Sin datos para mostrar</div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import ApexCharts from 'vue3-apexcharts'
// import { api } from 'boot/axios'

export default {
  name: 'ReporteTipoPage',
  components: {
    apexchart: ApexCharts
  },
  data () {
    return {
      fechaInicio: moment().startOf('month').format('YYYY-MM-DD'),
      fechaFin: moment().endOf('month').format('YYYY-MM-DD'),
      loading: false,
      chartSeries: [],
      chartOptions: {
        chart: {
          id: 'reporte-tipo',
          toolbar: { show: true }
        },
        xaxis: {
          categories: []
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
            distributed: true // ✅ Colores por categoría
          }
        },
        colors: ['#43a047', '#1e88e5', '#fbc02d', '#e53935'] // MESA, LLEVAR, DELIVERY, PEDIDOS YA
      }
    }
  },
  methods: {
    async generarReporte () {
      this.loading = true
      try {
        const res = await this.$axios.post('/reportTipo', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        })

        const data = res.data

        this.chartOptions.xaxis.categories = data.map(d => d.mesa)
        this.chartSeries = [{
          name: 'Ganancia',
          data: data.map(d => d.total)
        }]
      } catch (err) {
        this.$alert.error('Error al generar el reporte', err.message || 'Error desconocido')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
