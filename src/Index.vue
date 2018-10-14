<template>
  <div id="wrapper">
    <div id="grid">
      <div class="header">
        <h5 :title="title" class="inline-block">{{title}}</h5>
        <span class="checkout-btn" v-if="cart && cart.length > 0"><router-link :to="{name: 'cart'}">Cart ({{cart.length}}), ${{totalCartValue}}</router-link></span>
      </div>
      <div class="main">
        <Product v-for="(product, index) of products" :key="index" :product="product" class="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from './components/Product'
import Cart from './components/Cart'
import { title } from '../config'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      title
    }
  },
  components: { Product, Cart },
  computed: {
    // Reducing cart products array and returns total cart value
    totalCartValue () {
      if (!this.cart || this.cart.length === 0) return 0
      const sum = (acc, x) => acc += x.price
      return parseFloat(this.cart.reduce(sum, 0).toFixed(2))
    },
    ...mapGetters(['products', 'cart'])
  }
}
</script>

<style scoped>
#wrapper {
  margin-bottom: 100px;
}
.header {
  grid-area: hd;
}
.cart {
  grid-area: cart;
}
.checkout-btn-wrapper {
  grid-area: checkout-btn;
  align-self: center;
}
.main {
  grid-area: main;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
}
#grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "hd hd hd"
                        "main main main"
                        "cart cart cart"
}
.header > span {
  display: inline-block;
  float: right;
  line-height: 65px;
}
@media only screen and (max-width: 600px) {
  .main {
    grid-template-columns: 100%;
  }
}
</style>
