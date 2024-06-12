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
          <div class="col-12">
<!--            [-->
<!--            {-->
<!--            "id": 1,-->
<!--            "name": "BASICOS",-->
<!--            "diario": [-->
<!--            {-->
<!--            "id": 1,-->
<!--            "item": "PAN",-->
<!--            "medida": "UNIDAD",-->
<!--            "insumo_id": 1,-->
<!--            "inicio": "978.000",-->
<!--            "ingreso": "0.000",-->
<!--            "egreso": "0.000",-->
<!--            "ventas": "0.000",-->
<!--            "cierre": "978.000",-->
<!--            "local": "0.000",-->
<!--            "status": "ACTIVE",-->
<!--            "date": "2024-06-12",-->
<!--            "category_insumo_id": 1-->
<!--            },-->
<!--            {-->
<!--            "id": 2,-->
<!--            "item": "PAN LOMITO",-->
<!--            "medida": "UNIDAD",-->
<!--            "insumo_id": 2,-->
<!--            "inicio": "1010.000",-->
<!--            "ingreso": "0.000",-->
<!--            "egreso": "0.000",-->
<!--            "ventas": "0.000",-->
<!--            "cierre": "1010.000",-->
<!--            "local": "0.000",-->
<!--            "status": "ACTIVE",-->
<!--            "date": "2024-06-12",-->
<!--            "category_insumo_id": 1-->
<!--            },-->
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
              <tbody>
                <template v-for="(item, index) in diario" :key="index">
                  <tr class="text-center">
                    <td colspan="9" class="text-bold">{{ item.name }}</td>
                  </tr>
                  <tr v-for="(diario, index) in item.diario" :key="index">
                    <td>{{ diario.item }}</td>
                    <td>{{ diario.medida }}</td>
                    <td>{{ diario.inicio }}</td>
                    <td>{{ diario.ingreso }}</td>
                    <td>{{ diario.egreso }}</td>
                    <td>{{ diario.ventas }}</td>
                    <td>{{ diario.cierre }}</td>
                    <td>{{ diario.local }}</td>
                    <td>{{ diario.cierre - diario.local }}</td>
                  </tr>
                </template>
              </tbody>
            </q-markup-table>
            <pre>
              {{ diario}}
            </pre>
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
    this.diarioGet();
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
      // console.log(fecha);
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return dias[moment(fecha).day()];
    }
  }
}
</script>
