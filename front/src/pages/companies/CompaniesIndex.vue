<template>
  <q-page class="bg-grey-3 q-pa-md">
    <q-table :rows="companies" :columns="columns" title="Empresas" :rows-per-page-options="[0]" row-key="id" dense :filter="filter" :loading="loading">
      <template v-slot:body-cell-option="props">
          <q-td auto-width>
            <q-btn flat dense icon="edit" @click="companyEdit(props.row)" >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn flat dense icon="delete" @click="companyDelete(props.row)" >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <q-chip :label="props.row.name" text-color="white" :style="{backgroundColor: props.row.color}" icon="business" />
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-btn outline dense icon="add_circle" @click="companyAdd" label="Agregar" no-caps :loading="loading">
          <q-tooltip>Agregar</q-tooltip>
        </q-btn>
        <q-input v-model="filter" dense class="q-ml-md" debounce="300" placeholder="Buscar" outlined clearable >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
<!--    <pre>{{companies}}</pre>-->
    <q-dialog v-model="companyDialog" persistent>
      <q-card style="width: 250px;max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ company.id ? 'Editar' : 'Agregar' }} Empresas</div>
          <q-space />
          <q-btn flat dense icon="close" @click="companyDialog = false" />
        </q-card-section>
        <q-form @submit="companySave">
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <q-input v-model="company.name" label="Nombre" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            </div>
            <div class="col-12">
              <q-input v-model="company.address" label="Dirección" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            </div>
            <div class="col-12">
              <q-input v-model="company.phone" label="Teléfono" outlined dense :rules="[val => !!val || 'Campo requerido']" />
            </div>
<!--            <pre>{{company}}</pre>-->
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
  name: 'CompaniesIndex',
  data () {
    return {
      columns: [
        { name: 'option', label: 'Opciones', align: 'left', field: row => row.option },
        { name: 'id', label: 'ID', align: 'left', field: row => row.id },
        { name: 'name', label: 'Nombre', align: 'left', field: row => row.name },
        { name: 'address', label: 'Dirección', align: 'left', field: row => row.address },
        { name: 'phone', label: 'Teléfono', align: 'left', field: row => row.phone }
      ],
      loading: false,
      companies: [],
      company: {},
      companyDialog: false,
      clienDialogHistory: false,
      filter: '',
      passwordShow: false
    }
  },
  mounted() {
    this.companyGet()
  },
  methods: {
    companySave () {
      this.loading = true
      if (this.company.id) {
        this.$axios.put(`companies/${this.company.id}`, this.company).then(response => {
          this.companyDialog = false
          const index = this.companies.findIndex(company => company.id === this.company.id)
          this.companies.splice(index, 1, response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.$axios.post('companies', this.company).then(response => {
          this.companyDialog = false
          this.companies.unshift(response.data)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    companyDelete (company) {
      this.$alert.confirm('¿Está seguro de eliminar este companye?').onOk(() => {
        this.loading = true
        this.$axios.delete(`companies/${company.id}`).then(res => {
          const index = this.companies.findIndex(company => company.id === res.data.id)
          console.log(index)
          if (index !== -1) this.companies.splice(index, 1)
        }).catch(error => {
          this.$alert.error(error.response.data.message)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    companyEdit (company) {
      this.companyDialog = true
      this.company = {...company}
    },
    companyAdd () {
      this.companyDialog = true
      this.company = {
        name: '',
        ci: ''
      }
    },
    companyGet () {
      this.loading = true
      this.$axios.get('companies').then(response => {
          this.companies = response.data
      }).catch(error => {
          this.$alert.error(error.response.data.message)
      }).finally(() => {
          this.loading = false
      })
    }
  },
};
</script>
