<template>
  <q-page class="bg-grey-3 q-pa-md">
    <q-table :rows="crews" :columns="columns" title="Tripulantes" :rows-per-page-options="[0]" row-key="id" dense :filter="filter" :loading="loading">
      <template v-slot:body-cell-option="props">
          <q-td auto-width>
            <q-btn flat dense icon="edit" @click="crewEdit(props.row)" >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn flat dense icon="delete" @click="crewDelete(props.row)" >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
      </template>
      <template v-slot:body-cell-boat="props">
        <q-td :props="props">
          <q-chip :label="props.row.boat?.name" text-color="white" :style="{backgroundColor: props.row.boat?.color}" icon="directions_boat" />
        </q-td>
      </template>
      <template v-slot:body-cell-role="props">
        <q-td :props="props">
          <q-chip label="Capitan" text-color="white" v-if="props.row.role === 'CAPITAN'"  dense icon="person" color="primary" />
          <q-chip label="Tripulante" text-color="white" v-else dense icon="person" color="indigo" />
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-btn outline dense icon="add_circle" @click="crewAdd" label="Agregar" no-caps :loading="loading">
          <q-tooltip>Agregar</q-tooltip>
        </q-btn>
        <q-input v-model="filter" dense class="q-ml-md" debounce="300" placeholder="Buscar" outlined clearable >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
<!--    <pre>{{crews}}</pre>-->
    <q-dialog v-model="crewDialog" persistent>
      <q-card style="width: 250px;max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ crew.id ? 'Editar' : 'Agregar' }} Tripulantes</div>
          <q-space />
          <q-btn flat dense icon="close" @click="crewDialog = false" />
        </q-card-section>
        <q-form @submit="crewSave">
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <q-input v-model="crew.name" label="Nombre" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            </div>
            <div class="col-12">
              <q-select v-model="crew.role" :options="[{label: 'Capitán', value: 'CAPITAN'}, {label: 'Marinero', value: 'MARINERO'}]" label="Rol" outlined dense
                        :rules="[val => !!val || 'Campo requerido']"
                        value-field="value" label-field="label"
                        map-options emit-value
              ></q-select>
            </div>
            <div class="col-12">
              <q-select v-model="crew.boat_id" :options="boats" label="Barco" outlined dense
                        :rules="[val => !!val || 'Campo requerido']"
                        emit-value map-options option-value="id" option-label="name"
              />
            </div>
<!--            <pre>{{crew}}</pre>-->
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
        { name: 'role', label: 'Rol', align: 'left', field: row => row.role },
        { name: 'boat', label: 'Barco', align: 'left', field: row => row.boat?.name },
      ],
      loading: false,
      crews: [],
      crew: {},
      crewDialog: false,
      clienDialogHistory: false,
      filter: '',
      passwordShow: false,
      boats: []
    }
  },
  mounted() {
    this.crewGet()
    this.boatsGet()
  },
  methods: {
    boatsGet () {
      this.$axios.get('boats').then(response => {
        this.boats = response.data
      })
    },
    crewSave () {
      this.loading = true
      if (this.crew.id) {
        this.$axios.put(`crews/${this.crew.id}`, this.crew).then(response => {
          this.crewDialog = false
          const index = this.crews.findIndex(crew => crew.id === this.crew.id)
          this.crews.splice(index, 1, response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.$axios.post('crews', this.crew).then(response => {
          this.crewDialog = false
          this.crews.unshift(response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    crewDelete (crew) {
      this.$alert.confirm('¿Está seguro de eliminar este crewe?').onOk(() => {
        this.loading = true
        this.$axios.delete(`crews/${crew.id}`).then(res => {
          const index = this.crews.findIndex(crew => crew.id === res.data.id)
          console.log(index)
          if (index !== -1) this.crews.splice(index, 1)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    crewEdit (crew) {
      this.crewDialog = true
      this.crew = {...crew}
    },
    crewAdd () {
      this.crewDialog = true
      this.crew = {
        name: '',
      }
    },
    crewGet () {
      this.loading = true
      this.$axios.get('crews').then(response => {
          this.crews = response.data
      }).catch(error => {
          this.$alert.error(error.response.data.message)
      }).finally(() => {
          this.loading = false
      })
    }
  },
};
</script>
