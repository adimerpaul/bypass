
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'users', component: () => import('pages/users/UsersIndex.vue'), meta: { requiresAuth: true } },
      { path: 'companies', component: () => import('pages/companies/CompaniesIndex.vue'), meta: { requiresAuth: true } },
      { path: 'boats', component: () => import('pages/boats/BoatsIndex.vue'), meta: { requiresAuth: true } },
      { path: 'crews', component: () => import('pages/crews/CrewsIndex.vue'), meta: { requiresAuth: true } },
      { path: 'clients', component: () => import('pages/clients/ClientsIndex.vue'), meta: { requiresAuth: true } },
      { path: 'products', component: () => import('pages/products/ProductsIndex.vue'), meta: { requiresAuth: true } },
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
