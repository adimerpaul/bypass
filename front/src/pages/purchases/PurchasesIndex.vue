<template>
  <q-page class="bg-grey-3 q-pa-xs">
    <q-card>
      <q-card-section class="q-pa-xs">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="row">
              <div class="col-12 col-md-4">
                <q-input v-model="search" label="Buscar" outlined dense clearable
                          :loading="loading"/>
              </div>
              <div class="col-12 col-md-2">
              </div>
              <div class="col-12 col-md-6 text-right">
              </div>
              <div class="col-12">
                <q-table :rows="insumos" :loading="loading" :columns="columns" :filter="search" dense :rows-per-page-options="[0]">
                  <template v-slot:header="props">
                    <q-tr :props="props" class="bg-black text-white">
                      <q-th key="name" :props="props">
                        Nombre
                      </q-th>
                      <q-th key="unit" :props="props">
                        Unidad
                      </q-th>
                      <q-th key="status" :props="props">
                        Estado
                      </q-th>
                      <q-th key="stock" :props="props">
                        Stock
                      </q-th>
                    </q-tr>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props" @click="productClick(props.row)">
                      <q-td key="name" :props="props">
                        {{props.row.name}}
                      </q-td>
                      <q-td key="unit" :props="props">
                        <q-chip color="indigo" dense text-color="white" size="10px" label="UNIDAD" v-if="props.row.unit === 'UNIDAD'"/>
                        <q-chip color="purple" dense text-color="white" size="10px" label="GRAMOS" v-else/>
                      </q-td>
                      <q-td key="status" :props="props">
                        <q-chip :label="props.row.status === 'ACTIVE'? 'Activo' : 'Inactivo'" :color="props.row.status === 'ACTIVE'? 'green' : 'red'" dense size="10px" text-color="white"/>
                      </q-td>
                      <q-td key="stock" :props="props">
                        {{props.row.stock}}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
<!--                <pre>{{insumos}}</pre>-->
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <q-card>
              <q-card-section class="q-pa-xs row items-center bg-orange">
                <div class="text-subtitle1 text-bold text-white">
                  Compras
                </div>
                <q-space />
                <q-btn color="red" label="Limpiar" dense no-caps class="text-bold" size="10px" icon="o_delete" @click="$store.buys = []" :loading="loading"/>
              </q-card-section>
              <q-card-section class="q-pa-xs">
                <div class="row">
                  <div class="col-12">
                    <q-list bordered dense>
                      <q-item v-for="product in $store.buys" :key="product.id">
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
                        <q-item-section class="text-right" side>
                          <q-item-label class="text-red text-bold text-h6">
                            {{ (product.price * product.cantidadSale).toFixed(2) }}
                            <q-btn dense flat rounded icon="delete" size="10px" color="red" @click="$store.buys.splice($store.buys.indexOf(product), 1)"/>
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
                        {{ $store.buys.reduce((acc, order) => acc + (order.price * order.cantidadSale), 0).toFixed(2) }} Bs
                      </div>
                    </q-card-section>
                  </div>
                  <div class="col-12 q-pa-xs">
                      <q-btn color="green" label="Comprar" dense no-caps class="full-width text-bold" size="lg" icon="shopping_cart" @click="pay" :loading="loading"/>
                  </div>
                  <div class="col-12 q-pa-xs">
                    <q-btn color="red" label="Egreso" dense no-caps class="full-width text-bold" size="lg" icon="shopping_cart" @click="deregistration" :loading="loading"/>
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

export default {
  data() {
    return {
      search: '',
      insumos: [],
      categories: [],
      insumosAll: [],
      client: {
        ci: '',
        name: '',
      },
      recibido: '',
      saleDialog: false,
      loading: false,
      columns: [
        {name: 'name', label: 'Nombre', align: 'left', field: 'name'},
        {name: 'unit', label: 'Unidad', align: 'left', field: 'unit'},
        {name: 'status', label: 'Estado', align: 'left', field: 'status'},
        {name: 'stock', label: 'Stock', align: 'right', field: 'stock'},
        // {name: 'category', label: 'Categoria', align: 'left', field: 'category.name'},
      ],
    };
  },
  created() {
    this.insumosGet();
  },
  methods: {
    deregistration() {
      if (this.$store.buys.length === 0) {
        this.$alert.error('Debe agregar productos al carrito');
        return false;
      }
      this.$alert.confirm('¿Desea realizar el egreso?').onOk(() => {
        this.loading = true;
        this.$axios.post('deregistrations', {
          insumos: this.$store.buys
        }).then(response => {
          this.$store.buys = [];
          this.$alert.success('Egreso realizado');
          this.insumosGet();
        }).catch(error => {
          this.$alert.error('Error al realizar el egreso');
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    pay() {
      if (this.$store.buys.length === 0) {
        this.$alert.error('Debe agregar productos al carrito');
        return false;
      }
      this.$alert.confirm('¿Desea realizar la compra?').onOk(() => {
        this.loading = true;
        this.$axios.post('purchases', {
          insumos: this.$store.buys
        }).then(response => {
          this.$store.buys = [];
          this.$alert.success('Compra realizada');
          this.insumosGet();
        }).catch(error => {
          this.$alert.error('Error al realizar la compra');
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    categoryClick(category) {
      if (category.id === '') {
        this.insumos = this.insumosAll;
      } else {
        this.insumos = this.insumosAll.filter((product) => {
          return product.category_id === category.id;
        });
      }
    },
    productClick(product) {
      const findProduct = this.$store.buys.find((order) => order.id === product.id);
      if (findProduct) {
        findProduct.cantidadSale += 1;
      }else{
        this.$store.buys.push({
          id: product.id,
          name: product.name,
          price: 0,
          cantidadSale: 1
        });
      }
    },
    insumosGet() {
      this.loading = true;
      this.$axios.get('listInsumo').then(response => {
        this.insumos = response.data;
        this.insumosAll = response.data;
      }).finally(() => {
        this.loading = false;
      });
    }
  },
};
</script>
