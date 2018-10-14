import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store'

describe('Store cart module', async () => {
  const product = store.getters.products[0]

  beforeEach(async () => {
    await store.dispatch('clearCart')
  })

  it('Correctly adds product to cart', async () => {
    await store.dispatch('addProductToCart', { product })
    expect(store.getters.cart.length).toBe(1)
  })

  it('Correctly removes product from cart', async () => {
    await store.dispatch('addProductToCart', { product })
    expect(store.getters.cart.length).toBe(1)
    await store.dispatch('removeProductFromCart', { product })
    expect(store.getters.cart.length).toBe(0)
  })

  it('Mutates cart (pushing product)]', () => {
    expect(store.getters.cart.length).toBe(0)
    store.commit('pushProductToCart', { product })
    expect(store.getters.cart.length).toBe(1)
  })

  it('Mutates cart (pulling product)', async () => {
    await store.dispatch('addProductToCart', { product })
    expect(store.getters.cart.length).toBe(1)
    store.commit('pullProductFromCart', { product })
    expect(store.getters.cart.length).toBe(0)
  })
})
