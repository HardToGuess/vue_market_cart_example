import Product from '@/components/Product.vue'
import store from '@/store'
import { wrapperFactory } from '../factory'

describe('Product.vue', () => {
  let wrapper
  const product = store.getters.products[0]
  beforeEach(async () => {
    // Clear cart
    await store.dispatch('clearCart')
    wrapper = wrapperFactory({ component: Product, propsData: { product } })
  })
  it('Correctly updating text of "add to cart" btn on click', () => {
    // const wrapper = shallowMount(Product, { localVue, store, propsData: { product: store.getters.products[0] } })
    const btn = wrapper.find('.add-to-cart-btn')
    expect(btn.exists()).toBe(true)
    const oldBtnText = btn.text()
    btn.trigger('click')
    expect(btn.text()).not.toBe(oldBtnText)
  })

  it('Correct call of addProductToCart function on "add to cart" btn click', async () => {
    const addProductToCartMock = jest.fn()
    wrapper.vm.addProductToCart = addProductToCartMock
    wrapper.find('.add-to-cart-btn').trigger('click')
    expect(addProductToCartMock.mock.calls.length).toBe(1)
    expect(addProductToCartMock).toHaveBeenCalledWith(product)
  })
})
