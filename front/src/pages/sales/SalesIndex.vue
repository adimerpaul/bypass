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
                          <q-item-label class="text-bold">{{product.name}}</q-item-label>
                          <q-item-label class="flex flex-center">
                            <q-input v-model="product.price" dense outlined type="number" style="width: 100px" step="0.01">
                              <template v-slot:prepend>
                                <q-icon name="fa-solid fa-dollar-sign" size="10px"/>
                              </template>
                            </q-input>
                            <q-input v-model="product.cantidadSale" dense outlined type="number" style="width: 100px">
                              <template v-slot:prepend>
                                <q-icon name="fa-solid fa-shopping-cart" size="10px"/>
                              </template>
                            </q-input>
                          </q-item-label>
                        </q-item-section>
                        <q-item-section class="text-right">
                          <q-item-label class="text-red text-bold text-h5">{{ (product.price * product.cantidadSale).toFixed(2) }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
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
    };
  },
  created() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
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
