<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="row">
              <div class="col-12 col-md-4">
                <q-input v-model="search" label="Buscar" outlined dense clearable
                         @update:modelValue="productFilter"/>
              </div>
              <div class="col-12 col-md-2">
              </div>
              <div class="col-12 col-md-6 text-right">
              </div>
              <div class="col-12">
                <ProductCard :products="products" :categories="categoryMoreAll" @productClick="productClick" @categoryClick="categoryClick"/>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section class="q-pa-xs row items-center bg-yellow">
                <div class="text-subtitle1 text-bold text-black">
                  Carrito
                </div>
                <q-space />
                <q-btn color="red" label="Limpiar Carrito" dense no-caps class="text-bold" size="10px" icon="o_delete" @click="$store.orders = []"/>
              </q-card-section>
              <q-card-section class="q-pa-xs">
                <div class="row">
                  <div class="col-12">
                    <q-list bordered dense>
                      <q-item v-for="product in $store.orders" :key="product.id">
                        <q-item-section>
                          <q-item-label class="text-bold">
                            {{product.name}}
                          </q-item-label>
                          <q-item-label caption>
                            <div class="row">
                              <div class="col-6">
                                <q-input v-model="product.price" dense outlined type="number" step="0.01">
                                  <template v-slot:prepend>
                                    <q-icon name="fa-solid fa-dollar-sign" size="10px"/>
                                  </template>
                                </q-input>
                              </div>
                              <div class="col-6">
                                <q-input v-model="product.cantidadSale" dense outlined type="number">
                                  <template v-slot:prepend>
                                    <q-icon name="fa-solid fa-shopping-cart" size="10px"/>
                                  </template>
                                </q-input>
                              </div>
                            </div>
                          </q-item-label>
                        </q-item-section>
                        <q-item-section class="text-right">
                          <q-item-label class="text-red text-bold text-h6">
                            {{ (product.price * product.cantidadSale).toFixed(2) }}
                            <q-btn dense flat rounded icon="delete" size="10px" color="red" @click="$store.orders.splice($store.orders.indexOf(product), 1)"/>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div class="col-12">
                    <q-card-section class="q-pa-xs row items-center">
                      <div class="text-bold text-black">
                        Total
                      </div>
                      <q-space />
                      <div class="text-bold text-h5 text-red">
                        {{ $store.orders.reduce((acc, order) => acc + (order.price * order.cantidadSale), 0).toFixed(2) }} Bs
                      </div>
                    </q-card-section>
                  </div>
                  <div class="col-12">
                    <q-card-section class="q-pa-xs">
                      <q-btn color="indigo" label="Pagar" dense no-caps class="full-width text-bold" size="lg" icon="shopping_cart" @click="pay"/>
                    </q-card-section>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog v-model="saleDialog" persistent>
    <q-card style="width: 700px;max-width: 90vh">
      <q-card-section class="q-pa-xs row items-center">
        <div class="text-h6 text-bold">
          Pago
        </div>
        <q-space />
        <q-btn flat dense icon="close" @click="saleDialog = false"/>
      </q-card-section>
      <q-card-section class="">
        <div class="text-bold text-center ">
          <div class="row">
            <div class="col-12 col-md-4 text-red text-subtitle1 text-bold">
              Total :{{ $store.orders.reduce((acc, order) => acc + (order.price * order.cantidadSale), 0).toFixed(2) }} Bs
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="recibido" label="Recibido" outlined dense clearable/>
            </div>
            <div class="col-12 col-md-4 text-blue text-subtitle1 text-bold">
              <div v-if="recibido !== ''">
              Cambio :{{ (recibido - $store.orders.reduce((acc, order) => acc + (order.price * order.cantidadSale), 0)).toFixed(2) }} Bs
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-4">
            <q-input v-model="client.ci" label="Numero" outlined dense clearable @update:modelValue="searchClient"/>
          </div>
          <div class="col-12 col-md-4">
            <q-input v-model="client.name" label="Nombre" outlined dense/>
          </div>
          <div class="col-12 col-md-4 flex flex-center">
            <q-btn color="red-8" label="Pagar" dense no-caps class="text-bold full-width"   icon="shopping_cart" @click="pay"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import ProductCard from "pages/products/ProductCard.vue";

export default {
  components: {ProductCard},
  data() {
    return {
      search: '',
      products: [],
      categories: [],
      productsAll: [],
      client: {
        ci: '',
        name: '',
      },
      recibido: '',
      saleDialog: false
    };
  },
  created() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    searchClient() {
      this.$axios.get(`searchClient/${this.client.ci}`).then(response => {
        this.client.name = response.data?.name;
      });
    },
    pay() {
      if (this.$store.orders.length === 0) {
        this.$alert.error('Debe agregar productos al carrito');
        return false;
      }
      this.recibido = '';
      this.saleDialog = true;
      this.client = {
        ci: 0,
        name: 'SN',
      };
    },
    categoryClick(category) {
      if (category.id === '') {
        this.products = this.productsAll;
      } else {
        this.products = this.productsAll.filter((product) => {
          return product.category_id === category.id;
        });
      }
    },
    productClick(product) {
      const findProduct = this.$store.orders.find((order) => order.id === product.id);
      if (findProduct) {
        findProduct.cantidadSale += 1;
      }else{
        this.$store.orders.push({
          id: product.id,
          name: product.name,
          price: product.price,
          cantidadSale: 1
        });
      }
    },
    getCategories() {
      this.$axios.get('categories').then(response => {
        this.categories = response.data;
      });
    },
    getProducts() {
      this.$axios.get('products').then(response => {
        this.products = response.data;
        this.productsAll = response.data;
      });
    },
    productFilter(data) {
      if (data === '') {
        this.products = this.productsAll;
      } else {
        this.products = this.productsAll.filter((product) => {
          return product.name.toLowerCase().includes(data.toLowerCase());
        });
      }
    },
  },
  computed: {
    categoryMoreAll () {
      return [
        {id: '', name: 'Todo', icon: 'fa-solid fa-globe'},
        ...this.categories
      ]
    },
  }
};
</script>
