<template>
<div class="grid">
  <div class="header">
    <h5>Cart</h5>
  </div>
  <div class="main">
    <router-link :to="{name: 'index'}" class="back-to-main-page-link">Back to main page</router-link>
    <span v-if="cartIsEmpty" class="empty-cart-warn">Cart is empty</span>
    <table v-if="!cartIsEmpty">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) of uniqueCartProducts" :key="index">
          <td>
            {{product.name}}
          </td>
          <td>
            {{productQuantityInCart(product.id)}}
          </td>
          <td>
            ${{(productQuantityInCart(product.id) * product.price).toFixed(2)}}
          </td>
          <td>
            <a href="javascript:;" @click="removeProductFromCart({ product })" class="remove-from-cart-btn">remove</a>
          </td>
        </tr>
      </tbody>
    </table>
    <a href="javascript:;" @click="checkOut()" v-if="!cartIsEmpty" class="checkout-btn btn darken-3 grey full-width">
      Checkout (${{totalCartProductsPrice}})
    </a>
  </div>
  <br/>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Cart',
  methods: {
    ...mapActions(['removeProductFromCart']),
    // Total quantity of product in cart
    productQuantityInCart (productId) {
      return this.cart.filter(product => product.id === productId).length
    },
    checkOut () {
      alert('Checkout function called here')
    }
  },
  computed: {
    // Returns array of unique products in cart without duplicated objects with same id
    uniqueCartProducts () {
      return _.uniqBy(this.cart, 'id')
    },
    cartIsEmpty () {
      return this.uniqueCartProducts.length <= 0
    },
    // Reducing cart products array and returns total cart value
    totalCartProductsPrice () {
      const sum = (acc, x) => acc += x.price
      return parseFloat(this.cart.reduce(sum, 0)).toFixed(2)
    },
    ...mapGetters(['cart'])
  }
}
</script>

<style scoped>
.header {
  grid-area: hd;
}
.main {
  grid-area: cart;
}
.grid {
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 1;
  grid-template-areas: "hd"
                        "cart"
}
.empty-cart-warn {
  display: block;
}
</style>