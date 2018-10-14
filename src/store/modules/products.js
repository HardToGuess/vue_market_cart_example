const imageURL = "https://placeimg.com/1024/768/tech"
const state = {
  products: [
    {
      name: 'one',
      price: 100,
      quantity: 7,
      id: Math.random().toString(36).substring(2, 15),
      imageURL
    },
    {
      name: 'two',
      price: 120,
      quantity: 3,
      id: Math.random().toString(36).substring(2, 15),
      imageURL
    },
    {
      name: 'three',
      price: 230,
      quantity: 4,
      id: Math.random().toString(36).substring(2, 15),
      imageURL
    },{
      name: 'four',
      price: 390,
      quantity: 2,
      id: Math.random().toString(36).substring(2, 15),
      imageURL
    },{
      name: 'five',
      price: 80,
      quantity: 0,
      id: Math.random().toString(36).substring(2, 15),
      imageURL
    }
  ]
}
const getters = {
  products: state => state.products
}
const actions = {}
const mutations = {
  decreaseProductQuantity (state, { product }) {
    product.quantity -= 1
  },
  increaseProductQuantity (state, { product }) {
    product.quantity += 1
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
