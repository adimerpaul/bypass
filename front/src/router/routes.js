
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'users', component: () => import('pages/users/UsersIndex.vue'), meta: { requiresAuth: true } },
      { path: 'clients', component: () => import('pages/clients/ClientsIndex.vue'), meta: { requiresAuth: true } },
      { path: 'products', component: () => import('pages/products/ProductsIndex.vue'), meta: { requiresAuth: true } },
      { path: 'sales', component: () => import('pages/sales/SalesIndex.vue'), meta: { requiresAuth: true } },
      { path: 'supplies', component: () => import('pages/supplies/SuppliesIndex.vue'), meta: { requiresAuth: true } },
      { path: 'purchases', component: () => import('pages/purchases/PurchasesIndex.vue'), meta: { requiresAuth: true } },
      { path: 'diaries', component: () => import('pages/diaries/DiariesIndex.vue'), meta: { requiresAuth: true } },
      { path: 'history', component: () => import('pages/history/HistoryIndex.vue'), meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
