<template>
  <q-page class="bg-grey-3 q-pa-md">
    <q-table :rows="boats" :columns="columns" title="Botes" :rows-per-page-options="[0]" row-key="id" dense :filter="filter" :loading="loading">
      <template v-slot:body-cell-option="props">
          <q-td auto-width>
            <q-btn flat dense icon="edit" @click="boatEdit(props.row)" >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn flat dense icon="delete" @click="boatDelete(props.row)" >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <q-chip :label="props.row.name" text-color="white" :style="{backgroundColor: props.row.color}" icon="directions_boat" />
        </q-td>
      </template>
      <template v-slot:body-cell-company="props">
        <q-td :props="props">
          <q-chip :label="props.row.company?.name" text-color="white" dense :style="{backgroundColor: props.row.company?.color}" icon="business" />
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-btn outline dense icon="add_circle" @click="boatAdd" label="Agregar" no-caps :loading="loading">
          <q-tooltip>Agregar</q-tooltip>
        </q-btn>
        <q-input v-model="filter" dense class="q-ml-md" debounce="300" placeholder="Buscar" outlined clearable >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
<!--    <pre>{{boats}}</pre>-->
    <q-dialog v-model="boatDialog" persistent>
      <q-card style="width: 250px;max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ boat.id ? 'Editar' : 'Agregar' }} Botes</div>
          <q-space />
          <q-btn flat dense icon="close" @click="boatDialog = false" />
        </q-card-section>
        <q-form @submit="boatSave">
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <q-input v-model="boat.name" label="Nombre" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            </div>
            <div class="col-12">
              <q-select v-model="boat.company_id" :options="companies" label="Empresa" outlined dense
                        :rules="[val => !!val || 'Campo requerido']"
                        emit-value map-options option-value="id" option-label="name"
              />
            </div>
<!--            <pre>{{boat}}</pre>-->
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup :loading="loading" />
          <q-btn color="primary" label="Guardar" type="submit" :loading="loading" />
        </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: 'BoatsIndex',
  data () {
    return {
      columns: [
        { name: 'option', label: 'Opciones', align: 'left', field: row => row.option },
        { name: 'id', label: 'ID', align: 'left', field: row => row.id },
        { name: 'name', label: 'Nombre', align: 'left', field: row => row.name },
        { name: 'company', label: 'Empresa', align: 'left', field: row => row.company?.name },
      ],
      loading: false,
      boats: [],
      boat: {},
      boatDialog: false,
      clienDialogHistory: false,
      filter: '',
      passwordShow: false,
      companies: []
    }
  },
  mounted() {
    this.boatGet()
    this.companiesGet()
  },
  methods: {
    companiesGet () {
      this.$axios.get('companies').then(response => {
        this.companies = response.data
      })
    },
    boatSave () {
      this.loading = true
      if (this.boat.id) {
        this.$axios.put(`boats/${this.boat.id}`, this.boat).then(response => {
          this.boatDialog = false
          const index = this.boats.findIndex(boat => boat.id === this.boat.id)
          this.boats.splice(index, 1, response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.$axios.post('boats', this.boat).then(response => {
          this.boatDialog = false
          this.boats.unshift(response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    boatDelete (boat) {
      this.$alert.confirm('¿Está seguro de eliminar este boate?').onOk(() => {
        this.loading = true
        this.$axios.delete(`boats/${boat.id}`).then(res => {
          const index = this.boats.findIndex(boat => boat.id === res.data.id)
          console.log(index)
          if (index !== -1) this.boats.splice(index, 1)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    boatEdit (boat) {
      this.boatDialog = true
      this.boat = {...boat}
    },
    boatAdd () {
      this.boatDialog = true
      this.boat = {
        name: '',
      }
    },
    boatGet () {
      this.loading = true
      this.$axios.get('boats').then(response => {
          this.boats = response.data
      }).catch(error => {
          this.$alert.error(error.response.data.message)
      }).finally(() => {
          this.loading = false
      })
    }
  },
};
</script>
