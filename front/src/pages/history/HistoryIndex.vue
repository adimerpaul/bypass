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
                    <div :class="diario.local - diario.cierre > 0 ? 'text-negative' : 'text-positive'">
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
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";
import debounce from "lodash.debounce";

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
  },
  methods: {
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
