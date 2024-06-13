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
            <q-btn label="Egreso" color="red" @click="egreseClick"  :loading="loading" no-caps icon="add_circle_outline" class="text-bold" />
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
                <th>Opciones</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Descripcion</th>
                <th>Name</th>
                <th>Total</th>
                <th>Usuario</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="sale in sales" :key="sale.id">
                <td>
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
      sales: [],
      egresoDialog: false,
      egreso: {},
      provedores: []
    }
  },
  mounted() {
    this.salesGet();
    this.provedoresGet();
  },
  methods: {
    egresoPost() {
      this.loading = true;
      this.$axios.post('/egresos',this.egreso).then(response => {
        this.$alert.success('Egreso registrado');
        this.salesGet();
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
      console.log('reimprimir', sale);
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
        if (sale.type === 'INGRESO' && sale.status !== 'ANULADO') total += sale.total;
      });
      return total;
    },
    egresos() {
      let total = 0;
      this.sales.forEach(sale => {
        if (sale.type === 'EGRESO' && sale.status !== 'ANULADO') total += sale.total;
      });
      return total;
    },
    utilidad() {
      return this.ingresos - this.egresos;
    }
  }
}
</script>
