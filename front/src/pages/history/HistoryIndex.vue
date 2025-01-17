<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
<!--          <div class="col-12 col-md-2">-->
<!--            <q-input v-model="date" type="date" label="Fecha" outlined dense :loading="loading" />-->
<!--          </div>-->
          <div class="col-12 col-md-2 text-center">
            <q-select v-model="insumo" :options="insumos" label="Insumo" outlined dense :loading="loading"
                      emit-value map-options
            />
          </div>
          <div class="col-12 col-md-2">
            <q-input v-model="fechaInicio" type="date" label="Fecha Inicio" outlined dense :loading="loading" />
          </div>
          <div class="col-12 col-md-2">
            <q-input v-model="fechaFin" type="date" label="Fecha Fin" outlined dense :loading="loading" />
          </div>
          <div class="col-12 col-md-2 text-center">
            <q-btn @click="buyGet" class="text-bold" label="Buscar" color="primary" icon="search" no-caps :loading="loading" />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-markup-table dense wrap-cells bordered>
              <thead>
              <tr>
                <td colspan="8" class="text-center text-bold">COMPRAS</td>
              </tr>
              <tr class="bg-black text-white">
                <td>Opcion</td>
                <td>Insumo</td>
                <td>Usuario</td>
                <td>Cantidad</td>
                <td>Precio</td>
                <td>Total</td>
                <td>Estado</td>
                <td>Fecha</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="buy in buys" :key="buy.id">
                <td class="q-pa-none q-ma-none">
                  <q-btn dense size="10px" color="primary" @click="buyAnular(buy.id)" label="Anular" icon="cancel" no-caps v-if="buy.status === 'ACTIVE'" />
                  <q-chip v-else color="grey" text-color="white" label="Anulado" dense size="10px" />
                </td>
                <td class="q-pa-none q-ma-none">{{ buy.insumo?.name }}</td>
                <td class="q-pa-none q-ma-none">{{ buy.user?.name }}</td>
                <td class="q-pa-none q-ma-none">{{ buy.quantity }}</td>
                <td class="q-pa-none q-ma-none">{{ buy.price }}</td>
                <td class="q-pa-none q-ma-none">{{ buy.total }}</td>
                <td class="q-pa-none q-ma-none">
                  <q-chip v-if="buy.status === 'ACTIVE'" color="green" text-color="white" label="Activo" dense size="10px" />
                  <q-chip v-else color="red" text-color="white" label="Inactivo" dense size="10px" />
                </td>
                <td class="q-pa-none q-ma-none">{{ $filters.formatdMYHi(buy.date+' '+buy.time) }}</td>
              </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right text-bold">Total</td>
                  <td class="text-bold">{{ totalQuantity }}</td>
                  <td class="text-bold"></td>
                  <td class="text-bold"></td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </q-markup-table>
<!--            <pre>{{ buys }}</pre>-->
          </div>
          <div class="col-6">
            <q-markup-table dense wrap-cells bordered>
              <thead>
              <tr>
                <td colspan="8" class="text-center text-bold">BAJAS</td>
              </tr>
              <tr class="bg-black text-white">
                <td>Opcion</td>
                <td>Insumo</td>
                <td>Usuario</td>
                <td>Cantidad</td>
                <td>Precio</td>
                <td>Total</td>
                <td>Estado</td>
                <td>Fecha</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="deregistration in deregistrations" :key="deregistration.id">
                <td class="q-pa-none q-ma-none">
                  <q-btn dense size="10px" color="primary" @click="deregistrationAnular(deregistration.id)" label="Anular" icon="cancel" no-caps v-if="deregistration.status === 'ACTIVE'" />
                  <q-chip v-else color="grey" text-color="white" label="Anulado" dense size="10px" />
                </td>
                <td class="q-pa-none q-ma-none">{{ deregistration.insumo?.name }}</td>
                <td class="q-pa-none q-ma-none">{{ deregistration.user?.name }}</td>
                <td class="q-pa-none q-ma-none">{{ deregistration.quantity }}</td>
                <td class="q-pa-none q-ma-none">{{ deregistration.price }}</td>
                <td class="q-pa-none q-ma-none">{{ deregistration.total }}</td>
                <td class="q-pa-none q-ma-none">
                  <q-chip v-if="deregistration.status === 'ACTIVE'" color="green" text-color="white" label="Activo" dense size="10px" />
                  <q-chip v-else color="red" text-color="white" label="Inactivo" dense size="10px" />
                </td>
                <td class="q-pa-none q-ma-none">{{ $filters.formatdMYHi(deregistration.date+' '+deregistration.time) }}</td>
              </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right text-bold">Total</td>
                  <td class="text-bold">{{ totalQuantityDeregistrations }}</td>
                  <td class="text-bold"></td>
                  <td class="text-bold"></td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </q-markup-table>
<!--            <pre>{{ deregistrations }}</pre>-->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from "moment";

export default {
  name: "DiariesIndex",
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      buys: [],
      deregistrations: [],
      loading: false,
      insumos: [],
      insumo: '',
      fechaInicio: moment().format("YYYY-MM-DD"),
      fechaFin: moment().format("YYYY-MM-DD")
    };
  },
  mounted() {
    this.buyGet();
    this.insumosGet();
  },
  methods: {
    insumosGet() {
      this.insumos = [];
      this.insumos.push({label: 'Todos', value: ''});
      this.$axios.get("insumos").then(response => {
        response.data.forEach(product => {
          if (product.status === 'ACTIVE'){
            this.insumos.push({label: product.name, value: product.id});
          }
        });
      }).catch(error => {
        this.$alert.error(error.response.data.message);
      });
    },
    deregistrationAnular(id) {
      this.$alert.confirm('¿Está seguro de anular la baja?').onOk(() => {
        this.$axios.put(`deregistrationsAnular/${id}`).then((data) => {
          const find = this.deregistrations.find(deregistration => deregistration.id === id);
          find.status = "INACTIVE";
          this.$alert.success('Baja anulada');
        }).catch(error => {
          this.$alert.error(error.response.data.message);
        });
      });
    },
    buyAnular(id) {
      this.$alert.confirm('¿Está seguro de anular la compra?').onOk(() => {
        this.$axios.put(`buysAnular/${id}`).then((data) => {
          const find = this.buys.find(buy => buy.id === id);
          find.status = "INACTIVE";
          this.$alert.success('Compra anulada');
        }).catch(error => {
          this.$alert.error(error.response.data.message);
        });
      });
    },
    buyGet() {
      this.loading = true;
      this.$axios.get("buys", {
        params: {
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          insumo: this.insumo
        }
      }).then(response => {
        this.buys = response.data.buys;
        this.deregistrations = response.data.deregistrations;
      }).catch(error => {
        this.$alert.error(error.response.data.message);
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    totalQuantity() {
      let sum = 0;
      if (this.buys.length === 0) return sum;
      this.buys.forEach(buy => {
        sum += parseFloat(buy.quantity);
      });
      return sum.toFixed(2);
    },
    totalQuantityDeregistrations() {
      let sum = 0;
      if (this.deregistrations.length === 0) return sum;
      this.deregistrations.forEach(deregistration => {
        sum += parseFloat(deregistration.quantity);
      });
      return sum.toFixed(2);
    }
  }
};
</script>
