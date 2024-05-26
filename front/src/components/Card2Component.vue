<template>
  <q-card flat bordered :class="`bg-${color}`">
    <q-card-section class="q-pa-none">
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="bg-white text-white" size="3.5em">
              <q-icon :name="icon" :color="color" size="1.2em"/>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label caption class="text-bold text-white">{{title}}</q-item-label>
            <q-item-label class="text-h5 text-bold text-white">{{subtitle}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" color="white"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'Card2Component',
  props: {
    color: {
      type: String,
      default: 'indigo'
    },
    title: {
      type: String,
      default: 'Total'
    },
    subtitle: {
      type: String,
      default: '456 Unid'
    },
    icon: {
      type: String,
      default: 'home'
    }
  }
}
</script>
