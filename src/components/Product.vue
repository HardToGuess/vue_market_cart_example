<template>
<div class="product">
  <img :src="product.imageURL" />
  <span class="product-name">
    {{product.name}}
  </span>
  <span class="product-description">
    {{product.description || 'description not provided'}}
  </span>
  <span class="product-quantity">
    <span v-if="product.quantity">
      In stock: {{product.quantity}}
    </span>
    <span v-else>
      Out of stock
    </span>
  </span>
  <span class="product-price">
    ${{product.price || 0}}
  </span>
  <a href="javascript:;" class="add-to-cart-btn" @click="addProductToCart(product)" v-if="productInStock">
    <span v-if="loading">Working..</span>
    <span v-else>Add to cart</span>
  </a>
</div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // Adds product to cart, also changes link text to 'working' while doing simulated call to API
    async addProductToCart (product) {
      if (this.loading) return
      this.loading = true
      try {
        await this.$store.dispatch('addProductToCart', { product })
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  },
  computed: {
    productInStock () {
      return this.product.quantity > 0
    }
  }
}
</script>

<style scoped>
.product {
  border: solid 1px gray;
  padding-bottom: 0px !important;
  margin: 5px;
  background-color: #fff;
  position: relative;
}
img {
  object-fit: cover;
  width: 100%;
  max-height: 350px;
}
.product-name {
  display: block;
  font-size: 1.4em;
  text-align: center;
}
.product-description, .product-quantity {
  display: block;
  color: gray;
  text-align: center;
}

.add-to-cart-btn {
  display: block;
  min-width: 100%;
  text-align: center;
}
.product-price {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f2f2f2;
  font-weight: bold;
  font-size: 1.3em;
  padding: 5px;
}
</style>