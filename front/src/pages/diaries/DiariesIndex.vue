<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-2">
            <q-input v-model="date" type="date" label="Fecha" outlined dense />
          </div>
          <div class="col-12 col-md-2 text-center">
            <q-btn @click="diarioGet" class="text-bold" label="Buscar" color="primary" icon="search" no-caps />
          </div>
          <div class="col-12">
            <q-markup-table dense wrap-cells bordered >
              <thead>
                <tr>
                  <td colspan="9" class="text-center text-bold">Diario del {{ date }}</td>
                </tr>
                <tr>
                  <td colspan="9" class="text-center text-bold">{{dia(date)}}</td>
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
            </q-markup-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import moment from "moment";

export default {
  name: 'DiariesIndex',
  data() {
    return {
      date: moment().format('YYYY-MM-DD'),
      diario: {},
      loading: false
    }
  },
  mounted() {
    // this.diarioGet();
  },
  methods: {
    diarioGet() {
      this.loading = true;
      this.$axios.get('diarioDate/' + this.date).then(response => {
        this.diario = response.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    dia(fecha) {
      console.log(fecha);
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return dias[moment(fecha).day()];
    }
  }
}
</script>
