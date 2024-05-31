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
              </q-card-section>
              <q-card-section class="q-pa-xs">
                <div class="row">
                  <div class="col-12">
                    <q-list bordered>
                      <q-item v-for="product in products" :key="product.id">
                        <q-item-section>
                          <q-item-label>{{product.name}}</q-item-label>
                          <q-item-label>{{product.price}}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-btn flat icon="fa-solid fa-trash" @click="removeProduct(product)"/>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div class="col-12">
                    <q-btn color="primary" label="Pagar" @click="pay"/>
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
      this.$router.push({name: 'product', params: {id: product.id}});
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
