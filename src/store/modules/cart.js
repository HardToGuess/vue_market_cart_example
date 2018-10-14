import _ from 'lodash'

const state = {
  cart: []
}
const getters = {
  cart: state => state.cart
}
const actions = {
  addProductToCart ({ state, commit, dispatch }, { product }) {
    return new Promise((resolve, reject) => {
      // Simulates async call to API
      setTimeout(() => {
        if (product.quantity <= 0) return reject(new Error('Product not in stock'))
        commit('pushProductToCart', { product })
        commit('decreaseProductQuantity', { product })
        resolve()
      }, 1000)
    })
  },
  removeProductFromCart ({ state, commit }, { product }) {
    try {
      commit('pullProductFromCart', { product })
      commit('increaseProductQuantity', { product })
    } catch (err) {
      console.log(err)
    }
  },
  clearCart ({ state, commit }) {
    commit('clearCart')
  }
}
const mutations = {
  pushProductToCart (state, { product }) {
    state.cart.push(product)
  },
  pullProductFromCart (state, { product }) {
    const id = product.id
    const productIndex = state.cart.findIndex(product => { return product.id === id })
    if (productIndex > -1) {
      state.cart.splice(productIndex, 1)
    } else {
      throw new Error('Product not found')
    }
  },
  clearCart (state) {
    state.cart = []
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
