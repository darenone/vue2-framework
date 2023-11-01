import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getter'
import mutations from './mutations'
import actions from './actions'
import saveLocal from './plugin/saveLocal'

Vue.use(Vuex)

const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: modules,
  plugins: [saveLocal]
})
