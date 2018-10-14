import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import store from '@/store'

const wrapperFactory = ({ component, propsData = {} }) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  return shallowMount(component, {
    localVue,
    store,
    propsData,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
}

module.exports = {
  wrapperFactory
}