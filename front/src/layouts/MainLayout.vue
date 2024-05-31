<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="text-black text-bold">
            {{title}}
          </div>
        </q-toolbar-title>
        <div>
          <q-btn flat dense icon="o_notifications" aria-label="Notificaciones">
            <q-badge color="primary" text-color="white" floating>3</q-badge>
          </q-btn>
          <q-btn flat dense icon="o_account_circle" aria-label="Menu" :label="textCapitalize($store.user.name)" no-caps icon-right="arrow_drop_down">
            <q-menu>
              <q-list>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar icon="account_circle" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Perfil</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar icon="settings" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Configuración</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple @click="logout">
                  <q-item-section avatar>
                    <q-avatar icon="logout" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Cerrar Sesión</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="220"
      class="bg-primary text-white"
    >
      <q-layout>
        <q-header>
          <q-list>
            <q-item-label class="q-pa-xs">
              <q-item dense>
                <q-item-section avatar>
                  <q-avatar class="bg-white" text-color="primary" size="45px">
                    <q-img src="/logo.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white text-bold">
                    <q-chip dense label="Vendedor" color="orange" text-color="white" v-if="$store.user?.role === 'VENDEDOR'" icon="account_circle"/>
                    <q-chip dense label="Admin" color="indigo" text-color="white" v-if="$store.user?.role === 'ADMIN'" icon="account_circle"/>
                    <q-chip dense label="Super admin" color="purple" text-color="white" v-if="$store.user?.role === 'SUPERADMIN'" icon="account_circle"/>
                  </q-item-label>
                  <q-item-label caption class="text-white">{{ $store.user.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-item-label>
            <q-separator dark />
            <q-item clickable dense v-ripple v-for="link in essentialLinks" :key="link.title" :to="link.to" exact :class="`text-white ${rutaActual==link.to?'bg-secondary':''}`">
              <q-item-section avatar>
                <q-avatar  text-color="white" :icon="`${rutaActual==link.to?link.icon:'o_'+link.icon}`" :size="`${rutaActual==link.to?'45px':'38px'}`" />
              </q-item-section>
              <q-item-section>
                <q-item-label :class="`text-white ${rutaActual==link.to?'text-bold':''}`">{{ link.title }}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-header>
        <q-footer>
          <q-item clickable dense v-ripple @click="logout">
            <q-item-section avatar>
              <q-avatar text-color="white" icon="logout" size="38px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white text-bold">Cerrar Sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-footer>
      </q-layout>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        { title: 'Inicio', icon: 'home', to: '/' },
        { title: 'Ventas', icon: 'shopping_basket', to: '/sales' },
        { title: 'Productos', icon: 'shopping_cart', to: '/products' },
        { title: 'Usuarios', icon: 'people', to: '/users' },
        { title: 'Clientes', icon: 'person', to: '/clients' },
      ],
    };
  },
  methods: {
    textCapitalize(text) {
      if (!text) return '';
      const lower = text.toLowerCase();
      return text.charAt(0).toUpperCase() + lower.slice(1);
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    logout() {
      this.$alert.dialog('¿Está seguro que desea cerrar sesión?').onOk(() => {
        this.$axios.post('/logout').then(() => {
          this.$store.isLogeed = false;
          this.$store.user = {};
          localStorage.removeItem('tokenPrestamos');
          this.$router.push('/login');
        })
      })
    },
  },
  computed: {
    rutaActual() {
      return this.$route.path
    },
    title() {
      const route = this.$route.path
      if (route === '/') return 'Inicio'
      if (route === '/users') return 'Usuarios'
      else if (route === '/clients') return 'Clientes'
      else if (route === '/companies') return 'Empresas'
      else if (route === '/boats') return 'Botes'
      else if (route === '/crews') return 'Tripulantes'
      else if (route === '/products') return 'Productos'
      else if (route === '/loans') return 'Prestamos'
      else if (route === '/payments') return 'Pagos'
      else if (route === '/finished-loans') return 'Prestamos Finalizados'
      return 'Inicio'
    },
  },
};
</script>
