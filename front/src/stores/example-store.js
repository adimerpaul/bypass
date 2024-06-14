import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    user: {},
    isLogged: !!localStorage.getItem('tokenPrestamos'),
    orders: [],
    buys: [],
    env:{
      razonsocial: 'BYPASS BURGER',
      direccion: 'AV. TACNA ENTRE JAEN Y TOMAS FRIAS',
      telefono: '75356595',
      nit: '',
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
