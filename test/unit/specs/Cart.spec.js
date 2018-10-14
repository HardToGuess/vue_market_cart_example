import Cart from '@/components/Cart.vue'
import store from '@/store'
import { wrapperFactory } from '../factory'

describe('Cart.vue', async () => {
  let wrapper
  const product = store.getters.products[0]
  // Setup store before each test
  beforeEach(async () => {
    // Clear cart
    await store.dispatch('clearCart')
    wrapper = wrapperFactory({ component: Cart })
  })

  it('Cart is empty on startup', () => {
    expect(store.getters.cart.length).toBe(0)
  })

  it('Showing warning if cart empty', () => {
    expect(store.getters.cart.length).toBe(0)
    expect(wrapper.find('.empty-cart-warn').exists()).toBe(true)
    expect(wrapper.find('.empty-cart-warn').text()).toBe('Cart is empty')
  })

  it('Not showing warning if cart not empty', async () => {
    await store.dispatch('addProductToCart', { product })
    expect(wrapper.find('.empty-cart-warn').exists()).toBe(false)
  })

  it('Table exists if cart not empty', async () => {
    await store.dispatch('addProductToCart', { product })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('Table not exists if cart empty', async () => {
    expect(store.getters.cart.length).toBe(0)
    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('Checkout btn exists if cart not empty', async () => {
    await store.dispatch('addProductToCart', { product })
    expect(wrapper.find('.checkout-btn').exists()).toBe(true)
  })

  it('Header contains link to main page', () => {
    expect(wrapper.find('.back-to-main-page-link').exists()).toBe(true)
    expect(wrapper.find('.back-to-main-page-link').text()).toBe('Back to main page')
  })

  it('Btn "remove from cart" works', async () => {
    await store.dispatch('addProductToCart', { product })
    const removeProductFromCartMock = jest.fn()
    wrapper.vm.removeProductFromCart = removeProductFromCartMock
    expect(wrapper.find('.remove-from-cart-btn').exists()).toBe(true)
    wrapper.find('.remove-from-cart-btn').trigger('click')
    expect(removeProductFromCartMock.mock.calls.length).toBe(1)
  })
})