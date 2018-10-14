import Index from '@/Index.vue'
import store from '@/store'
import { wrapperFactory } from '../factory'
import { title as pageTitle } from '../../../config'
describe('Index.vue', () => {
  let wrapper
  const product = store.getters.products[0]
  beforeEach(() => {
    // Clear cart
    store.dispatch('clearCart')
    wrapper = wrapperFactory({ component: Index })
  })

  it('Store contains at least one product', () => {
    expect(store.getters.products.length).toBeGreaterThan(0)
  })

  it('Container for products presented on page', () => {
    expect(wrapper.contains('#grid')).toBe(true)
  })

  it('Header contains correct text', () => {
    expect(wrapper.contains('.header')).toBe(true)
    expect(wrapper.find('.header').text()).toBe(pageTitle)
  })

  it('Link to cart not visible if cart is empty', () => {
    expect(store.getters.cart.length).toBe(0)
    expect(wrapper.find('.checkout-btn').exists()).toBe(false)
  })

  it('Makes link to cart page visible when product added to cart', async () => {
    expect(store.getters.cart.length).toBe(0)
    await store.dispatch('addProductToCart', { product })
    expect(store.getters.cart.length).toBe(1)
    expect(wrapper.find('.checkout-btn').exists()).toBe(true)
  })

})