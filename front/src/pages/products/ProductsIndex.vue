<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-4">
            <q-input v-model="search" label="Buscar" outlined dense clearable
                     @update:modelValue="productFilter"/>
          </div>
          <div class="col-12 col-md-2">
            <q-btn
              color="grey-8"
              label="Descargar"
              class="text-bold"
              no-caps
              icon="get_app"
              flat
              rounded
            ></q-btn>
          </div>
          <div class="col-12 col-md-6 text-right">
            <q-btn
              color="green"
              label="Crear Producto"
              class="text-bold"
              @click="productClick()"
              no-caps
              icon="add_circle"
              rounded
              :loading="loading"
            ></q-btn>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <Card2Component color="green-8" title="Productos" :subtitle="products.length + ' Unid'" :icon="'all_inbox'"/>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <Card2Component color="indigo-8" title="Total Stock" :subtitle="totalPrice + ' $'" :icon="'shopping_cart'"/>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <Card2Component color="purple-8" title="Total Ganancias" :subtitle="totalCost + ' $'" :icon="'attach_money'"/>
          </div>
          <div class="col-12">
            <ProductCard :products="products" @productClick="productEditClick" :categories="categoryMoreAll" @categoryClick="categoryClick"/>
          </div>
<!--          <div class="col-12">-->
<!--            <pre>{{products}}</pre>-->
<!--          </div>-->
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="productDialog" maximized position="right">
      <q-card style="width: 350px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-bold text-h6">
            {{product.id ? 'Editar' : 'Crear'}}
            Producto
          </div>
          <q-space />
          <q-btn flat icon="close" @click="productDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit="productSave">
            <div class="row">
              <div class="col-12 col-md-12 flex flex-center">
                <q-avatar
                  @click="$refs.file.click()"
                  class="bg-grey-3"
                  text-color="grey-8"
                  rounded
                  size="200px">
                  <q-img
                    :src="product.image.includes('http')?product.image:`${$url}../images/${product.image}`"
                    spinner-color="grey-8"
                    spinner-size="40"
                    style="height: 200px"
                  />
                  <q-badge
                    color="grey-8"
                    text-color="white"
                    floating
                  >
                    <q-icon name="camera_alt" />
                  </q-badge>
                </q-avatar>
                <input type="file" class="hidden" @change="handleFileChange" ref="file" accept="image/*">
              </div>
              <div class="col-12">
                <label class="text-caption text-bold">Nombre:</label>
                <q-input v-model="product.name" outlined dense :rules="[val => !!val || 'Campo requerido']" />
              </div>
<!--              <div class="col-12">-->
<!--                <label class="text-caption text-bold">Descripcion:</label>-->
<!--                <q-input v-model="product.description" outlined dense type="textarea" />-->
<!--              </div>-->
              <div class="col-12 col-md-6">
                <label class="text-caption text-bold">Precio:</label>
                <q-input v-model="product.price" outlined dense type="number" step="0.01" :rules="[val => !!val || 'Campo requerido']" />
              </div>
              <div class="col-12 col-md-6">
                <label class="text-caption text-bold">Costo:</label>
                <q-input v-model="product.costo" outlined dense type="number" step="0.01" />
              </div>
              <div class="col-12">
                <label class="text-caption text-bold">Cantidad:</label>
                <q-input v-model="product.stock" outlined dense type="number" :rules="[val => !!val || 'Campo requerido']" />
              </div>
              <div class="col-12">
                <label class="text-caption text-bold">Categoria:</label>
                <q-select
                  v-model="product.category_id"
                  :options="categories"
                  outlined
                  dense
                  emit-value
                  map-options
                  option-value="id"
                  option-label="name"
                  :rules="[val => !!val || 'Campo requerido']"
                />
              </div>
              <div class="col-12">
                <label class="text-caption text-bold">Estado:</label>
                <q-toggle v-model="product.status" :color="product.status ? 'green' : 'red'" true-value="ACTIVE" false-value="INACTIVE">
                  <div :class="`text-${product.status === 'ACTIVE' ? 'green' : 'red'} text-subtitle2 text-bold`">
                    {{product.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}}
                  </div>
                </q-toggle>
              </div>
            </div>
            <div>
              <q-btn
                color="green"
                label="Guardar"
                class="text-bold full-width"
                type="submit"
                no-caps
                icon="save"
                rounded
                :loading="loading"
                v-if="product.id === undefined"
              ></q-btn>
              <q-btn
                color="yellow-8"
                label="Actualizar"
                class="text-bold full-width q-mb-md"
                type="submit"
                no-caps
                icon="save"
                rounded
                :loading="loading"
                v-if="product.id !== undefined"></q-btn>
              <q-btn
                color="red"
                outline
                label="Eliminar"
                class="text-bold full-width"
                no-caps
                icon="close"
                rounded
                @click="productDelete"
                :loading="loading"
                v-if="product.id !== undefined"></q-btn>
<!--              <pre>{{product}}</pre>-->
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import ProductCard from "./ProductCard.vue";
import Card2Component from "../../components/Card2Component.vue";

export default {
  name: 'ProductsIndex',
  components: {ProductCard, Card2Component},
  data () {
    return {
      products: [],
      productsAll: [],
      product: {},
      categories: [],
      category: '',
      search: '',
      productDialog: false,
      loading: false,
    }
  },
  mounted() {
    this.productsGet()
    this.categoriesGet()
  },
  methods: {
    productFilter (filter) {
      if (filter) {
        this.products = this.productsAll.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
      } else {
        this.products = this.productsAll
      }
    },
    productDelete () {
      this.$alert.confirm('¿Estas seguro de eliminar este producto?').onOk(() => {
        this.loading = true
        this.$axios.delete(`products/${this.product.id}`).then(response => {
          this.productDialog = false
          this.productsGet()
        }).finally(() => {
          this.loading = false
        })
      })

      // this.$alert.confirm('¿Está seguro de eliminar este boate?').onOk(() => {
      //   this.loading = true
      //   this.$axios.delete(`boats/${boat.id}`).then(res => {
      //     const index = this.boats.findIndex(boat => boat.id === res.data.id)
      //     console.log(index)
      //     if (index !== -1) this.boats.splice(index, 1)
      //   }).catch(error => {
      //     this.$alert.error(error.response.data.message)
      //   }).finally(() => {
      //     this.loading = false
      //   })
      // })
    },
    handleFileChange () {
      const file = event.target.files[0]
      if (file) {
        this.product.image = URL.createObjectURL(file)
      }
    },
    productCreate () {
      if(this.$refs.file.files.length === 0){
        this.$alert.error('Debe seleccionar una imagen')
        return false
      }
      this.loading = true
      const formData = new FormData()
      formData.append('product', JSON.stringify(this.product))
      formData.append('file', this.$refs.file.files[0])
      this.$axios.post('products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.productDialog = false
        this.productsGet()
      }).finally(() => {
        this.loading = false
      })
    },
    productUpdate () {
      this.loading = true
      const formData = new FormData()
      formData.append('product', JSON.stringify(this.product))
      if(this.$refs.file.files.length > 0){
        formData.append('file', this.$refs.file.files[0])
      }
      this.$axios.post(`products/${this.product.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.productDialog = false
        this.productsGet()
      }).finally(() => {
        this.loading = false
      })
    },
    productSave(){

      if (this.product.id) {
        this.productUpdate()
      } else {
        this.productCreate()
      }
    },
    productClick () {
      this.productDialog = true
      this.product = {
        name: '',
        description: '',
        price: '',
        stock: '',
        image: 'images.png',
        status: 'ACTIVE',
        costo: '',
      }
    },
    categoryClick (category) {
      // console.log('categoryClick', category)
      this.category = category.id
      if (category.id) {
        this.products = this.productsAll.filter(product => product.category_id === category.id)
      } else {
        this.products = this.productsAll
      }
    },
    productEditClick (product) {
      this.productDialog = true
      this.product = {...product}
    },
    productsGet () {
      this.$axios.get('products').then(response => {
        this.products = response.data
        this.productsAll = response.data
      })
    },
    categoriesGet () {
      this.$axios.get('categories').then(response => {
        this.categories = response.data
      })
    },
  },
  computed: {
    categoryMoreAll () {
      return [
        {id: '', name: 'Todo', icon: 'fa-solid fa-globe'},
        ...this.categories
      ]
    },
    totalPrice () {
      let total = 0
      this.products.forEach(product => {
        total += product.price * product.stock
      })
      return total.toFixed(2)
    },
    totalCost () {
      let total = 0
      this.products.forEach(product => {
        total += product.costo * product.stock
      })
      return total.toFixed(2)
    },
  }
}
</script>
