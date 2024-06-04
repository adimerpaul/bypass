<template>
<q-page class="q-pa-xs bg-grey-3">

</q-page>
</template>
<script>
export default {
  data () {
    return {
      supplies: [],
      search: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: 'Descripción',
          field: 'description',
          sortable: true
        },
        {
          name: 'price',
          align: 'left',
          label: 'Precio',
          field: 'price',
          sortable: true
        },
        {
          name: 'stock',
          align: 'left',
          label: 'Stock',
          field: 'stock',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Acciones',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    edit (row) {
      this.$router.push(`/supplies/${row.id}/edit`)
    },
    async deleteRow (row) {
      const isDelete = await this.$q.dialog({
        title: 'Confirmar',
        message: '¿Estás seguro de que quieres eliminar este registro?',
        cancel: true,
        persistent: true
      })
      if (isDelete) {
        try {
          await this.$axios.delete(`/supplies/${row.id}`)
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check',
            message: 'Registro eliminado correctamente'
          })
          this.getSupplies()
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'warning',
            message: 'Error al eliminar el registro'
          })
        }
      }
    },
    async getSupplies () {
      try {
        const { data } = await this.$axios.get('/supplies')
        this.supplies = data
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
          message: 'Error al obtener los registros'
        })
      }
    }
  },
  mounted () {
    this.getSupplies()
  }
}
</script>
