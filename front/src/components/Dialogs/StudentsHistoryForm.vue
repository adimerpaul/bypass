<template>
  <q-dialog v-model="value" persistent>
    <q-card>
      <q-card-section>
        <q-form @submit="submit">
          <q-input v-model="name" label="Nome" />
          <q-input v-model="description" label="Descrição" />
          <q-input v-model="created_at" label="Data" type="date" />
          <q-btn type="submit" label="Salvar" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'StudentsHistoryForm',
  data() {
    return {
      value: true,
      name: '',
      description: '',
      created_at: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.name,
        description: this.description,
        created_at: this.created_at
      })
    }
  }
}
</script>
