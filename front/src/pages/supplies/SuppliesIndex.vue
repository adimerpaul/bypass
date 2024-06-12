<template>
  <q-page class="bg-grey-3 q-pa-md">
    <q-table :rows="insumos" :columns="columns" title="Insumos" :rows-per-page-options="[0]" row-key="id" dense :filter="filter" :loading="loading">
      <template v-slot:body-cell-option="props">
        <q-td auto-width>
<!--          <q-btn flat dense size="10px" icon="edit" @click="insumoEdit(props.row)" >-->
<!--            <q-tooltip>Editar</q-tooltip>-->
<!--          </q-btn>-->
<!--          <q-btn flat dense size="10px" icon="delete" @click="insumoDelete(props.row.id)" >-->
<!--            <q-tooltip>Eliminar</q-tooltip>-->
<!--          </q-btn>-->
          <q-btn-dropdown label="Opciones" dense no-caps color="primary" size="10px">
            <q-list>
              <q-item clickable v-ripple @click="insumoEdit(props.row)">
                <q-item-section>Editar</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="insumoDelete(props.row.id)">
                <q-item-section>Eliminar</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="insumoHistory(props.row)">
                <q-item-section>Historial</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-btn outline dense icon="add_circle" @click="insumoAdd" label="Agregar" no-caps :loading="loading">
          <q-tooltip>Agregar</q-tooltip>
        </q-btn>
        <q-btn outline dense icon="refresh" @click="getInsumos" label="Actualizar" no-caps :loading="loading" class="q-ml-md">
          <q-tooltip>Actualizar</q-tooltip>
        </q-btn>
        <q-input v-model="filter" dense class="q-ml-md" debounce="300" placeholder="Buscar" outlined >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-category_insumo="props">
        <q-td :props="props" class="text-bold">
          {{ props.row.category_insumo?.name }}
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props" class="text-bold">
          <q-chip color="positive" dense text-color="white" label="Activo" v-if="props.row.status === 'ACTIVE'"/>
          <q-chip color="negative" dense text-color="white" label="Inactivo" v-else/>
        </q-td>
      </template>
      <template v-slot:body-cell-unit="props">
        <q-td :props="props" class="text-bold">
          <q-chip color="indigo" dense text-color="white" label="UNIDAD" v-if="props.row.unit === 'UNIDAD'"/>
          <q-chip color="purple" dense text-color="white" label="GRAMOS" v-else/>
        </q-td>
      </template>
      <template v-slot:body-cell-stock="props">
        <q-td :props="props" class="text-bold" :class="`text-${props.row.stock < 300 ? 'negative' : 'positive'}`">
          <input v-model="props.row.stock"  type="number" class="q-pa-xs" style="width: 100px;" @change="insumoStockUpdate(props.row)">
          {{ props.row.stock }}
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="insumoDialog" persistent>
      <q-card style="width: 250px;max-width: 90vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ insumo.id ? 'Editar' : 'Agregar' }} Insumo</div>
          <q-space />
          <q-btn flat dense icon="close" @click="insumoDialog = false" />
        </q-card-section>
        <q-form @submit="insumoSave">
          <q-card-section>
            <div class="row">
              <!--            protected $fillable = ['name', 'category_insumo_id', 'stock', 'unit', 'status']; -->
              <div class="col-12">
                <q-input v-model="insumo.name" dense outlined type="text" label="Nombre" :rules="[val => !!val || 'Campo requerido']" />
              </div>
              <div class="col-12">
                <q-select v-model="insumo.category_insumo_id" dense outlined label="Categoria" :options="category_insumos" :rules="[val => !!val || 'Campo requerido']"
                          map-options emit-value option-value="id" option-label="name"/>
              </div>
              <div class="col-12">
                <q-input v-model="insumo.stock" dense outlined type="number" label="Stock"  hint=""/>
              </div>
              <div class="col-12">
                <q-select v-model="insumo.unit" dense outlined type="text" label="Unidad" :rules="[val => !!val || 'Campo requerido']" :options="['UNIDAD', 'GRAMOS']"/>
              </div>
              <div class="col-12">
                <q-radio v-model="insumo.status" color="positive" val="ACTIVE" label="Activo" />
                <q-radio v-model="insumo.status" color="negative" val="INACTIVE" label="Inactivo" />
              </div>
<!--              <pre>{{insumo}}</pre>-->
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup :loading="loading" />
            <q-btn color="primary" label="Guardar" type="submit" :loading="loading" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
<!--    <pre>{{ insumos }}</pre>-->
  </q-page>
</template>
<script>
export default {
  name: 'SuppliesIndex',
  data () {
    return {
      columns: [
        { name: 'option', label: 'Opciones', align: 'left', field: row => row.option },
        { name: 'id', label: 'ID', align: 'left', field: row => row.id },
        { name: 'name', label: 'Nombre', align: 'left', field: row => row.name },
        { name: 'category_insumo', label: 'Categoria', align: 'left', field: row => row.category_insumo?.name },
        { name: 'stock', label: 'Stock', align: 'left', field: row => row.stock },
        { name: 'unit', label: 'Unidad', align: 'left', field: row => row.unit },
        { name: 'status', label: 'Estado', align: 'left', field: row => row.status }
      ],
      loading: false,
      insumos: [],
      insumo: {},
      insumoDialog: false,
      clienDialogHistory: false,
      filter: '',
      category_insumos: []
    }
  },
  mounted() {
    this.getInsumos()

    this.$axios.get('category_insumos').then(response => {
      this.category_insumos = response.data
    }).catch(error => {
      this.$alert.error(error.response.data.message)
    })
  },
  methods: {
    insumoStockUpdate (insumo) {
      this.$axios.put(`insumosStock/${insumo.id}`, insumo).then(response => {
        const index = this.insumos.findIndex(insumo => insumo.id === response.data.id)
        this.insumos.splice(index, 1, response.data)
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      })
    },
    insumoSave () {
      this.loading = true
      if (this.insumo.id) {
        this.$axios.put(`insumos/${this.insumo.id}`, this.insumo).then(response => {
          this.insumoDialog = false
          const index = this.insumos.findIndex(insumo => insumo.id === this.insumo.id)
          this.insumos.splice(index, 1, response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.$axios.post('insumos', this.insumo).then(response => {
          this.insumoDialog = false
          this.insumos.unshift(response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    insumoDelete (id) {
      this.$alert.confirm('¿Está seguro de eliminar este insumoe?').onOk(() => {
        this.loading = true
        this.$axios.delete(`insumos/${id}`).then(response => {
          const index = this.insumos.findIndex(insumo => insumo.id === id)
          this.insumos.splice(index, 1)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    insumoHistory (insumo) {
      this.clienDialogHistory = true
      this.insumo = {...insumo}
    },
    insumoEdit (insumoe) {
      this.insumoDialog = true
      this.insumo = {...insumoe}
    },
    insumoAdd () {
      this.insumoDialog = true
      this.insumo = {
        name: '',
        category_insumo_id: '',
        stock: '',
        unit: '',
        status: 'ACTIVE'
      }
    },
    getInsumos () {
      this.loading = true
      this.$axios.get('insumos').then(response => {
        this.insumos = response.data
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    }
  },
};
</script>
