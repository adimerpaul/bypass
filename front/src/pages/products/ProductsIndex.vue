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
              @click="downloadExcel"
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
            <Card2Component color="indigo-8" title="Total Stock" :subtitle="'0.00' + ' $'" :icon="'shopping_cart'"/>
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
                  size="140px">
                  <q-img
                    :src="product.image.includes('http')?product.image:`${$url}../images/${product.image}`"
                    spinner-color="grey-8"
                    spinner-size="40"
                    style="height: 140px"
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
              <div class="col-12 col-md-4">
                <label class="text-caption text-bold">Precio:</label>
                <q-input v-model="product.price" outlined dense type="number" step="0.01" :rules="[val => !!val || 'Campo requerido']" />
              </div>
<!--              <div class="col-12 col-md-6">-->
<!--                <label class="text-caption text-bold">Costo:</label>-->
<!--                <q-input v-model="product.costo" outlined dense type="number" step="0.01" />-->
<!--              </div>-->
<!--              <div class="col-12">-->
<!--                <label class="text-caption text-bold">Cantidad:</label>-->
<!--                <q-input v-model="product.stock" outlined dense type="number" hint="" />-->
<!--              </div>-->
              <div class="col-12 col-md-8">
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
              <div class="col-12 col-md-6">
                <label class="text-caption text-bold">Estado:</label>
                <q-toggle v-model="product.status" :color="product.status ? 'green' : 'red'" true-value="ACTIVE" false-value="INACTIVE">
                  <div :class="`text-${product.status === 'ACTIVE' ? 'green' : 'red'} text-subtitle2 text-bold`">
                    {{product.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}}
                  </div>
                </q-toggle>
              </div>
              <div class="col-12" v-if="product.id !== undefined">
                <label class="text-caption text-bold row items-center">
                  Insumos:
                  <q-space/>
                  <q-btn
                    color="green"
                    label="Agregar"
                    class="text-bold"
                    no-caps
                    icon="add_circle"
                    rounded
                    size="10px"
                    @click="insumosClick"/>
                </label>
                <q-markup-table dense flat bordered>
                  <thead class="bg-black text-white">
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Opciones</th>
                  </tr>
                  </thead>
                  <tbody v-if="product.insumos.length > 0">
                    <tr v-for="insumo in product.insumos" :key="insumo.id">
                      <td>
<!--                        <pre>{{insumo}}</pre>-->
                        {{insumo?.name}}
                      </td>
                      <td class="text-right" style="line-height: 0.8">
                        <q-chip :label="insumo.unit" :color="insumo.unit==='UNIDAD'?'green':'orange'" text-color="white" dense size="10px" />
                        <br>
                        {{insumo?.pivot?.quantity}}
                      </td>
                      <td class="text-right">
                        <q-btn
                          color="red"
                          flat
                          icon="delete"
                          @click="insumoDelete(insumo)"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="3" class="text-center">No hay insumos</td>
                    </tr>
                  </tbody>
                </q-markup-table>
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
    <q-dialog v-model="insumosDialog">
      <q-card style="width: 350px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-bold text-h6">
            Agregar Insumos
          </div>
          <q-space />
          <q-btn flat icon="close" @click="insumosDialog = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit="insumoSave">
            <div class="row">
              <div class="col-12">
                <label class="text-caption text-bold">Insumo:</label>
                <q-select
                  v-model="insumo.insumo_id"
                  :options="insumos"
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
                <label class="text-caption text-bold">Cantidad:</label>
                <q-input v-model="insumo.quantity" outlined dense type="number" step="0.01" :rules="[val => !!val || 'Campo requerido']" />
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
              ></q-btn>
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
import {Excel} from "src/addons/Excel";

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
      insumos: [],
      insumosAll: [],
      insumosDialog: false,
      insumo: {}
    }
  },
  mounted() {
    this.productsGet()
    this.categoriesGet()
    this.insumosGet()
  },
  methods: {
    filerInsumos (val) {
      if (val === '') {
        this.insumos = this.insumosAll
      } else {
        this.insumos = this.insumosAll.filter(insumo => insumo.name.toLowerCase().includes(val.toLowerCase()))
      }
    },
    insumoDelete(insumo){
      this.$alert.confirm('¿Estas seguro de eliminar este insumo?').onOk(() => {
        this.loading = true
        this.$axios.delete(`insumosProduct/${insumo.pivot?.id}`).then(response => {
          this.product = {...response.data}
          const index = this.products.findIndex(product => product.id === response.data.id)
          this.products.splice(index, 1, response.data)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    insumoSave(){
      this.loading = true
      this.$axios.post('insumosProduct', this.insumo).then(response => {
        this.insumosDialog = false
        this.product= {...response.data}
        const index = this.products.findIndex(product => product.id === response.data.id)
        this.products.splice(index, 1, response.data)
      }).finally(() => {
        this.loading = false
      }).catch(error => {
        this.$alert.error(error.response.data.message)
      })
    },
    insumosClick(){
      this.insumosDialog = true
      this.insumo = {
        product_id: this.product.id,
        insumo_id: '',
        quantity: '',
      }
    },
    insumosGet(){
      this.$axios.get('listInsumo').then(response => {
        this.insumos = response.data
        this.insumosAll = response.data
      })
    },
    downloadExcel () {
      let data = [{
        columns: [
          {label: 'Nombre', value: 'name'},
          {label: 'Precio', value: 'price'},
          {label: 'Costo', value: 'costo'},
          {label: 'Stock', value: 'stock'},
          {label: 'Categoria', value: 'category.name'},
          {label: 'Estado', value: 'status'},
        ],
        content: this.products
      }]
      Excel.export(data, 'Productos')
    },
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
          const index = this.products.findIndex(product => product.id === response.data.id)
          this.products.splice(index, 1)
        }).finally(() => {
          this.loading = false
        }).catch(error => {
          this.$alert.error(error.response.data.message)
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
        // this.products.unshift(response.data)
        this.products.push(response.data)
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
        const index = this.products.findIndex(product => product.id === response.data.id)
        this.products.splice(index, 1, response.data)
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
