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
      <div class="col-12 col-md-2 flex items-center">
        <q-btn label="Generar" color="primary" icon="insights" @click="generarReporte" :loading="loading" no-caps />
      </div>
      <div class="col-12 col-md-2 flex items-center">
        <q-btn
          label="Imprimir"
          color="secondary"
          icon="print"
          class="q-ml-sm"
          @click="imprimirReporte"
          no-caps
        />
      </div>
    </div>

    <div v-if="chartSeries.length" id="grafico-reporte">
      <apexchart type="bar" height="400" :options="chartOptions" :series="chartSeries" />
    </div>
    <div v-else class="text-center q-mt-md">
      <q-icon name="bar_chart" size="56px" color="grey" />
      <div class="text-caption text-grey">Sin datos para mostrar</div>
    </div>

    <!-- Contenido oculto para impresión -->
    <div id="print-reporte" class="q-pa-md" style="display: none">
      <div class="text-center">
        <h3>REPORTE DE GANANCIAS POR MESA</h3>
        <p>Del {{ fechaInicio }} al {{ fechaFin }}</p>
      </div>
      <table border="1" cellspacing="0" cellpadding="4" width="100%">
        <thead>
        <tr style="background: #f0f0f0">
          <th>#</th>
          <th>Mesa</th>
          <th>Total (Bs)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(r, index) in reporteData" :key="r.mesa">
          <td>{{ index + 1 }}</td>
          <td>{{ r.mesa }}</td>
          <td style="text-align: right">{{ r.total.toFixed(2) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import ApexCharts from 'vue3-apexcharts'
import { Printd } from 'printd'

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
      reporteData: [], // ✅ necesario para la tabla de impresión
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
            distributed: true
          }
        },
        colors: ['#43a047', '#1e88e5', '#fbc02d', '#e53935'] // colores por mesa
      }
    }
  },
  methods: {
    imprimirReporte () {
      const element = document.querySelector('#print-reporte')
      if (!element) {
        this.$alert.error('No se encontró el reporte para imprimir.')
        return
      }

      const d = new Printd()
      const estilos = `
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h3 { margin-bottom: 0; text-align: center }
          p { margin-top: 4px; font-size: 14px; text-align: center }
          table { border-collapse: collapse; font-size: 14px; width: 100% }
          th, td { padding: 6px; border: 1px solid #000; }
          th { background: #f0f0f0; }
          td:last-child { text-align: right; }
        </style>
      `
      const html = estilos + element.innerHTML
      const frag = document.createRange().createContextualFragment(html)
      d.print(frag)
    },
    async generarReporte () {
      this.loading = true
      try {
        const res = await this.$axios.post('/reportTipo', {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        })

        const data = res.data

        // ✅ Para impresión: ordenado por total de mayor a menor
        this.reporteData = [...data].sort((a, b) => b.total - a.total)

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
